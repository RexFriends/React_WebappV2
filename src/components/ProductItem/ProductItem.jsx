import React, { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, Divider, Grid, InputAdornment, Popover, TextField } from '@material-ui/core';
import { AddToPhotos, Close, Delete, FileCopy, MoreHoriz, PersonAdd, Search, Send } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { FaCopy } from 'react-icons/fa';
import './ProductItem.scss';
import TextOverflow from '../TextOverflow/TextOverflow';
import SendIcon from '@material-ui/icons/Send';
import URL from '../../assets/URL';
import APIURL from '../../assets/URL';
import Scrollbars from 'react-custom-scrollbars';

function ProductItem({ item }) {
    const [hover, hoverSet] = useState(false);
    const [image, imageSet] = useState(undefined);
    const [brand, brandSet] = useState("Brand");
    const [product_name, product_nameSet] = useState("Product name");
    const [price, priceSet] = useState("$99.99");
    const [brandLogo, setbrandlogo] = useState(undefined);
    const [showPopup, setShowPopup] = useState(false);
    const [showItemPopup, setShowItemPopup] = useState(false);
    const [friends, friendsSet] = useState([]);
    const [text, setText] = useState('');
    
    useEffect(() => {
        if (item.images !== null) {
            fetch(item.images)
                .then(res => res.json())
                .then(json => {
                    imageSet(json.img_1);
                })
                .catch(err => console.log("err 1"));
        } else {
            fetch(item.screenshot)
                .then(res => res.json())
                .then(json => imageSet(json.uri))
                .catch(err => console.log("err 2"));
        }
        brandSet(item.brand);
        product_nameSet(item.name);
        priceSet(item.price);
        
        getFriendsAndContacts(text);
    }, [text, item]);

    const getFriendsAndContacts = value => {
        const rexUID = localStorage.getItem("rexUID");
        fetch(`${APIURL}/api/get-users?uid=${rexUID}&text=${value}`)
            .then((res) => res.json())
            .then((json) => {
                friendsSet(json.users);
            });
    };
    
    const queryClient = useQueryClient();

    const handleShowInfo = () => {
        setShowItemPopup(true);
        setShowPopup(false);
    }

    const handleSendRequest = id => {
        const rexUID = localStorage.getItem("rexUID");
        const payload = {
            user_requesting_id: id,
            product_id: item.id,
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
        const payload = { listing_id: item.id};
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
    
    const productId = `product-${item.id}`;
    const productElement = document.getElementById(productId);
    let position;
    if (productElement) {
        const clientRect = productElement.getBoundingClientRect();
        const rightHasSpace = clientRect.right + 200 < window.innerWidth;
        const left = rightHasSpace ? clientRect.right : clientRect.left - 185;
        position = { top: clientRect.bottom, left };
    }

    return(
        <>
            <motion.div
                id={productId}
                class="product"
                onMouseEnter={() => hoverSet(true)}
                onMouseLeave={() => hoverSet(false)}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "tween", delay: 0.3}}
            >
                {/* <img style={{width: '30px', height: 'auto', borderFadius: '100%'}} src={`logo.clearbit.com/${brandLogo}`} /> */}
                <img src={image} alt="product" id="image" />
                <Grid style={{ width: 220, padding: '0 10px' }} justify="space-between" container>
                    <Grid xs={8} direction="column" container item>
                        <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '15px' }}>{brand}</span>
                        <TextOverflow
                            style={{ color: 'rgb(114, 114, 114)', fontSize: '13px', lineHeight: '1em', textAlign: 'left' }}
                            text={product_name ? product_name.split(',')[0] : ''}
                        />
                    </Grid>
                    <Grid xs={4} direction="column" container item>
                        <Grid id="price" item>
                            <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{price}</span>
                        </Grid>
                        <Grid item>
                            <IconButton style={{ zIndex: 1000, padding: 'unset' }} onClick={() => setShowPopup(true)}>
                                <MoreHoriz />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <AnimatePresence>
                    {
                        hover &&
                        <motion.div id="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div id="top">
                                <IconButton onClick={handleShowInfo} id="info">
                                    <SendIcon fontSize="large" style={{color: "14c4b2", width: "30px", height: "30px"}}/>
                                </IconButton>
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
            </motion.div>
            <Popover
                anchorEl={document.getElementById(productId)}
                anchorReference="anchorPosition"
                anchorPosition={position}
                PaperProps={{ style: { padding: 15, borderRadius: 15 } }}
                open={showPopup}
                onClose={() => setShowPopup(false)}
            >
                <Grid direction="column" container>
                    <Grid item>
                        <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '15px' }}>Options</span>
                    </Grid>
                    <Grid style={{ margin: '10px 0 10px -15px', width: 'calc(100% + 30px)' }} item>
                        <Divider />
                    </Grid>
                    <Grid item>
                        <Button className="round-button" startIcon={<AddToPhotos />}>Add to Closet</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            className="round-button"
                            onClick={handleShowInfo}
                            startIcon={<Send />}
                        >
                            Send a Rex
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button className="round-button" startIcon={<Delete />}>Remove Product</Button>
                    </Grid>
                </Grid>
            </Popover>
            <Popover
                anchorEl={document.getElementById(productId)}
                anchorReference="anchorPosition"
                anchorPosition={position}
                PaperProps={{ style: { padding: 15, borderRadius: 15 } }}
                open={showItemPopup}
                onClose={() => setShowItemPopup(false)}
            >
                <Grid direction="column" container>
                    <Grid justify="space-between" alignItems="center" wrap="nowrap" container item>
                        <Grid alignItems="center" container item>
                            <Grid item>
                                <IconButton onClick={() => setShowItemPopup(false)}><Close /></IconButton>
                            </Grid>
                            <Grid item>
                                <span style={{ fontSize: '18pt' }}>Get Feedback!</span>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleGetCopyLink}><FileCopy /></IconButton>
                        </Grid>
                    </Grid>
                    <Grid spacing={2} alignItems="center" container item>
                        <Grid item>
                            <TextField
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <InputAdornment><Search /></InputAdornment>,
                                    style: { height: 40, borderRadius: 15 }
                                }}
                                placeholder="Search Users"
                                onChange={debounceSearch()}
                            />
                        </Grid>
                        <Grid item>
                            <Button className="round-button" startIcon={<PersonAdd />}>Invite</Button>
                        </Grid>
                    </Grid>
                    <Grid style={{ height: '30vh', maxHeight: 350 }} item>
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
            </Popover>
        </>
    )
}

export default ProductItem;
