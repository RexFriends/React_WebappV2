import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, IconButton, Tooltip } from '@material-ui/core';
import { AccountCircle, Send } from '@material-ui/icons';
import { AiOutlineSmile, AiOutlineFrown } from 'react-icons/ai';
import './Notification.scss'
import APIURL from '../../assets/URL';
import TextOverflow from '../TextOverflow/TextOverflow';

function Notification({ notification, updater }) {
    const [product, setProduct] = useState(undefined);
    const [image, setImage] = useState(undefined);
    useEffect(() => {
        if (!product) {
            const rexUID = localStorage.getItem('rexUID');
            fetch(`${APIURL}/api/product?product_id=${notification.product_info.id}&uid=${rexUID}`)
                .then(res => res.json())
                .then(json => {
                    setProduct(json.product);
                });
        }
        
        if (product) {
            if (product.images) {
                fetch(product.images)
                    .then(res => res.json())
                    .then(json => {
                        setImage(json.img_1);
                    })
                    .catch(err => console.log("err 1"));
            } else {
                fetch(product.screenshot).then(res => res.json())
                    .then(json => setImage(json.uri))
                    .catch(err => console.log("err 2"));
            }
        }
    }, [product, notification.product_id]);
    
    const redirectToFeedbackForm = () => {
        updater([{ id: notification.id, notified_user: true, type: 'request' }]);
        window.open(notification.feedback_form_link, '_blank');
    };
    
    let name = '';
    if (notification.first_name) name += notification.first_name.trim();
    if (notification.last_name) name += ` ${notification.last_name.trim()}`;
    name = name.trim(); // in case only the last name is present so there's an extra space
    if (!name) name = 'Someone';
    
    return(
        <Card style={{ width: '100%', backgroundColor: notification.seen ? 'rgb(230, 230, 230)' : '#fff' }}>
            <CardContent>
                <Grid spacing={2} container wrap="nowrap">
                    <Grid item>
                        <img
                            style={{ height: 40, width: 40, paddingRight: 10 }}
                            src={notification.profile_image ?? `https://ui-avatars.com/api/?background=bdbcbb&color=fff&rounded=true&name=${notification.name}&size=64`}
                            alt="Profile"
                        />
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
                        <span style={{ fontStyle: 'italic', fontSize: '11pt' }}>{notification.time_sent ? 'Requested feedback' : 'Sent feedback'}</span>
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
                                    <TextOverflow text={product.name ? product.name.split(',')[0] : ''} overflowLength={30} />
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
                                    <IconButton onClick={redirectToFeedbackForm}>
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
