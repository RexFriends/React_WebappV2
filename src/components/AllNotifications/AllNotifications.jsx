import React, { useEffect, useState } from 'react';
import { List, ListItem } from '@material-ui/core';
import Notification from '../Notification/Notification';
import APIURL from '../../assets/URL';

function AllNotifications() {
    const [NotifData, NotifDataSet] = useState(undefined);
    useEffect(() => {
        let rexUID = localStorage.getItem("rexUID")
        fetch(APIURL + "/api/get_notif?uid=" + rexUID)
            .then(res => res.json())
            .then(json => {
                console.log("Notification Fetch", json);
                NotifDataSet(json.notifications);
            });
        
        return () => {

        }
    }, []);
    
    return (
        <>
            {
                NotifData && (
                    <List>
                        {NotifData.asFriend.map((notif, i) => <ListItem><Notification notification={notif} key={i} /></ListItem>)}
                        {NotifData.asUser.map((notif, i) => <ListItem><Notification notification={notif} key={i} /></ListItem>)}
                    </List>
                )
            }
        </>
    );
}

export default AllNotifications;
