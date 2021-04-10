import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconButton } from '@material-ui/core';
import {  Edit, FileCopy, MoreHoriz } from '@material-ui/icons';
import APIURL from '../../assets/URL';
import { copyFallback } from '../../util';
import { showAlert } from '../Alerts/Alerts';

function ClosetPreview({ closet, updateClosets }) {
    const history = useHistory();
    const [showPopup, setShowPopup] = useState(false);

    const handleClosetView = edit => {
        history.push({ pathname: `/closets/${closet.id}`, state: { edit } });
    };

    const handleGetCopyLink = () => {
        const link = `${APIURL}/closets/${closet.id}`;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(link)
                .then(() => {
                    showAlert('Copied link!', 'success');
                })
                .catch(err => {
                    console.error(err);
                    copyFallback(link);
                });
        } else copyFallback(link);
    }

    const handleDelete = () => {
        const rexUID = localStorage.getItem('rexUID');
        fetch(`${APIURL}/api/closet?uid=${rexUID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                closet_id: closet.id
            })
        })
            .then(res => res.json())
            .then(() => {
                showAlert('Removed closet!', 'success');
                updateClosets();
                setShowPopup(false);
            })
            .catch(err => {
                console.error(err);
                showAlert('Removing closet failed!', 'error');
            });
    };

    const closetId = `closet-${closet.id}`;

    return (
        <>
            <motion.div
                className="closet"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    type: 'tween',
                    delay: 0.3
                }}
                onClick={() => handleClosetView(false)}
            >
                {
                    closet.closet_icon ?
                        <img
                            src={closet.closet_image}
                            style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '10px' }}
                            id="closet-icon" alt="closet-icon"
                        />
                        :
                        <div id="stock-closet-image" style={{ backgroundColor: `#${closet.background_color}` }}>
                            <span id="name">{closet.closet_name}</span>
                        </div>
                }
            </motion.div>
        </>
    );
}

export default ClosetPreview;
