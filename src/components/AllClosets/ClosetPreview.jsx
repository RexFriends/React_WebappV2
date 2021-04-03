import React from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ClosetPreview.scss';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';

function ClosetPreview({ closet }) {
    const history = useHistory();

    const handleClosetView = () => {
        history.push(`/closets/${closet.id}`);
    };

    return (
        <motion.div
            id="closet"
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
                        <IconButton id="options-button">
                            <MoreHorizIcon fontSize="large" style={{ color: 'white', width: '30px', height: '30px' }}/>
                        </IconButton>
                    </div>
            }
        </motion.div>
    );
}

export default ClosetPreview;
