import React, { useContext, useEffect, useState } from 'react';
import { Grid, Popover } from '@material-ui/core';
import Notification from '../Notification/Notification';
import Scrollbars from 'react-custom-scrollbars';
import APIURL from '../../assets/URL';
import { showAlert } from '../Alerts/Alerts';
import SendFeedback from '../SendFeedback/SendFeedback';
import ViewFeedback from '../ViewFeedback/ViewFeedback';
import AppContext from '../AppContext/AppContext';

export interface INotificationPopupProps {
    open: boolean,
    onClose: () => void
}

function NotificationPopup({ open, onClose }: INotificationPopupProps) {
    const [page, setPage] = useState<string>('notifications');
    const [notificationId, setNotificationId] = useState<number>();
    const [image, setImage] = useState<string>('');
    const appContext = useContext<IAppContext>(AppContext);
    const { notifications } = appContext;

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
            .then((res) => res.json())
            .then(() => {
                appContext.updateNotifications();
            })
            .catch(console.error);
    };

    useEffect(() => {
        appContext.updateNotifications();
    }, [open]);

    const handleSendFeedback = (notification: INotification, thumbs: boolean | undefined, additionalFeedback: string) => {
        if (thumbs === undefined) {
            showAlert('Add Response!', 'error');
        } else {
            const rexUID = localStorage.getItem('rexUID');
            const link = notification!.feedback_form_link!.substring(notification!.feedback_form_link!.lastIndexOf('/') + 1);
            fetch(`${APIURL}/feedback?uid=${rexUID ?? 'null'}&rex_feedback_link=${link}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        additionalFeedback: additionalFeedback,
                        review: thumbs,
                        feedback_row_id: notification!.id
                    })
                }
            )
                .then((res) => res.json())
                .then((json) => {
                    if (json.success === true) {
                        showAlert('Sent feedback!', 'success');
                        appContext.updateNotifications();
                    }
                    else showAlert('Sending feedback failed!', 'error');
                })
                .catch((err) => {
                    console.error(err);
                    showAlert('Sending feedback failed!', 'error');
                });
        }
    };

    const handleClose = () => {
        onClose();
        setPage('notifications');
    };

    const handleOpenNotification = (notification: INotification, image: string) => {
        if (!notification.seen) performUpdateCall([{
            id: notification.id,
            notified_user: true,
            type: notification.notif_type === 'Request' ? 'request' : 'completed'
        }]);

        setNotificationId(notification.id);
        setPage(notification.notif_type === 'Request' ? 'request' : 'feedback');
        setImage(image);
    };

    return (
        <Popover
            PaperProps={{
                style: {
                    height: 'calc(100vh - 100px)',
                    width: 465,
                    maxWidth: '100vw',
                    borderRadius: 15
                }
            }}
            open={open}
            onClose={handleClose}
            anchorEl={document.getElementById('notif-button')}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            {page === 'notifications' ? (
                //  <NotificationList notifications={notifications} updated={performUpdateCall}/>
                <Grid style={{ height: '100%' }} container>
                    <Scrollbars style={{ height: '100%', margin: '0px auto' }} autoHide>
                        <h3 style={{ margin: '15px auto 0px 30px', color: '#525252', fontSize: '25px' }}>
                            Notifications
                        </h3>
                        <Grid style={{ padding: '15px 10px' }} direction="column" container>
                            {notifications.map(n => (
                                <Notification
                                    key={n.id}
                                    notification={n}
                                    updater={performUpdateCall}
                                    openNotification={handleOpenNotification}
                                />
                            ))}
                        </Grid>
                    </Scrollbars>
                </Grid>
            ) : page === 'feedback' ? (
                <ViewFeedback notificationId={notificationId!} image={image} setPage={setPage} />
            ) : page === 'request' ? (
                <SendFeedback
                    notificationId={notificationId!}
                    image={image}
                    setPage={setPage}
                    handleSendFeedback={handleSendFeedback}
                />
            ) : (
                <div>Some Page</div>
            )}
        </Popover>
    );
}

export default NotificationPopup;
