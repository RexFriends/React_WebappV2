import React, {useEffect, useState} from 'react'
import {useQuery, useQueryClient} from 'react-query'
import './ItemPopup.scss'
import {AnimatePresence, motion} from 'framer-motion'
import URL from '../../assets/URL'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Button, Dialog, DialogContent, CircularProgress, Grid, InputAdornment, TextField, Tooltip } from '@material-ui/core';
import { AddCircle, Search, Send } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton'
import {IoArrowBack} from 'react-icons/io5'
import {FiSend} from 'react-icons/fi'
import {FaCopy} from 'react-icons/fa'
import useWindowDimensions from '../../Hooks/useWindowDimensions'
import Scrollbars from "react-custom-scrollbars";
import APIURL from '../../assets/URL'
import TextOverflow from '../TextOverflow/TextOverflow';
const ItemDetails = () => {
    // console.log("querying")
    return(
        {
            display: false,
        }
    )
}


function ItemPopup () {
    const windowWidth = useWindowDimensions().width;
    // const query = useQuery('ItemDetails', ItemDetails)
    const [itemDetail, itemDetailSet] = useState(undefined)
    const [imageData, imagesDataSet] = useState([])
    const [friends, friendsSet] = useState([]);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);
    const queryClient = useQueryClient()
    const query = useQuery('ItemDetails', ItemDetails);
    const [carouselIndex, setCarouselIndex] = useState(0); // used to trigger override styles
    
    const getFriendsAndContacts = value => {
        let rexUID = localStorage.getItem("rexUID");
        fetch(`${APIURL}/api/get-users?uid=${rexUID}&text=${value}`)
            .then((res) => res.json())
            .then((json) => {
                friendsSet(json.users);
            });
    };

    useEffect(() => {
        if( query.status === "success" && query.data.display === true) {
            // make fetch call here with provided item id to fill data
            let rexUID = localStorage.getItem("rexUID");
            let url = URL + "/api/product?uid=" + rexUID + "&product_id=" + query.data.itemId;

            fetch(url)
                .then(res => res.json())
                .then(json => {
                    itemDetailSet(json.product);
                    let tempImages = [];
                    if (json.product.images !== null) {
                        fetch(json.product.images)
                            .then((res) => res.json())
                            .then((json) => {
                                //! need to transform the weird base64 code to an img html object
                                for (const key in json) {
                                    let base64 = json[key];
                                    if (base64.substring(0, 2) === "b'" && base64[base64.length - 1]) {
                                        base64 = base64.slice(2);
                                        base64 = base64.slice(0, -1);
                                    }
                                    tempImages.push(
                                        <img className="img" key={key} src={'data:image/jpeg;base64,' + base64} alt={`webscraper ${key}`}/>
                                    );
                                }
                                imagesDataSet(tempImages);
                                setLoading(false);
                            });
                    } else {
                        let tempImages = [];
                        fetch(json.product.screenshot)
                            .then((res) => res.json())
                            .then((json) => {
                                tempImages.push(<img src={json.uri} id="carousel-single" alt="screenshot" />);
                                console.log(tempImages);
                                imagesDataSet(tempImages);
                                setLoading(false);
                            });
                    }
                });
        }
        
        getFriendsAndContacts(text);
    }, [query.data, query.status]);
    
    
    
    const overrideCarouselStyles = () => {
        const carouselElement = document.querySelector('.carousel');
        const arrowElements = document.getElementsByClassName('control-arrow');
        if (!query.data || !query.data.display) return;
        
        if (!carouselElement || arrowElements.length === 0) {
            requestAnimationFrame(overrideCarouselStyles);
            return;
        }

        carouselElement.classList.add('carousel-override');
        Array.prototype.forEach.call(arrowElements, el => { el.classList.add('control-arrow-override') });
    };

    useEffect(overrideCarouselStyles, [query.data, carouselIndex]);

    const handleClosetPopup = () => {
        queryClient.setQueryData(['ItemDetails'], { display: false})    
    }
    
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
        // .then(json => console.log(json))
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

    const handleSearch = event => {
        const { value } = event.target;
        console.log(event, value);
        setText(value);
        getFriendsAndContacts(value);
    };
    
    const debounceSearch = () => {
        let timeout;
        
        return event => {
            const func = () => {
                clearTimeout(timeout);
                handleSearch(event);
            }
            
            clearTimeout(timeout);
            setTimeout(func, 1000);
        };
    };

    return (
        <Dialog
            PaperProps={{ style: { height: '55%', width: '65%' } }}
            maxWidth={false}
            open={query.data && query.data.display}
            onClose={handleClosetPopup}
        >
            <DialogContent style={{ paddingTop: 25, paddingBottom: 25 }}>
                <Grid style={{ height: '100%' }} justify="space-evenly" wrap="nowrap" container>
                    <Grid
                        style={{ height: '100%' }}
                        xs={5}
                        direction="column"
                        wrap="nowrap"
                        justify="space-between"
                        alignItems="flex-start"
                        container
                        item
                    >
                        <Grid alignItems="center" justify="center" container item>
                            {
                                loading ? (
                                    <CircularProgress />
                                ) : (
                                    itemDetail &&
                                    <motion.div
                                        id="image-container"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1 }}
                                    >
                                        {
                                            imageData.length > 1 ?
                                                <div id="carousel">
                                                    <Carousel
                                                        onChange={i => setCarouselIndex(i)}
                                                        showThumbs={false}
                                                        showStatus={false}
                                                        showArrows
                                                    >
                                                        {imageData}
                                                    </Carousel>
                                                </div>
                                                :
                                                imageData[0]
                                        }
                                    </motion.div>
                                )
                            }
                        </Grid>
                        <Grid container item>
                            {
                                itemDetail &&
                                <Grid
                                    style={{ width: 300, marginTop: 15 }}
                                    direction="column"
                                    alignItems="flex-start"
                                    justify="flex-start"
                                    container
                                    item
                                >
                                    <span style={{ fontWeight: 'bold' }}>{itemDetail.brand}</span>
                                    <TextOverflow id="product-name" text={itemDetail.name ? itemDetail.name.split(',')[0] : ''} />
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                    <Grid style={{ height: '100%' }} xs={4} wrap="nowrap" direction="column" container item>
                        <Grid item>
                            <h2 style={{ fontWeight: 'bold' }}>Get Feedback!</h2>
                        </Grid>
                        <Grid item>
                            <TextField
                                style={{ width: '100%' }}
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <InputAdornment><Search /></InputAdornment>,
                                    className: 'friends-search'
                                }}
                                placeholder="Search Contacts"
                                onChange={debounceSearch()}
                            />
                        </Grid>
                        <Grid item>
                            <Button className="contact-button">
                                <Grid justify="space-between" alignItems="center" container>
                                    <span>Add contact</span>
                                    <AddCircle />
                                </Grid>
                            </Button>
                        </Grid>
                        <Grid style={{ flexGrow: 2 }} item>
                            <Scrollbars style={{ height: '100%' }} autoHide>
                                {
                                    friends.map((f, i) => (
                                        <Grid key={i} style={{ width: '100%' }} item>
                                            <Button className="contact-button">
                                                <Grid justify="space-between" alignItems="center" container>
                                                    <Grid style={{ width: 'auto' }} alignItems="center" container item>
                                                        <img style={{ height: 40, width: 40, paddingRight: 10 }} src={f.profile_image} alt="Profile" />
                                                        <span>
                                                            {f.is_user ? `${f.first_name} ${f.last_name}` : f.name}
                                                        </span>
                                                    </Grid>
                                                    <Grid item>
                                                        <Send />
                                                    </Grid>
                                                </Grid>
                                            </Button>
                                        </Grid>
                                    ))
                                }
                                {
                                    friends.map((f, i) => (
                                        <Grid key={i} style={{ width: '100%' }} item>
                                            <Button className="contact-button">
                                                <Grid justify="space-between" alignItems="center" container>
                                                    <Grid style={{ width: 'auto' }} alignItems="center" container item>
                                                        <img style={{ height: 40, width: 40, paddingRight: 10 }} src={f.profile_image} alt="Profile" />
                                                        <span>
                                                            {f.is_user ? `${f.first_name} ${f.last_name}` : f.name}
                                                        </span>
                                                    </Grid>
                                                    <Grid item>
                                                        <Send />
                                                    </Grid>
                                                </Grid>
                                            </Button>
                                        </Grid>
                                    ))
                                }
                            </Scrollbars>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );

        // return(
        //     query.data && query.data.display ?
        //     <AnimatePresence>
        //         <motion.div id="ItemPopup"
        //           initial={{ opacity: 0 }}
        //           animate={{ opacity: 1 }}
        //           exit={{ opacity: 0 }}    
        //         >
        //
        //             <div id="itemContainer">
        //                 <div id="top">
        //                     <IconButton onClick={handleClosetPopup}><IoArrowBack/></IconButton>
        //                 </div>
        //                 <div id="content" style={{flexDirection: windowWidth >= 1200 ? "row" : "column" }}>
        //                     {
        //                         itemDetail &&
        //                         <motion.div id="image-container"
        //                             initial={{ opacity: 0 }}
        //                             animate={{ opacity: 1 }}
        //                             transition={{duration: 1}}
        //                         >
        //                            
        //                             {imageData.length > 1 ?
        //                                 <div id="carousel">
        //                                         <Carousel
        //                                             value={imageIndex}
        //                                             slides={imageData}
        //                                             onChange={handleCarousel}
        //                                             plugins={['centered']}
        //                                         />
        //                                 </div>
        //                                 :
        //                                 imageData[0]
        //                             }
        //
        //
        //                         </motion.div>
        //                     }
        //                     <div id="content-container">
        //                         {itemDetail && <div id="webscrape">
        //                             {itemDetail.brand && <div id="brand">Brand: {itemDetail.brand}</div>}
        //                             {itemDetail.name && <div id="name">Name: {itemDetail.name}</div>}
        //                             {itemDetail.price && <div id="price">Price: {itemDetail.price} {itemDetail.currency}</div>}
        //                             <div id="link"><a href={itemDetail.url} rel="noreferrer" target="_blank">Product Link</a></div>
        //                         </div>}
        //                         <div id="feedback">
        //                             {/* <Scrollbars id="scrollbar" style={{width: "100%", height: "200px"}}> */}
        //                                 <div id="friend-container">
        //                                 {
        //                                     friends.map((friend, i) => 
        //                                     <>
        //                                         <div id="friend" key={i}>
        //                                             <div id="friendicon">{friend.name ?? friend.phonenumber}</div>
        //                                             <IconButton id="send" onClick={()=>handleSendRequest(friend.id)}><FiSend/></IconButton>
        //                                         </div>         
        //                                     </>
        //                                         )
        //                                 }
        //                             </div>
        //                             {/* </Scrollbars> */}
        //                             <div>
        //                                 <IconButton onClick={handleGetCopyLink}><FaCopy/></IconButton>
        //                             </div>
        //
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </motion.div>
        //     </AnimatePresence>
        //     :
        //     <div id="none">
        //  
        //     </div>
        // )
}
export default ItemPopup;
