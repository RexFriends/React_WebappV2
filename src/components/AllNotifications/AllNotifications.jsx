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
                        {/* ! We need to  combine both these lists & sort them by the most recent */}
                        {NotifData.asFriend.map((notif, i) => <ListItem key={`A${i}`}  ><Notification notification={notif} /></ListItem>)}
                        {NotifData.asUser.map((notif, i) => <ListItem key={`B${i}`}  ><Notification notification={notif} /></ListItem>)}
                    </List>
                )
            }
        </>
    );
}

export default AllNotifications;
