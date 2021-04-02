import React, {useEffect, useState} from 'react';
import URL from '../../assets/URL'
import './AllClosets.scss'
import ClosetPreview from './ClosetPreview'
import {motion} from 'framer-motion'


function AllClosets () {
    let rexUID = localStorage.getItem("rexUID")
    const [closetData, closetDataSet] = useState(undefined)
    useEffect(() => {
        

        fetch(URL + "/api/closet_preview?uid=" + rexUID)
        .then(
            res => res.json()
        ).then(
            json => {
            // console.log("allcloset render", json)
            // console.log(json.closet_preview)
            var updatedData = [];
            var i;
            for (i = 0; i < json.closet_preview.length; i++) {
                // console.log(json.closet_preview[i].closet_name)
                if (json.closet_preview[i].closet_name !== "Saved Products") {
                    updatedData[i] = json.closet_preview[i]
                }
            }
            closetDataSet(updatedData)}
        )

        return () => {
            
        }
    }, [rexUID])

        return(
            <motion.div id='AllClosetsPage'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{   opacity: 0 }}
            >
                <div id="title">All Closets</div>
                { 
                
                closetData &&
                <div id="closet-container">
                {  closetData.map((closet, i ) => 
                            <ClosetPreview closet={closet} key={i}/>
                  )
                }
                </div>
                }
            </motion.div>
        )
}

export default AllClosets