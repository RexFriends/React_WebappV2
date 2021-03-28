import React, { useEffect, useState } from 'react';
import { List, ListItem, ListSubheader } from '@material-ui/core';
import Notification from '../Notification/Notification';
import APIURL from '../../assets/URL';

function AllNotifications() {
    const [notifications, setNotifications] = useState(undefined);
    
    const updateNotifications = (notifs) => {
        if (notifs) {
            const rexUID = localStorage.getItem('rexUID');
            const toUpdate = notifs.filter(n => n.seen && n.time_responded);
            if (toUpdate.length > 0) {
                fetch(`${APIURL}/api/update-notification?uid=${rexUID}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        notification_list: toUpdate
                    })
                })
                    .then(() => {
                        getNotifications(false);
                    })
                    .catch(console.error);
            }
        }
    };
    
    const getNotifications = (update) => {
        const rexUID = localStorage.getItem("rexUID");
        fetch(`${APIURL}/api/get_notif?uid=${rexUID}`)
            .then(res => res.json())
            .then(json => {
                setNotifications(json.notifications);
                if (update) setTimeout(() => updateNotifications(json.notifications.notifications), 1000);
            });
    }
    
    useEffect(() => getNotifications(true), []);
    
    return (
        <>
            {
                notifications && (
                    <List subheader={<ListSubheader disableSticky>Notifications</ListSubheader>}>
                        {notifications.notifications.map((notif, i) => <ListItem key={i}><Notification notification={notif} /></ListItem>)}
                    </List>
                )
            }
        </>
    );
}

export default AllNotifications;
