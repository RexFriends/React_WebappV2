import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Carousel from '@brainhubeu/react-carousel';
import { AiOutlineFrown, AiOutlineSmile } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import '@brainhubeu/react-carousel/lib/style.css';
import './Feedback.scss';
import { AnimatePresence, motion } from 'framer-motion';
import Asset from '../../assets/img/Asset 1.png';
import APIURL from '../../assets/URL';

function Feedback() {
    const { id } = useParams();
    const [formData, formDataSet] = useState(undefined);
    const [images, imagesSet] = useState([]);
    const [additionalFeedback, additionalFeedbackSet] = useState('');
    const [thumbs, thumbsSet] = useState(undefined);
    const [completePage, completePageSet] = useState(false);
    const [errorMessage, errorMessageSet] = useState(undefined);
    const [uid, uidSet] = useState(undefined);
    const [tempFirstName, tempFirstNameSet] = useState('');
    const [tempLastName, tempLastNameSet] = useState('');

    const [completePageContent, completePageContentSet] = useState(undefined);
    useEffect(() => {
        async function getFeedbackForm() {
            let rexUID = localStorage.getItem('rexUID');
            uidSet(rexUID);
            const response = await fetch(APIURL + `/feedback?uid=${rexUID ? rexUID : ''}&rex_feedback_link=${id}`);
            const FeedbackData = await response.json();
            return FeedbackData;
        }

        getFeedbackForm()
            .then((FeedbackData) => {
                if (FeedbackData.success === false) {
                    completePageSet(true);
                    completePageContentSet(FeedbackData.reason);
                    return;
                }

                formDataSet(FeedbackData);
                let screenshot = FeedbackData.screenshot;
                let tempImages = [];
                if (FeedbackData.images !== null) {
                    fetch(FeedbackData.images)
                        .then(res => res.json())
                        .then(json => {
                            tempImages = Object.values(json);
                            fetch(screenshot)
                                .then((res) => res.json())
                                .then((json) => {
                                    tempImages.push(json.uri);
                                    console.log(
                                        '🚀 ~ file: Feedback.jsx ~ line 52 ~ getFeedbackForm ~ tempImages',
                                        tempImages
                                    );
                                    imagesSet(tempImages);
                                });
                        });
                } else {
                    fetch(screenshot)
                        .then((res) => res.json())
                        .then((json) => {
                            tempImages.push(json.uri);
                            imagesSet(tempImages);
                        });
                }
            });

        return () => {
        };
    }, [id]);

    const handleSendFeedback = () => {
        if (thumbs === undefined) {
            errorMessageSet('Give a rating!');
            setTimeout(() => errorMessageSet(undefined), 2000);
        } else if (uid === null && tempFirstName === '') {
            errorMessageSet('Add a Name!');
            setTimeout(() => errorMessageSet(undefined), 2000);
        } else {
            let payload = {
                additionalFeedback: additionalFeedback,
                review: thumbs,
                feedback_row_id: formData.feedback_row_id
            };
            if (uid === null) {
                payload.name = tempFirstName.concat(' ', tempLastName);
            }
            fetch(
                APIURL + `/feedback?uid=${uid ? uid : 'null'}&rex_feedback_link=${id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                }
            )
                .then((res) => res.json())
                .then((json) => {
                    console.log('response after send', json);
                    if (json.success === true) {
                        completePageSet(true);
                        return;
                    }
                    if (json.success === false) {
                        completePageSet(true);
                        completePageContentSet(json.reason);
                    }
                })
                .catch((err) => console.log('err response after send:', err));
        }
    };

    return (
        <div id="feedback_page">
            <AnimatePresence>
                {
                    completePage ? (
                        <motion.div
                            id="complete"
                            initial={{ opacity: 0, x: 0 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 1 }}
                        >
                            <img src={Asset} alt="logo" id="logo" />
                            {
                                completePageContent ?
                                    <div id="text-small">{completePageContent}</div>
                                    :
                                    <div id="text">Sent!</div>
                            }
                            {
                                uid === null ? (
                                    <a id="link" href="/login">
                                        Sign up!
                                    </a>
                                ) : (
                                    <a id="link" href="/">
                                        Return to Dashboard
                                    </a>
                                )
                            }
                        </motion.div>
                    ) : formData && formData.url ? (
                        <motion.div
                            id="content"
                            initial={{ opacity: 0, x: 100 }}
                            transition={{ delay: 1 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                        >
                            <img src={Asset} alt="logo" id="logo" />
                            <div id="carousel">
                                <div id="sub-carousel">
                                    <Carousel arrows dots>
                                        {
                                            images &&
                                            images.map((imgURL, i) => (
                                                <img key={i} src={imgURL} id="img" alt="screenshot"/>
                                            ))
                                        }
                                    </Carousel>
                                </div>
                            </div>
                            <div id="text">
                                <div id="user">
                                    <div id="name">
                                        {formData.user_first_name} {formData.user_last_name}
                                    </div>
                                    <a
                                        href={formData.url}
                                        target="_blank"
                                        id="link"
                                        rel="noreferrer"
                                    >
                                        &nbsp;View Product&nbsp;
                                    </a>
                                </div>
                                <div id="form">
                                    {
                                        uid === null &&
                                        <div id="tempName">
                                            <TextField
                                                label="First Name"
                                                autoComplete="off"
                                                value={tempFirstName}
                                                onChange={(e) => tempFirstNameSet(e.target.value)}
                                            />
                                            <TextField
                                                label="Last Name"
                                                autoComplete="off"
                                                value={tempLastName}
                                                onChange={(e) => tempLastNameSet(e.target.value)}
                                            />
                                        </div>
                                    }

                                    <div id="submit_box">
                                        <div id="thumbs">
                                            <IconButton
                                                id="button"
                                                className={thumbs === true ? 'highlight1' : ''}
                                                style={{ color: '#37DB69' }}
                                                onClick={() => thumbsSet(true)}
                                            >
                                                <AiOutlineSmile id="icon"/>
                                            </IconButton>
                                            <IconButton
                                                id="button"
                                                className={thumbs === false ? 'highlight2' : ''}
                                                style={{ color: '#FD6C73' }}
                                                onClick={() => thumbsSet(false)}
                                            >
                                                <AiOutlineFrown id="icon"/>
                                            </IconButton>
                                            <Button
                                                onClick={handleSendFeedback}
                                                id="submit"
                                                endIcon={<FiSend/>}
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </div>
                                    <div id="feedback_text">
                                        <TextField
                                            multiline
                                            id="text_field"
                                            label="thoughts???"
                                            autoComplete="off"
                                            value={additionalFeedback}
                                            onChange={(e) => additionalFeedbackSet(e.target.value)}
                                        />
                                    </div>
                                    <AnimatePresence>
                                        {
                                            errorMessage &&
                                            <motion.div
                                                id="error"
                                                initial={{ y: 300, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: 300, opacity: 0 }}
                                            >
                                                {errorMessage}
                                            </motion.div>
                                        }
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div id="loading screen" />
                    )
                }
            </AnimatePresence>
        </div>
    );
}

export default Feedback;
