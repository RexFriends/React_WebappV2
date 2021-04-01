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
import {FaCopy} from 'react-icons/fa'
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
    const [itemDetail, itemDetailSet] = useState(undefined)
    const [imageData, imagesDataSet] = useState([])
    const [friends, friendsSet] = useState([]);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);
    const queryClient = useQueryClient()
    const query = useQuery('ItemDetails', ItemDetails);
    const [carouselIndex, setCarouselIndex] = useState(0); // used to trigger override styles
    
    const getFriendsAndContacts = value => {
        const rexUID = localStorage.getItem("rexUID");
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
                    if (json.product.images !== null) {
                        fetch(json.product.images)
                            .then((res) => res.json())
                            .then((json) => {
                                //! need to transform the weird base64 code to an img html object
                                const images = Object.entries(json)
                                    .map(([key, value]) => (
                                        <img className="img" key={key} src={value} alt={`webscraper ${key}`}/>
                                    ));
                                imagesDataSet(images);
                                setLoading(false);
                            });
                    } else {
                        let tempImages = [];
                        fetch(json.product.screenshot)
                            .then((res) => res.json())
                            .then((json) => {
                                tempImages.push(<img src={json.uri} id="carousel-single" alt="screenshot" />);
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
        queryClient.setQueryData(['ItemDetails'], { display: false});
        setText('');
        setCarouselIndex(0);
    }
    
    const handleSendRequest = id => {
        const rexUID = localStorage.getItem("rexUID");
        const payload = {
            user_requesting_id: id,
            product_id: itemDetail.id,
        };
        fetch(URL + '/api/send_rex?uid=' + rexUID, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(res => res.json());
    }

    const copyFallback = link => {
        const inp = document.createElement('input');
        document.body.appendChild(inp);
        inp.value = link;
        inp.select();
        document.execCommand('copy', false);
        inp.remove();
    };
    
    const handleGetCopyLink = () => {
        const rexUID = localStorage.getItem("rexUID");
        const payload = { listing_id: itemDetail.id};
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
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(link)
                        .catch(err => {
                            console.error(err);
                            copyFallback(link);
                        })
                } else copyFallback(link);
            });
    }

    const handleSearch = event => {
        const { value } = event.target;
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
            PaperProps={{ style: { height: '55%', width: '65%', maxHeight: 550, maxWidth: 850, borderRadius: 15 } }}
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
                    <Grid style={{ height: '100%' }} xs={5} wrap="nowrap" direction="column" container item>
                        <Grid style={{ marginLeft: 12 }} item>
                            <h2 style={{ fontWeight: 'bold' }}>Get Feedback!</h2>
                        </Grid>
                        <Grid justify="space-between" container item>
                            <Grid style={{ marginLeft: 12 }} xs={9} item>
                                <TextField
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <InputAdornment><Search /></InputAdornment>,
                                        className: 'users-search'
                                    }}
                                    placeholder="Search Users"
                                    onChange={debounceSearch()}
                                />
                            </Grid>
                            <Grid style={{ textAlign: 'right' }} xs={2} item>
                                <IconButton style={{ paddingRight: 12 }} onClick={handleGetCopyLink}>
                                    <FaCopy/>
                                </IconButton>
                            </Grid>
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
                                            <Button className="contact-button" onClick={() => handleSendRequest(f.id)}>
                                                <Grid justify="space-between" alignItems="center" container>
                                                    <Grid style={{ width: 'auto' }} wrap="nowrap" alignItems="center" container item>
                                                        <img style={{ height: 40, width: 40, paddingRight: 10 }} src={f.profile_image} alt="Profile" />
                                                        <Grid direction="column" justify="center" alignItems="flex-start" container item>
                                                            <TextOverflow
                                                                style={{ fontSize: '9pt', fontWeight: 'bold' }}
                                                                text={f.is_user ? `${f.first_name} ${f.last_name}` : f.name}
                                                                overflowLength={26}
                                                            />
                                                            {
                                                                f.is_user ? (
                                                                    <span style={{ fontSize: '8pt' }}>@{f.username}</span>
                                                                ) : null
                                                            }
                                                        </Grid>
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
}
export default ItemPopup;
