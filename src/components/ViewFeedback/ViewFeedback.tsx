import React, { useEffect, useState } from 'react';
import { Divider, Grid, IconButton } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import APIURL from '../../assets/URL';
import { AiOutlineFrown, AiOutlineSmile } from 'react-icons/ai';

export interface IViewFeedbackProps {
    notification: INotification,
    image: string,
    setPage: React.Dispatch<React.SetStateAction<string>>
}

function ViewFeedback({ notification, image, setPage }: IViewFeedbackProps): JSX.Element {
    const [feedbacks, setFeedbacks] = useState<Array<IFeedback>>([]);

    const fetchProduct = () => {
        const rexUID = localStorage.getItem('rexUID');
        fetch(`${APIURL}/api/feedback-for-product?uid=${rexUID}&product_id=${notification.product_info.id}`)
            .then(res => res.json())
            .then(json => {
                setFeedbacks(json.feedbacks);
            })
            .catch(console.error);
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const goBack = () => {
        setPage('notifications');
    };

    return (
        <Grid direction="column" container>
            <IconButton onClick={goBack} style={{ position: 'absolute', height: 45, width: 45 }}>
                <ArrowBackIos style={{ marginLeft: 10 }} />
            </IconButton>
            <Grid style={{ height: 45 }} justify="center" alignItems="center" container item>
                <span style={{ fontWeight: 700 }}>
                    View Feedback
                </span>
            </Grid>
            <Grid style={{ width: "100%", height: 175, marginTop: 15 }} justify="center" container item>
                <div style={{ height: "95%", width: '50%', margin: 'auto', justifyContent: 'center' }}>
                    <img
                        src={image}
                        alt="product img"
                        style={{ height: 'auto', width: '100%', display: 'flex', margin: 'auto 0px' }}
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
            <Grid style={{ margin: '10px 0 10px -15px', width: 'calc(100% + 30px)' }} item>
                <Divider />
            </Grid>
            {
                feedbacks.map((f, i) => (
                    <Grid style={{ padding: 15 }} key={i} alignItems="center" justify="space-between" container item>
                        <Grid style={{ width: 'unset' }} alignItems="flex-start" justify="center" direction="column" container item>
                            <Grid style={{ width: 'unset' }} alignItems="center" container item>
                                <img alt="Profile" src={f.profile_image} style={{ width: 45, height: 45 }} />
                                <span style={{ fontWeight: 'bold', marginLeft: 10 }}>
                                    {f.first_name + " " + f.last_name}
                                </span>
                            </Grid>
                            <span style={{ marginTop: 15, maxWidth: 275 }}>{f.feedback_text}</span>
                        </Grid>
                        {
                            f.thumbs_up ? (
                                <IconButton
                                    className=""
                                    style={{ color: "#37DB69", width: "70px", height: "70px" }}
                                    disabled
                                >
                                    <AiOutlineSmile style={{ width: "100%", height: "100%" }} />
                                </IconButton>
                            ) : (
                                <IconButton
                                    className=""
                                    style={{ color: "#FD6C73", width: "70px", height: "70px" }}
                                    disabled
                                >
                                    <AiOutlineFrown style={{ width: "100%", height: "100%" }} />
                                </IconButton>
                            )
                        }
                    </Grid>
                ))
            }
        </Grid>
    );
}

export default ViewFeedback;
