import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Divider, Grid, IconButton, Popover } from '@material-ui/core';
import { Delete, Edit, FileCopy, MoreHoriz } from '@material-ui/icons';
import './ClosetPreview.scss';

function ClosetPreview({ closet }) {
    const history = useHistory();
    const [showPopup, setShowPopup] = useState(false);

    const handleClosetView = edit => {
        history.push({ pathname: `/closets/${closet.id}`, state: { edit } });
    };

    const closetId = `closet-${closet.id}`;
    const closetElement = document.getElementById(closetId);
    let position;
    if (closetElement) {
        const clientRect = closetElement.getBoundingClientRect();
        const rightHasSpace = clientRect.right + 200 < window.innerWidth;
        const left = rightHasSpace ? clientRect.right : clientRect.left - 185;
        position = { top: clientRect.bottom, left };
    }

    return (
        <>
            <motion.div
                id={closetId}
                className="closet"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    type: 'tween',
                    delay: 0.3
                }}
                onClick={handleClosetView}
            >
                {
                    closet.closet_icon ?
                        <img
                            src={closet.closet_icon}
                            style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '10px' }}
                            id="closet-icon" alt="closet-icon"
                        />
                        :
                        <div id="stock-closet-image" style={{ backgroundColor: `#${closet.color}` }}>
                            <span id="name">{closet.closet_name}</span>
                            <IconButton
                                id="options-button"
                                onClick={e => {
                                    e.stopPropagation();
                                    setShowPopup(true);
                                }}
                            >
                                <MoreHoriz
                                    fontSize="large" style={{ color: 'white', width: '30px', height: '30px' }}
                                />
                            </IconButton>
                        </div>
                }
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
    );
}

export default ClosetPreview;
