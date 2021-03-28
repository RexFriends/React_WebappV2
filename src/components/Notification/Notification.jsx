import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, IconButton, Tooltip } from '@material-ui/core';
import { AccountCircle, Send } from '@material-ui/icons';
import { AiOutlineSmile, AiOutlineFrown } from 'react-icons/ai';
import './Notification.scss'
import APIURL from '../../assets/URL';

function Notification({ notification }) {
    const [product, setProduct] = useState(undefined);
    const [image, setImage] = useState(undefined);
    useEffect(() => {
        if (!product) {
            const rexUID = localStorage.getItem('rexUID');
            // We need to get the product id for the asFriend key also
            fetch(`${APIURL}/api/product?product_id=${notification.product_info.id}&uid=${rexUID}`)
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
    
    let name = '';
    if (notification.first_name) name += notification.first_name.trim();
    if (notification.last_name) name += ` ${notification.last_name.trim()}`;
    if (!name) name = 'Someone';
    return(
        <Card style={{ width: '100%', backgroundColor: notification.seen ? 'rgb(230, 230, 230)' : '#fff' }}>
            <CardContent>
                <Grid spacing={2} container wrap="nowrap">
                    <Grid item>
                        <AccountCircle style={{ height: 64, width: 64 }} />
                    </Grid>
                    {
                        notification &&
                        <Grid style={{ flexGrow: 1 }} item>
                            <span style={{ fontWeight: 'bold' }}>{name}</span>
                            <br />
                            {notification.username ? `@${notification.username}` : ''}
                        </Grid>
                    }
                    <Grid item>
                        <span style={{ fontStyle: 'italic' }}>{notification.time_sent ? 'Requested feedback' : 'Sent feedback'}</span>
                    </Grid>
                    <Grid style={{ marginLeft: 15, marginRight: 15 }} item>
                        <img style={{ height: 80, width: 80 }} src={image} alt="product" id="image" />
                    </Grid>
                    <Grid style={{ width: '30%' }} direction="column" container item>
                        {
                            product && 
                            <>
                                <Grid item>
                                    <span style={{ fontWeight: 'bold' }}>{product.brand || 'Something'}</span>
                                </Grid>
                                <Grid item>
                                    {
                                        product.name ?
                                            product.name.length < 30 ?
                                                product.name
                                                :
                                                <Tooltip title={product.name} disableFocusListener disableTouchListener arrow>
                                                    <span>{`${product.name.substring(0, 30)}...`}</span>
                                                </Tooltip>
                                            :
                                            <span>Something</span>
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
                            notification.time_sent ? (
                                <div>
                                    <IconButton> {/* TODO: fix positioning to line up with icons */}
                                        <Send style={{ color: '#37DB69', height: 64, width: 64 }} />
                                    </IconButton>
                                </div>
                            )
                            :
                            notification.thumbs_up ? (
                                    <div>
                                        <AiOutlineSmile style={{ color: '#37DB69', height: 64, width: 64, margin: '0 12' }} />
                                    </div>
                                ) : (
                                    <div>
                                        <AiOutlineFrown style={{ color: '#FD6C73', height: 64, width: 64, margin: '0 12' }} />
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
