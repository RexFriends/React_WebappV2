import React, { useEffect, useState } from 'react';
import { List, ListItem } from '@material-ui/core';
import Notification from '../Notification/Notification';
import APIURL from '../../assets/URL';

function AllNotifications() {
    const [notifications, setNotifications] = useState(undefined);
    useEffect(() => {
        let rexUID = localStorage.getItem("rexUID")
        fetch(APIURL + "/api/get_notif?uid=" + rexUID)
            .then(res => res.json())
            .then(json => {
                setNotifications(json.notifications);
            });
    }, []);
    
    return (
        <>
            {
                notifications && (
                    <List>
                        {notifications.notifications.map((notif, i) => <ListItem key={i}><Notification notification={notif} /></ListItem>)}
                    </List>
                )
            }
        </>
    );
}

export default AllNotifications;
