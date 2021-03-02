import React from 'react'
import './Closet.scss'
import {useParams} from 'react-router-dom'
import {motion, AnimatePresence} from 'framer-motion'
import ClosetItem from './ClosetItem'
let data = {
    id: 20,
    username: "Gigi_Hadid",
    name: "Yoga Gear",
    color: "#1F7C9D",
    item_count: 4,
    publish_time: 1614266044395,
    closet_png: "https://extension-static-image-hosting-rexfriends.s3.amazonaws.com/HardCodeData/Gigi.png",
    products: [
        {
            id: 30,
            url: "https://m.media-amazon.com/images/I/91QvbQrZ4eL._AC_UL320_.jpg",
            closet: [20, 21]
        },
        {
            id: 31,
            url: "https://m.media-amazon.com/images/I/81Sv3Z2suBL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 32,
            url: "https://m.media-amazon.com/images/I/81eBUIBfJpL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 33,
            url: "https://m.media-amazon.com/images/I/91YHIgoKb4L._AC_UL320_.jpg"
            ,closet: []
        },
        {
            id: 34,
            url: "https://m.media-amazon.com/images/I/A1T0ERFxCkL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 35,
            url: "https://m.media-amazon.com/images/I/810hQ8n009L._AC_UL320_.jpg"
            ,closet: [20, 21]
        }]
}

function Closet(){
    // use the id to fetch the closet data
    let {id} = useParams()
    return(
        <motion.div id="ClosetPage"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{   opacity: 0 }}
        >
           <motion.div id="closet-header" style={{backgroundColor: data.color}}
                 initial={{ x:200, opacity: 0 }}
                 animate={{ x:0, opacity: 1 }}
                 transition={{duration: 0.3}}
           >
                <img src={data.closet_png} id="img" alt="closet"/>
                <div id="text">
                    <div id="user">{data.username.replace("_", " ")}'s</div>
                    <div id="name">{data.name}</div>
                </div>
           </motion.div>
           <div id="item-container">
            
                {
                    data.products.map(
                        (product, i) => 
                        <ClosetItem item={product} key={i}/>
                    )                
                }
       
           </div>
        </motion.div>
    )
}

export default Closet