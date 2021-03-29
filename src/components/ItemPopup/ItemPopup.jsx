import React, {useEffect, useState} from 'react'
import {useQuery, useQueryClient} from 'react-query'
import './ItemPopup.scss'
import {AnimatePresence, motion} from 'framer-motion'
import URL from '../../assets/URL'
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import IconButton from '@material-ui/core/IconButton'
import {IoArrowBack} from 'react-icons/io5'
import {FiSend} from 'react-icons/fi'
import {FaCopy} from 'react-icons/fa'
import useWindowDimensions from '../../Hooks/useWindowDimensions'
// import Scrollbars from "react-custom-scrollbars";
import APIURL from '../../assets/URL'
const ItemDetails = () => {
    // console.log("querying")
    return(
        {
            display: false,
        }
    )
}


function ItemPopup (){
    const windowWidth = useWindowDimensions().width;
    // const query = useQuery('ItemDetails', ItemDetails)
    const [itemDetail, itemDetailSet] = useState(undefined)
    const [imageData, imagesDataSet] = useState([])
    const [imageIndex, imageIndexSet] = useState(0);
    const [friends, friendsSet] = useState([])
    const queryClient = useQueryClient()
    const query = useQuery('ItemDetails', ItemDetails)

    useEffect(() => {
        let rexUID = localStorage.getItem("rexUID")
        if( query.status === "success" && query.data.display === true){
            // make fetch call here with provided item id to fill data

            
            let url = URL + "/api/product?uid=" + rexUID + "&product_id=" + query.data.itemId

            fetch(url).then(res => res.json()).then(json => {
                itemDetailSet(json.product)
                let tempImages = []
                let screenshot = json.product.screenshot
                console.log(json)
                if(json.product.images !== null){
                    fetch(json.product.images)
                    .then((res) => res.json())
                    .then((json) => {
                    //! need to transform the weird base64 code to an img html object
                    
                        for (const key in json) {
                            let base64 = json[key];
                            if (
                            base64.substring(0, 2) === "b'" &&
                            base64[base64.length - 1]
                            ) {
                            base64 = base64.slice(2);
                            base64 = base64.slice(0, -1);
                            }
                            tempImages.push(
                            <img  src={'data:image/jpeg;base64,' + base64} id="img" alt={`webscraper ${key}`}/>
                            );
                        }
                        fetch(screenshot)
                        .then((res) => res.json())
                        .then((json) => {
                            tempImages.push(<img src={json.uri} id="img" alt="screenshot" />)
                            imagesDataSet(tempImages);
                            imageIndexSet(0)
                        });
                })
            }else{
           
                let tempImages = []
            
                fetch(json.product.screenshot)
                .then((res) => res.json())
                .then((json) => {
  
                    tempImages.push(<img src={json.uri} id="carousel-single" alt="screenshot" />)
                    imagesDataSet(tempImages);
                });
            }
            
       
            })}
        fetch(APIURL + '/api/getfriends?uid=' + rexUID ).then((res) => res.json()).then((json) => {
            // console.log(json.contacts)
            friendsSet(json.contacts)
        })
    }, [query.data, query.status])


    const handleClosetPopup = () => {
        queryClient.setQueryData(['ItemDetails'], { display: false})    
    }
    const handleCarousel = (e) => {
        imageIndexSet(e);
      };
    
    const handleSendRequest = (id) => {
        let rexUID = localStorage.getItem("rexUID")
        let payload = {
            contact_id: id,
            product_id: itemDetail.id,
          };
        fetch(URL + '/api/send_rex?uid=' + rexUID, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).then(res => res.json())
        .then(json => console.log(json))
    }

    const handleGetCopyLink = () => {
        let rexUID = localStorage.getItem("rexUID")
        let payload = { listing_id: itemDetail.id}
        fetch(URL + '/api/copy_feedback_link?uid=' + rexUID, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          })
            .then((res) => res.text())
            .then((link) => {
                // console.log(link)
                var inp = document.createElement('input');
                document.body.appendChild(inp);
                inp.value = link;
                inp.select();
                document.execCommand('copy', false);
                inp.remove();
            })

    }


        return(
            query.data && query.data.display ?
            <AnimatePresence>
                <motion.div id="ItemPopup"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}    
                >
 
                    <div id="itemContainer">
                        <div id="top">
                            <IconButton onClick={handleClosetPopup}><IoArrowBack/></IconButton>
                        </div>
                        <div id="content" style={{flexDirection: windowWidth >= 1200 ? "row" : "column" }}>
                            {
                                itemDetail &&
                                <motion.div id="image-container"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{duration: 1}}
                                >
                                    
                                    {imageData.length > 1 ?
                                        <div id="carousel">
                                                <Carousel
                                                    value={imageIndex}
                                                    slides={imageData}
                                                    onChange={handleCarousel}
                                                    plugins={['centered']}
                                                />
                                                <Dots
                                                    value={imageIndex}
                                                    onChange={handleCarousel}
                                                    number={imageData.length}
                                                /> 
                                        </div>
                                        :
                                        imageData[0]
                                    }


                                </motion.div>
                            }
                            <div id="content-container">
                                {itemDetail && <div id="webscrape">
                                    {itemDetail.brand && <div id="brand">Brand: {itemDetail.brand}</div>}
                                    {itemDetail.name && <div id="name">Name: {itemDetail.name}</div>}
                                    {itemDetail.price && <div id="price">Price: {itemDetail.price} {itemDetail.currency}</div>}
                                    <div id="link"><a href={itemDetail.url} rel="noreferrer" target="_blank">Product Link</a></div>
                                </div>}
                                <div id="feedback">
                                    {/* <Scrollbars id="scrollbar" style={{width: "100%", height: "200px"}}> */}
                                        <div id="friend-container">
                                        {
                                            friends.map((friend, i) => 
                                            <>
                                                <div id="friend" key={i}>
                                                    <div id="friendicon">{friend.name ?? friend.phonenumber}</div>
                                                    <IconButton id="send" onClick={()=>handleSendRequest(friend.id)}><FiSend/></IconButton>
                                                </div>         
                                            </>
                                                )
                                        }
                                    </div>
                                    {/* </Scrollbars> */}
                                    <div>
                                        <IconButton onClick={handleGetCopyLink}><FaCopy/></IconButton>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
            :
            <div id="none">
          
            </div>
        )
  
    
    
    




}
export default ItemPopup