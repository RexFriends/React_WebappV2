import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { AccountCircle, Photo } from '@material-ui/icons';
import TextOverflow from '../TextOverflow/TextOverflow';

export interface INotificationProps {
    notification: INotification,
    updater: (toUpdate: Array<NotificationUpdate>) => void
}

function Notification({ notification, updater }: INotificationProps): JSX.Element {
    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<string>('');

    useEffect(() => {
        if (!name) {
            let temp = '';
            if (notification.first_name) temp += notification.first_name.trim();
            if (notification.last_name) temp += ` ${notification.last_name.trim()}`;
            temp = temp.trim(); // in case only the last name is present so there's an extra space
            if (!temp) temp = 'Someone';
            setName(temp);
        }

        if (notification.product_info && notification.product_info.images) {
            fetch(notification.product_info.images)
                .then(res => res.json())
                .then(json => {
                    setImage(json.img_1);
                })
                .catch(err => console.log('err 1'));
        }
    }, [name, notification]);

    const redirectToFeedbackForm = () => {
        updater([{ id: notification.id, notified_user: true, type: 'request' }]);
        window.open(notification.feedback_form_link, '_blank');
    };

    return (
        <Grid
            style={{
                backgroundColor: notification.seen ? '#f8f8f8' : '#ffffff',
                borderRadius: 8,
                margin: '5px 0',
                padding: 10
            }}
            alignItems="center"
            container
            item
        >
            <Grid item>
                {
                    notification.profile_image || name ?
                        <img
                            style={{ height: 60, width: 60, paddingRight: 10 }}
                            src={notification.profile_image ?? `https://ui-avatars.com/api/?background=bdbcbb&color=fff&rounded=true&name=${name}&size=64`}
                            alt="Profile"
                        />
                        :
                        <AccountCircle style={{ height: 60, width: 60 }} />
                }
            </Grid>
            <Grid style={{ width: 250 }} item>
                <span>
                    <span style={{ fontWeight: 'bold' }}>{name}</span>
                    &nbsp;{notification.notif_type === 'Request' ? 'wants your feedback on' : 'sent you feedback on'}
                    &nbsp;
                    <span style={{ fontWeight: 'bold' }}>
                        <TextOverflow
                            text={notification.product_info.name ? notification.product_info.name.split(',')[0] : 'Something'}
                            overflowLength={30}
                        />
                        {/*{notification.product_info.name ? notification.product_info.name.split(',')[0] : 'Something'}*/}
                    </span>
                </span>
            </Grid>
            <Grid style={{ marginLeft: 15, marginRight: 0 }} item>
                {
                    image === 'None' || !image ?
                        <Photo style={{ height: 80, width: 80, borderRadius: 8 }} />
                        :
                        notification.seen?
                        <img style={{ height: 80, width: 80, objectFit: 'contain', background: '#f8f8f8', borderRadius: 8 }} src={image} alt="product" id="image" />
                        :
                        <img style={{ height: 80, width: 80, objectFit: 'contain', background: '#fff', borderRadius: 8 }} src={image} alt="product" id="image" />
                        
                    }
            </Grid>
            <div style={{ position: 'absolute', background: '#f8f8f8', border: 'red' }} />
        </Grid>
    );
}

export default Notification;
