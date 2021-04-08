import React, { useEffect, useState } from 'react';
import { Grid, Popover } from '@material-ui/core';
import Notification from '../Notification/Notification';
// import NotificationList from './NotificationList';
import Scrollbars from 'react-custom-scrollbars';
import APIURL from '../../assets/URL';
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import { AiOutlineFrown, AiOutlineSmile } from 'react-icons/ai';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { showAlert } from '../Alerts/Alerts';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export interface INotificationPopupProps {
    open: boolean,
    onClose: () => void,
    notifCountSetter: React.Dispatch<React.SetStateAction<number>>
}

function NotificationPopup({ open, onClose, notifCountSetter }: INotificationPopupProps) {
    const [notifications, setNotifications] = useState<Array<INotification>>([]);
    const [page, setPage] = useState("request")
    const [currentRequest, setCurrentRequest] = useState<INotification>();
    const [thumbs, thumbsSet] = useState(false);
    const [additionalFeedback, additionalFeedbackSet] = useState("");

    const performUpdateCall = (toUpdate: Array<NotificationUpdate>) => {
        const rexUID = localStorage.getItem('rexUID');
        fetch(`${APIURL}/api/update-notification?uid=${rexUID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                notification_list: toUpdate
            })
        })
            .then(res => res.json())
            .then(() => {
                getNotifications(false);
            })
            .catch(console.error);
    };

    const updateAllUnseenNotifications = (notifs: Array<INotification>) => { // update unseen notifs which aren't of the "requested feedback" type
        if (notifs) {
            const toUpdate: Array<NotificationUpdate> = notifs.filter(n => !n.seen && n.time_responded)
                .map(n => ({ id: n.id, notified_user: true, type: 'completed' }));
            if (toUpdate.length > 0) {
                performUpdateCall(toUpdate);
            }
        }
    };

    const getNotifications = (update: boolean) => {
        const rexUID = localStorage.getItem('rexUID');
        fetch(`${APIURL}/api/get_notif?uid=${rexUID}`)
            .then(res => res.json())
            .then(json => {
                notifCountSetter(json.notifications.amount);
                setNotifications(json.notifications.notifications);
                // console.log(json.notifications.notifications[0].product_info)
                console.log(json.notifications.notifications[0]);
                setCurrentRequest(json.notifications.notifications[0]);
                if (update) setTimeout(() => updateAllUnseenNotifications(json.notifications.notifications), 2000);
            });
    };

    useEffect(() => getNotifications(true), []);

    const handleSendFeedback = () => {
        if (thumbs === undefined) {
            showAlert('Add Response!', 'error');
        } else {
            let payload = {
                // additionalFeedback: additionalFeedback,
                // review: thumbs,
                // feedback_row_id: currentRequest.id
            };
            // fetch(
            //     APIURL + `/feedback?uid=${uid ? uid : 'null'}&rex_feedback_link=${id}`,
            //     {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify(payload)
            //     }
            // )
            //     .then((res) => res.json())
            //     .then((json) => {
            //         console.log('response after send', json);
            //         if (json.success === true) {
            //             completePageSet(true);
            //             return;
            //         }
            //         if (json.success === false) {
            //             completePageSet(true);
            //             completePageContentSet(json.reason);
            //         }
            //     })
            //     .catch((err) => console.log('err response after send:', err));
        }
    }

    return (
        <Popover
            PaperProps={{ style: { height: '80vh', width: 465, maxWidth: '100vw', borderRadius: 15 } }}
            open={open}
            onClose={onClose}
            anchorEl={document.getElementById('notif-button')}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            { page === "notifications" ?
                //  <NotificationList notifications={notifications} updated={performUpdateCall}/>
                <Grid container>
                    
                    <h3 style={{ textAlign: 'center' }}>Notifications</h3>
                    <Scrollbars style={{ height: '70vh' }} autoHide>
                        <Grid style={{ padding: '15px 10px' }} direction="column" container>
                            {
                                notifications.map((notif, i) =>
                                    <Notification key={i} notification={notif} updater={performUpdateCall} />
                                )
                            }
                        </Grid>
                    </Scrollbars>
                </Grid>
              :
              page === 'feeback' ?
                    <div id="container" style={{width: '100%', height: '100%', border: 'solid red 2px'}}>
                        
                     </div>
              :

              page === 'request' ?

                    <div id="container" style={{width: '100%', height: '95%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', margin: '20px 10px 10px 10px'}}>
                            
                            <Button onClick={() => {setPage('notifications')}} style={{width: '20px', height: '30px', margin: 'auto 0px auto 0', borderRadius: '100px'}}>
                                <ArrowBackIosIcon/>
                            </Button>
                            <span style={{margin: 'auto auto auto 100px', fontWeight: 700}}>Send Feedback</span>
                        </div>
                        
                        <div id="user-info" style={{height: '60px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', margin: '10px'}}>
                            <img src="https://ui-avatars.com/api/?background=207c9d&color=fff&rounded=true&name=Manas+Chakka&size=64" style={{width: '45px', height: '45px', margin: 'auto 5px auto 30px'}} />
                            <div style={{margin: 'auto auto auto 0px', flexDirection: 'column', display: 'flex', justifyContent: 'space-around'}}>
                            <span style={{fontWeight: 700}} >Manas Chakka</span>
                            <span style={{fontSize: '12px'}}>@mchakka456</span>
                            </div>
                            
                        </div>
                       
                        <div id="product-info" style={{display: 'flex', flexDirection: 'row', width: '100%', height: '220px', margin: '5px auto 0px auto'}}>
                        
                            <div id="image-container" style={{height: '95%', width: '50%', margin: '5px 5px 5px auto'}}>
                                { currentRequest ?
                                    <img src="https://12ax7web.s3.amazonaws.com/accounts/1/products/1986199879943/Ramen-Panda-tahiti-blue-light-t-shirt-teeturtle-full-21-1000x1000.jpg" alt="product img" style={{height: '100%', width: 'auto', display: 'block', margin: 'auto 5px auto auto'}}></img>
                                    // <img src={currentRequest.images} alt="product img" style={{height: '100%', width: 'auto', display: 'block', margin: 'auto'}}></img>
                                :
                                    <div>
                                        Loading
                                    </div>
                                }
                            </div>
                            <div id="product-details" style={{display: 'flex', flexDirection: "column", justifyContent: 'space-around', width: '40%', margin: '0 10px 0 0px'}}>
                                <span>Brand</span>
                                <span>Product Name</span>
                                <span>Price</span>
                            </div>
                        </div>
                        <div style={{height: '300px', width: '100%', margin: '0 auto auto auto', display: 'flex', flexDirection: 'column'}}>
                                <div style={{margin: '10px auto 0 auto'}}>
                                <IconButton
                                    id="button"
                                    className={thumbs === true ? 'highlight1' : ''}
                                    style={{ color: '#FD6C73' , width: '70px', height: '70px'}}
                                    onClick={() => thumbsSet(false)}
                                >
                                    <AiOutlineFrown id="icon" style={{width: '100%', height: '100%'}}/>
                                </IconButton>
                                <IconButton
                                    id="button"
                                    className={thumbs === false ? 'highlight1' : ''}
                                    style={{ color: '#37DB69', width: '70px', height: '70px' }}
                                    onClick={() => thumbsSet(true)}
                                >
                                    <AiOutlineSmile id="icon" style={{width: '100%', height: '100%'}}/>
                                </IconButton>
                                </div>
                                {/* <TextField
                                            multiline
                                            id="text_field"
                                            label="thoughts???"
                                            autoComplete="off"
                                            value={additionalFeedback}
                                            onChange={(e) => additionalFeedbackSet(e.target.value)}
                                        /> */}
                                <textarea 
                                    name="Text1"
                                    placeholder="Add Comment..."
                                    style={{width: '80%', height: '70px', margin: '10px auto auto auto', resize: 'none', borderRadius: '5px'}}
                                />
                                <Button
                                    onClick={handleSendFeedback}
                                    id="submit"
                                    style={{width: '80px', height: '40px', margin: '10px auto auto auto', backgroundColor: '#14c4b2', color: 'white', borderRadius: '100px', fontWeight: 700, fontSize: '16px'}}
                                >
                                    Send
                                </Button>
                                

                        </div>

                     </div>
                     
                    
                :
                <div>
                    Some Page
                </div>
            }
           
            {/* <h3 style={{ textAlign: 'center' }}>Notifications</h3>
            <Scrollbars style={{ height: '70vh' }} autoHide>
                <Grid style={{ padding: '15px 10px' }} direction="column" container>
                    {
                        notifications.map((notif, i) =>
                            <Notification key={i} notification={notif} updater={performUpdateCall} />
                        )
                    }
                </Grid>
            </Scrollbars> */}
        </Popover>
    );
}

export default NotificationPopup;
