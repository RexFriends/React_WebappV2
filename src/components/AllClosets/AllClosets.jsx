import React, { useEffect, useState } from 'react';
import APIURL from '../../assets/URL';
import './AllClosets.scss';
import ClosetPreview from './ClosetPreview';
import { motion } from 'framer-motion';


function AllClosets() {
    const rexUID = localStorage.getItem('rexUID');
    const [closetData, closetDataSet] = useState(undefined);
    useEffect(() => {
        fetch(`${APIURL}/api/closet_preview?uid=${rexUID}`)
            .then(res => res.json())
            .then(json => {
                const updatedData = json.closet_preview.filter(c => c.closet_name !== 'Saved Products');
                closetDataSet(updatedData);
            }
        );
    }, [rexUID]);

    return (
        <motion.div id='AllClosetsPage'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div id="title">All Closets</div>
            {
                closetData &&
                <div id="closet-container">
                    {closetData.map((closet, i) => <ClosetPreview closet={closet} key={i}/>)}
                </div>
            }
        </motion.div>
    );
}

export default AllClosets;
