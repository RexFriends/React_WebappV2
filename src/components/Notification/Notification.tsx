import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { AccountCircle, Photo } from '@material-ui/icons';
import TextOverflow from '../TextOverflow/TextOverflow';

export interface INotificationProps {
    notification: INotification,
    updater: (toUpdate: Array<NotificationUpdate>) => void,
    openNotification: (notification: INotification, image: string) => void
}

function Notification({ notification, updater, openNotification }: INotificationProps): JSX.Element {
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
                backgroundColor: '#ffffff',
                borderRadius: 8,
                margin: '5px 0',
                padding: 10,
                cursor: 'pointer'
            }}
            onClick={() => openNotification(notification, image)}
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
            <Grid style={{ width: 230 }} item>
                <span>
                    {
                        notification.seen ?
                        <span>
                            <span style={{ fontWeight: 'bold', color: '#737373'}}>{name}</span>
                            <span style={{color: '#737373'}}>
                            &nbsp;{notification.notif_type === 'Request' ? 'wants your feedback on' : 'sent you feedback on'}
                            &nbsp;
                            </span>

                            <span style={{ fontWeight: 'bold', color: '#737373' }}>
                                <TextOverflow
                                    text={notification.product_info.name ? notification.product_info.name.split(',')[0] : 'Something'}
                                    overflowLength={30}
                                />
                            </span>
                        </span>
                        :
                        <span>
                            <span style={{ fontWeight: 'bold' }}>{name}</span>
                        &nbsp;{notification.notif_type === 'Request' ? 'wants your feedback on' : 'sent you feedback on'}
                        &nbsp;
                        <span style={{ fontWeight: 'bold' }}>
                            <TextOverflow
                                text={notification.product_info.name ? notification.product_info.name.split(',')[0] : 'Something'}
                                overflowLength={30}
                            />
                        </span>
                    </span>
                    }

                </span>
                <br/>
                {
                    notification.seen ?
                    <span style={{fontSize: '14px', color: '#737373'}}>{notification.time}</span>
                    :
                    <span style={{fontSize: '14px', fontWeight: 'bold', color: '#14c4b2'}}>{notification.time}</span>
                }

            </Grid>
            <Grid style={{ marginLeft: 15, marginRight: 0 }} item>
                {
                    image === 'None' || !image ?
                        <Photo style={{ height: 80, width: 80, borderRadius: 8 }} />
                        :
                        <img style={{ height: 80, width: 80, objectFit: 'contain', background: '#fff', borderRadius: 8 }} src={image} alt="product" id="image" />
                }
            </Grid>
            {
                notification.seen ?
                <div> </div>
                :
                <div style={{width: '10px', height: '10px', backgroundColor: '#14c4b2', margin: 'auto auto auto 15px', borderRadius: '100px'}}/>
            }


            <div style={{ position: 'absolute', background: '#f8f8f8', border: 'red' }} />
        </Grid>
    );
}

export default Notification;
