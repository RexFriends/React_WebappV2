import React, {useEffect, useState} from 'react'
import {useQuery, useQueryClient} from 'react-query'
import './ItemPopup.scss'
import {AnimatePresence, motion} from 'framer-motion'
import env from 'react-dotenv'
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

const ItemDetails = () => {
    // console.log("querying")
    return(
        {
            display: false,
        }
    )
}


function ItemPopup (){
    // const query = useQuery('ItemDetails', ItemDetails)
    const [itemDetail, itemDetailSet] = useState(undefined)
    const [imageData, imagesDataSet] = useState([])
    const [imageIndex, imageIndexSet] = useState(0);
    const queryClient = useQueryClient()
    const query = useQuery('ItemDetails', ItemDetails)

    useEffect(() => {
        // console.log("Show Item Popup", query.data)
        if( query.status === "success" && query.data.display === true){
            // make fetch call here with provided item id to fill data

            let rexUID = localStorage.getItem("rexUID")
            let url = env.API_URL + "/api/product?uid=" + rexUID + "&product_id=" + query.data.itemId

            fetch(url).then(res => res.json()).then(json => {
                itemDetailSet(json.product)
                let tempImages = []
                let screenshot = json.product.screenshot
                console.log(json.product)
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
    }, [query.data, query.status])


    const handleClosetPopup = () => {
        queryClient.setQueryData(['ItemDetails'], { display: false})    
    }
    const handleCarousel = (e) => {
        imageIndexSet(e);
      };

    if(query.data && query.data.display){

        return(
            <AnimatePresence>
                <motion.div id="ItemPopup"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}    
                >
                    {/* This is the item popup */}
                    <div id="itemContainer">
                            <button onClick={handleClosetPopup} id="close">Close</button>
                        {
                            itemDetail &&
                            <>
                                <a href={itemDetail.url} target="_">url</a>
                                {imageData.length > 1 ?
                                    <div id="carousel">
                                            <Carousel
                                                value={imageIndex}
                                                slides={imageData}
                                                onChange={handleCarousel}
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


                            </>
                        }
                    </div>
                </motion.div>
            </AnimatePresence>
        )
    }else{
        return(
            <div id="none">
                empty
            </div>

        )
    }
    
    




}
export default ItemPopup