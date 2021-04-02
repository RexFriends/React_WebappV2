import React, {useState, useEffect} from 'react';
import { useHistory }from "react-router-dom"
import {motion, AnimatePresence} from 'framer-motion'
import './ClosetPreview.scss';
import { Button, Divider, Grid, Popover } from '@material-ui/core';
import { AddToPhotos, Delete, Edit, FileCopy, MoreHoriz, Send } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import URL from '../../assets/URL';

function ClosetPreview({closet}){

    let history = useHistory()
    const [imageData, imageDataSet] = useState([])
    const [hover, hoverSet] = useState(false);
    const [change, changeSet] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // console.log("Render", closet.id)
        
        async function fetchImages(){
            let temp = []
            closet.items.slice(0, 4).forEach(
                item => {
                    if(item.images !== null){
                        fetch(item.images).then(
                            res => res.json()
                        ).then(json => {
                            temp.push(json.img_1);
                        })
                    }else{
                        fetch(item.img).then(
                            res => res.json()
                        ).then(json => 
                            temp.push(json.uri)
                        )
                    }
                   
                }
            )
            return temp
        }
        fetchImages().then(temp => {
            imageDataSet(temp)
            // !check if needed
            // history.push("/closets")
        }
        )
        
        return () => {
        }
    }, [closet, history])

    setTimeout(()=> changeSet(!change), 50)

    const handleClosetView = edit => {
        history.push({ pathname: `/closets/${closet.id}`, state: { edit } });
    };

    const copyFallback = link => {
        const inp = document.createElement('input');
        document.body.appendChild(inp);
        inp.value = link;
        inp.select();
        document.execCommand('copy', false);
        inp.remove();
    };

    const handleGetCopyLink = () => {
        const rexUID = localStorage.getItem("rexUID");
        const payload = { listing_id: closet.id};
        fetch(URL + '/api/copy_feedback_link?uid=' + rexUID, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((res) => res.text())
            .then((link) => {
                // console.log(link)
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(link)
                        .catch(err => {
                            console.error(err);
                            copyFallback(link);
                        })
                } else copyFallback(link);
            });
    }
    
    const closetId = `closet-${closet.id}`;
    const closetElement = document.getElementById(closetId);
    let position;
    if (closetElement) {
        const clientRect = closetElement.getBoundingClientRect();
        const rightHasSpace = clientRect.right + 200 < window.innerWidth;
        const left = rightHasSpace ? clientRect.right : clientRect.left - 185;
        position = { top: clientRect.bottom, left };
    }

    return(
        <>
            <motion.div
                id={closetId}
                className="closet"
                onMouseEnter={() => hoverSet(true)}
                onMouseLeave={() => hoverSet(false)}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    type: "tween",
                    delay: 0.3
                }}
                onClick={() => handleClosetView(false)}
            >   
                {
                    // closet.closet_icon !== "FaSave" ?
                    closet.closet_icon ?
                    <img src={closet.closet_icon} id="closet-icon" alt="closet-icon" />
        
        
                    :
                    imageData.map(
                        (img, i) => 
                        <img src={img} id="img" key={i}  alt={i} />
                    )
                    // :
                    // imageData.map(
                    //     (img, i) => 
                        
        
                }
                <div style={{ position: 'absolute', bottom: 15, right: 15, width: '100%' }}>
                    <IconButton
                        style={{ zIndex: 1000, padding: 'unset', float: 'right' }}
                        onClick={e => {
                            e.stopPropagation();
                            setShowPopup(true);
                        }}>
                        <MoreHoriz />
                    </IconButton>
                </div>
                <AnimatePresence>
                            {
                                hover &&
                                <motion.div id="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    {/* <div id="top">
                                        <IconButton onClick={handleShowInfo} id="info">
                                            <SendIcon fontSize="large" style={{color: "14c4b2", width: "30px", height: "30px"}}/>
                                        </IconButton>
                                    </div> */}
                                </motion.div>
                            }
                        </AnimatePresence>
                
                <div id="closet-name">{closet.closet_name}</div>
            </motion.div>
            <Popover
                anchorEl={document.getElementById(closetId)}
                anchorReference="anchorPosition"
                anchorPosition={position}
                PaperProps={{ style: { padding: 15, borderRadius: 15 } }}
                open={showPopup}
                onClose={() => setShowPopup(false)}
            >
                <Grid direction="column" container>
                    <Grid item>
                        <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '15px' }}>Options</span>
                    </Grid>
                    <Grid style={{ margin: '10px 0 10px -15px', width: 'calc(100% + 30px)' }} item>
                        <Divider />
                    </Grid>
                    <Grid item>
                        <Button
                            className="round-button"
                            onClick={() => handleClosetView(true)}
                            startIcon={<Edit />}
                        >
                            Edit Closet
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button className="round-button" startIcon={<FileCopy />}>Copy Link</Button>
                    </Grid>
                    <Grid item>
                        <Button className="round-button" startIcon={<Delete />}>Remove Closet</Button>
                    </Grid>
                </Grid>
            </Popover>
        </>
    )
}

export default ClosetPreview
