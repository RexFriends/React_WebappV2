import React, { useEffect, useState } from 'react';
import { List, ListItem, ListSubheader } from '@material-ui/core';
import Notification from '../Notification/Notification';
import APIURL from '../../assets/URL';

function AllNotifications({ notifCountSetter }) {
    const [notifications, setNotifications] = useState(undefined);

    const performUpdateCall = (toUpdate) => {
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
            .then(() => {
                getNotifications(false);
            })
            .catch(console.error);
    };

    const updateAllUnseenNotifications = notifs => { // update unseen notifs which aren't of the "requested feedback" type
        if (notifs) {
            const toUpdate = notifs.filter(n => !n.seen && n.time_responded)
                .map(n => ({ id: n.id, notified_user: true, type: 'completed' }));
            if (toUpdate.length > 0) {
                performUpdateCall(toUpdate);
            }
        }
    };

    const getNotifications = (update) => {
        const rexUID = localStorage.getItem('rexUID');
        fetch(`${APIURL}/api/get_notif?uid=${rexUID}`)
            .then(res => res.json())
            .then(json => {
                notifCountSetter(json.notifications.amount);
                setNotifications(json.notifications);
                if (update) setTimeout(() => updateAllUnseenNotifications(json.notifications.notifications), 2000);
            });
    };

    useEffect(() => getNotifications(true), []);

    return (
        <>
            {
                notifications &&
                <List subheader={<ListSubheader disableSticky>Notifications</ListSubheader>}>
                    {
                        notifications.notifications.map((notif, i) => <ListItem key={i}>
                            <Notification notification={notif} updater={performUpdateCall}/>
                        </ListItem>)
                    }
                </List>
            }
        </>
    );
}

export default AllNotifications;
