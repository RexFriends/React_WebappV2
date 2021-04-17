import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, IconButton, TextField } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import { AiOutlineFrown, AiOutlineSmile } from 'react-icons/ai';
import './SendFeedback.scss';
import AppContext from '../AppContext/AppContext';

export interface ISendFeedbackProps {
    notificationId: number,
    image: string,
    setPage: React.Dispatch<React.SetStateAction<string>>,
    handleSendFeedback: (notification: INotification, thumbs: boolean | undefined, additionalFeedback: string) => void
}

function SendFeedback({ notificationId, image, setPage, handleSendFeedback }: ISendFeedbackProps): JSX.Element {
    const [thumbs, setThumbs] = useState<boolean | undefined>(undefined);
    const [additionalFeedback, setAdditionalFeedback] = useState<string>('');
    const appContext = useContext<IAppContext>(AppContext);
    const notification = appContext.notifications.find(n => n.id === notificationId)!;
    console.log(notification);

    const goBack = () => {
        setThumbs(undefined);
        setAdditionalFeedback('');
        setPage('notifications');
    };

    return (
        <Grid direction="column" container>
            <IconButton onClick={goBack} style={{ position: 'absolute', height: 45, width: 45, top: 15, left: 15 }}>
                <ArrowBackIos style={{ marginLeft: 10 }} />
            </IconButton>
            <Grid style={{ height: 45, marginTop: 15 }} justify="center" alignItems="center" container item>
                <span style={{ fontWeight: 700 }}>
                    Send Feedback
                </span>
            </Grid>
            {
                notification ? (
                    <>
                        <Grid style={{ margin: '30px auto', width: '80%' }} container item>
                            <img alt="Profile" src={notification.profile_image} style={{ width: 45, height: 45 }} />
                            <Grid
                                style={{ width: 'unset', marginLeft: 10 }}
                                justify="space-around"
                                direction="column"
                                container
                                item
                            >
                                <span style={{ fontWeight: 'bold' }}>
                                    {notification.first_name + " " + notification.last_name}
                                </span>
                                <span style={{ fontSize: "12px" }}>
                                    @{notification.username}
                                </span>
                            </Grid>
                        </Grid>
                        <Grid style={{ width: "100%", height: 220 }} justify="center" container item>
                            <div style={{ height: "95%", width: '50%' }}>
                                <img
                                    src={image}
                                    alt="product img"
                                    style={{ height: '100%', width: 'auto', maxWidth: '100%', display: 'block', margin: 'auto' }}
                                />
                            </div>
                            <Grid
                                style={{ width: "40%" }}
                                justify="space-evenly"
                                direction="column"
                                container
                                item
                            >
                                <Grid direction="column" container item>
                                    <span style={{ fontWeight: 'bold', marginBottom: 5 }}>{notification.product_info.brand}</span>
                                    <span>{notification.product_info.name}</span>
                                </Grid>
                                <span>{notification.product_info.price}</span>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <div>Loading</div>
                )
            }
            <Grid
                style={{ width: "100%", margin: "0 auto auto auto" }}
                direction="column"
                container
                item
            >
                <div style={{ margin: "10px 0", width: 'calc(100%-60px)', display: 'flex', flexDirection: 'column' }}>
                    {
                        notification.did_reply ? (
                                <>
                                    <span style={{marginBottom: '10px', marginLeft: '55px', fontWeight: 'bold'}}>Feedback Sent!</span>
                                    { notification.thumbs_up ?
                                    <IconButton
                                        className="highlight1"
                                        style={{ color: "#37DB69", width: "70px", height: "70px", margin: 'auto' }}
                                        disabled
                                    >
                                        <AiOutlineSmile style={{ width: "60px", height: "60px" }} />
                                    </IconButton>
                                    :
                                    <IconButton
                                        className="highlight2"
                                        style={{ color: "#FD6C73", width: "70px", height: "70px", margin: 'auto' }}
                                        disabled
                                    >
                                        <AiOutlineFrown style={{ width: "60px", height: "60px" }} />
                                    </IconButton>
                                    }
                                    <span>{notification.additional_info}</span>
                                </>
                        ) : (
                            <>
                                <IconButton
                                    className={thumbs === false ? "highlight2" : ""}
                                    style={{ color: "#FD6C73", width: "70px", height: "70px" }}
                                    onClick={() => setThumbs(false)}
                                >
                                    <AiOutlineFrown style={{ width: "100%", height: "100%" }} />
                                </IconButton>
                                <IconButton
                                    className={thumbs === true ? "highlight1" : ""}
                                    style={{ color: "#37DB69", width: "70px", height: "70px" }}
                                    onClick={() => setThumbs(true)}
                                >
                                    <AiOutlineSmile style={{ width: "100%", height: "100%" }} />
                                </IconButton>
                            </>
                        )
                    }
                </div>
                {
                    !notification.did_reply && (
                        <>
                            <span style={{ margin: '0 auto', width: '80%' }}>
                                <span style={{ fontWeight: 'bold' }}>Feedback</span>
                                &nbsp;(optional)
                            </span>
                            <TextField
                                InputProps={{
                                    style: {
                                        width: "80%",
                                        minHeight: 100,
                                        margin: "10px auto auto auto",
                                        borderRadius: 5,
                                        border: '1px solid rgba(255, 255, 255, 0.4)',
                                        textAlign: "right"
                                    }
                                }}
                                variant="outlined"
                                autoComplete="off"
                                value={additionalFeedback}
                                onChange={(e) => setAdditionalFeedback(e.target.value)}
                                multiline
                            />
                            <Button
                                onClick={() => handleSendFeedback(notification, thumbs, additionalFeedback)}
                                id="submit"
                                style={{
                                    width: "80px",
                                    height: "40px",
                                    margin: "10px auto auto auto",
                                    backgroundColor: "#14c4b2",
                                    color: "white",
                                    borderRadius: "100px",
                                    fontWeight: 700,
                                    fontSize: "16px",
                                }}
                            >
                                Send
                            </Button>
                        </>
                    )
                }
            </Grid>
        </Grid>
    );
}

export default SendFeedback;
