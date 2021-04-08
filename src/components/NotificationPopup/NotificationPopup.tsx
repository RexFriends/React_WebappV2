import React, { useEffect, useState } from 'react';
import { Grid, Popover } from '@material-ui/core';
import Notification from '../Notification/Notification';
// import NotificationList from './NotificationList';
import Scrollbars from 'react-custom-scrollbars';
import APIURL from '../../assets/URL';
import useWindowDimensions from '../../Hooks/useWindowDimensions';

export interface INotificationPopupProps {
    open: boolean,
    onClose: () => void,
    notifCountSetter: React.Dispatch<React.SetStateAction<number>>
}

function NotificationPopup({ open, onClose, notifCountSetter }: INotificationPopupProps) {
    const [notifications, setNotifications] = useState<Array<INotification>>([]);
    const [page, setPage] = useState("request")

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
                if (update) setTimeout(() => updateAllUnseenNotifications(json.notifications.notifications), 2000);
            });
    };

    useEffect(() => getNotifications(true), []);

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
                    <div id="container" style={{width: '100%', height: '100%', border: 'solid red 2px'}}>
                    <span>Send Feedback</span>
                    <div id="product-info">
                        <span>
                            Product name
                        </span>
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
