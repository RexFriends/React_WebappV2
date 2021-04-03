import React, { useState } from 'react';
import { motion } from 'framer-motion';
import IconButton from '@material-ui/core/IconButton';
import { BsThreeDotsVertical } from 'react-icons/bs';


function ClosetBox({ closet, handleShowCloset, username, handleShowClosetMenu }) {
    const [hover, hoverSet] = useState(false);

    return (
        <motion.div
            id="closet-banner"
            style={{ backgroundColor: closet.color }}

            onMouseEnter={() => hoverSet(true)}
            onMouseLeave={() => hoverSet(false)}
        >
            {
                closet.closet_png &&
                <img src={closet.closet_png} alt="closet_img" id="img" />
            }
            <div id="description" onClick={() => handleShowCloset(closet.id)}>
                <div id="user">{username}'s</div>
                <div id="name">{closet.name}</div>
            </div>
            <div id="fill">
                {
                    hover &&
                    <motion.div
                        id="motion"
                        initial={{ y: 70 }}
                        animate={{ y: 0 }}
                        exit={{ y: 70 }}
                    >
                        <IconButton id="menu" onClick={() => handleShowClosetMenu(closet.id)}>
                            <BsThreeDotsVertical />
                        </IconButton>
                    </motion.div>
                }
            </div>
        </motion.div>
    );
}

export default ClosetBox;
