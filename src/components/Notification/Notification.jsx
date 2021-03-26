import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Tooltip } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { AiOutlineSmile, AiOutlineFrown } from 'react-icons/ai';
import './Notification.scss'
import APIURL from '../../assets/URL';
// import { motion } from 'framer-motion';

function Notification({ notification}) {
    const [product, setProduct] = useState(undefined);
    const [image, setImage] = useState(undefined);
    useEffect(() => {
        if (!product) {
            const rexUID = localStorage.getItem('rexUID');
            // We need to get the product id for the asFriend key also
            fetch(`${APIURL}/api/product?product_id=${notification.product_id}&uid=${rexUID}`)
                .then(res => res.json())
                .then(json => {
                    setProduct(json.product);
                })
                // .catch(err => console.log("product err", err, notification))
        }
        
        if (product) {
            if (product.images) {
                fetch(product.images)
                    .then(res => res.json())
                    .then(json => {
                        let base64 = json.img_1;
                        if (base64.substring(0, 2) === "b'" && base64[base64.length - 1]) {
                            base64 = base64.slice(2);
                            base64 = base64.slice(0, -1);
                        }
                        setImage('data:image/jpeg;base64,' + base64);
                    })
                    .catch(err => console.log("err 1"));
            } else {
                fetch(product.screenshot).then(res => res.json())
                    .then(json => setImage(json.uri))
                    .catch(err => console.log("err 2"));
            }
        }
    }, [product, notification.product_id]);
    
    return(
        <Card style={{ width: '100%' }}>
            <CardContent>
                <Grid spacing={2} container wrap="nowrap">
                    <Grid item>
                        <AccountCircle style={{ height: 64, width: 64 }} />
                    </Grid>
                    {
                        notification &&
                        <Grid style={{ flexGrow: 2 }} item>
                            <span style={{ fontWeight: 'bold' }}>{notification.name}</span>
                            <br />
                            @username
                        </Grid>
                    }
                    <Grid item>
                        <span style={{ fontStyle: 'italic' }}>Sent Feedback</span>
                    </Grid>
                    <Grid style={{ marginLeft: 30, marginRight: 15 }} item>
                        <img style={{ height: 80, width: 80 }} src={image} alt="product" id="image" />
                    </Grid>
                    <Grid style={{ width: 'auto' }} direction="column" container item>
                        {
                            product && 
                            <>
                                <Grid item>
                                    <span style={{ fontWeight: 'bold' }}>{product.brand}</span>
                                </Grid>
                                <Grid item>
                                    {
                                        product.name.length < 30 ?
                                            product.name
                                            :
                                            <Tooltip title={product.name} disableFocusListener disableTouchListener arrow>
                                                <span>{`${product.name.substring(0, 30)}...`}</span>
                                            </Tooltip>
                                    }
                                </Grid>
                            </>
                        }
                        {
                            notification &&
                            <Grid item>
                                <p>{notification.feedback}</p>
                            </Grid>
                        }
                    </Grid>
                    <Grid item>
                        {
                            notification.thumbs_up ? (
                                <div>
                                    <AiOutlineSmile style={{ color: '#37DB69', height: 64, width: 64 }} />
                                </div>
                            ) : (
                                <div>
                                    <AiOutlineFrown style={{ color: '#FD6C73', height: 64, width: 64 }} />
                                </div>
                            )
                        }
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default Notification;
