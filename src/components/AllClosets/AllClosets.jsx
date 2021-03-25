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
            closetDataSet(json.closet_preview)}
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
                {  closetData.slice(0, 5).map((closet, i ) => 
                            <ClosetPreview closet={closet} key={i}/>
                  )
                }
                </div>
                }
            </motion.div>
        )
}

export default AllClosets