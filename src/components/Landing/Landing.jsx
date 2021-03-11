import React, {useState} from 'react'
import './Landing.scss'
import IconButton from '@material-ui/core/IconButton'
import {BsCaretLeft, BsCaretRight} from 'react-icons/bs'
import { useHistory } from "react-router-dom";
import SingleClosetFeed from '../ReusableContainer/SingleClosetFeed'
import {motion} from 'framer-motion'
let data = {
    
    PopularClosets: [
        {
            id: 20,
            username: "Gigi_Hadid",
            name: "Yoga Gear",
            color: "#1F7C9D",
            item_count: 4,
            publish_time: 1614266044395,
            closet_png: "https://extension-static-image-hosting-rexfriends.s3.amazonaws.com/HardCodeData/Gigi.png"
        },
        {
            id: 21,
            username: "Kylie_Jenner",
            name: "Party Essentials",
            color: "#1EC4B2",
            item_count: 12,
            publish_time: 1614266044395,
            closet_png: "https://extension-static-image-hosting-rexfriends.s3.amazonaws.com/HardCodeData/Kylie.png"
        },
        {
            id: 22,
            username: "Kanye_West",
            name: "Affordable Sweaters",
            color: "#FECC77",
            item_count: 4,
            publish_time: 1614266044395,
            closet_png: "https://extension-static-image-hosting-rexfriends.s3.amazonaws.com/HardCodeData/Kanye2.png"
        },
        {
            id: 23,
            username: "Rex",
            name: "Curated Favorites",
            color: "#FD6C73",
            optional_note: "Check out the favorite products this season!",
            item_count: 4,
            publish_time: 1614266044395,
            closet_png: "https://extension-static-image-hosting-rexfriends.s3.amazonaws.com/128.png"
        }
    ],
    RecommendedClosets: [
        {
            id: 24,
            user_id: 1,
            username: "Rex",
            name: "Cozy Comforts",
            products: [
                {
                    id: 30,
                    url: "https://m.media-amazon.com/images/I/91QvbQrZ4eL._AC_UL320_.jpg"
                },
                {
                    id: 31,
                    url: "https://m.media-amazon.com/images/I/81Sv3Z2suBL._AC_UL320_.jpg"
                },
                {
                    id: 32,
                    url: "https://m.media-amazon.com/images/I/81eBUIBfJpL._AC_UL320_.jpg"
                },
                {
                    id: 33,
                    url: "https://m.media-amazon.com/images/I/91YHIgoKb4L._AC_UL320_.jpg"
                },
                {
                    id: 34,
                    url: "https://m.media-amazon.com/images/I/A1T0ERFxCkL._AC_UL320_.jpg"
                },
                {
                    id: 35,
                    url: "https://m.media-amazon.com/images/I/810hQ8n009L._AC_UL320_.jpg"
                },
                {
                    id: 36,
                    url: "https://m.media-amazon.com/images/I/810sqe8XJ+L._AC_UL320_.jpg"
                },
                
            ],
        },
        {
            id: 25,
            user_id: 1,
            username: "Rex",
            name: "Cozy Comforts Part 2",
            products: [
                {
                    id: 30,
                    url: "https://m.media-amazon.com/images/I/91QvbQrZ4eL._AC_UL320_.jpg"
                },
                {
                    id: 31,
                    url: "https://m.media-amazon.com/images/I/81Sv3Z2suBL._AC_UL320_.jpg"
                },
                {
                    id: 32,
                    url: "https://m.media-amazon.com/images/I/81eBUIBfJpL._AC_UL320_.jpg"
                },
                {
                    id: 33,
                    url: "https://m.media-amazon.com/images/I/91YHIgoKb4L._AC_UL320_.jpg"
                },
                {
                    id: 34,
                    url: "https://m.media-amazon.com/images/I/A1T0ERFxCkL._AC_UL320_.jpg"
                },
                {
                    id: 35,
                    url: "https://m.media-amazon.com/images/I/810hQ8n009L._AC_UL320_.jpg"
                },
                {
                    id: 36,
                    url: "https://m.media-amazon.com/images/I/810sqe8XJ+L._AC_UL320_.jpg"
                },
                
            ],
        },
        {
            id: 24,
            user_id: 1,
            username: "Rex",
            name: "Cozy Comforts",
            products: [
                {
                    id: 30,
                    url: "https://m.media-amazon.com/images/I/91QvbQrZ4eL._AC_UL320_.jpg"
                },
                {
                    id: 31,
                    url: "https://m.media-amazon.com/images/I/81Sv3Z2suBL._AC_UL320_.jpg"
                },
                {
                    id: 32,
                    url: "https://m.media-amazon.com/images/I/81eBUIBfJpL._AC_UL320_.jpg"
                },
                {
                    id: 33,
                    url: "https://m.media-amazon.com/images/I/91YHIgoKb4L._AC_UL320_.jpg"
                },
                {
                    id: 34,
                    url: "https://m.media-amazon.com/images/I/A1T0ERFxCkL._AC_UL320_.jpg"
                },
                {
                    id: 35,
                    url: "https://m.media-amazon.com/images/I/810hQ8n009L._AC_UL320_.jpg"
                },
                {
                    id: 36,
                    url: "https://m.media-amazon.com/images/I/810sqe8XJ+L._AC_UL320_.jpg"
                },
                
            ],
        },
        {
            id: 25,
            user_id: 1,
            username: "Rex",
            name: "Cozy Comforts Part 2",
            products: [
                {
                    id: 30,
                    url: "https://m.media-amazon.com/images/I/91QvbQrZ4eL._AC_UL320_.jpg"
                },
                {
                    id: 31,
                    url: "https://m.media-amazon.com/images/I/81Sv3Z2suBL._AC_UL320_.jpg"
                },
                {
                    id: 32,
                    url: "https://m.media-amazon.com/images/I/81eBUIBfJpL._AC_UL320_.jpg"
                },
                {
                    id: 33,
                    url: "https://m.media-amazon.com/images/I/91YHIgoKb4L._AC_UL320_.jpg"
                },
                {
                    id: 34,
                    url: "https://m.media-amazon.com/images/I/A1T0ERFxCkL._AC_UL320_.jpg"
                },
                {
                    id: 35,
                    url: "https://m.media-amazon.com/images/I/810hQ8n009L._AC_UL320_.jpg"
                },
                {
                    id: 36,
                    url: "https://m.media-amazon.com/images/I/810sqe8XJ+L._AC_UL320_.jpg"
                },
                
            ],
        },
        {
            id: 24,
            user_id: 1,
            username: "Rex",
            name: "Cozy Comforts",
            products: [
                {
                    id: 30,
                    url: "https://m.media-amazon.com/images/I/91QvbQrZ4eL._AC_UL320_.jpg"
                },
                {
                    id: 31,
                    url: "https://m.media-amazon.com/images/I/81Sv3Z2suBL._AC_UL320_.jpg"
                },
                {
                    id: 32,
                    url: "https://m.media-amazon.com/images/I/81eBUIBfJpL._AC_UL320_.jpg"
                },
                {
                    id: 33,
                    url: "https://m.media-amazon.com/images/I/91YHIgoKb4L._AC_UL320_.jpg"
                },
                {
                    id: 34,
                    url: "https://m.media-amazon.com/images/I/A1T0ERFxCkL._AC_UL320_.jpg"
                },
                {
                    id: 35,
                    url: "https://m.media-amazon.com/images/I/810hQ8n009L._AC_UL320_.jpg"
                },
                {
                    id: 36,
                    url: "https://m.media-amazon.com/images/I/810sqe8XJ+L._AC_UL320_.jpg"
                },
                
            ],
        },
        {
            id: 25,
            user_id: 1,
            username: "Rex",
            name: "Cozy Comforts Part 2",
            products: [
                {
                    id: 30,
                    url: "https://m.media-amazon.com/images/I/91QvbQrZ4eL._AC_UL320_.jpg"
                },
                {
                    id: 31,
                    url: "https://m.media-amazon.com/images/I/81Sv3Z2suBL._AC_UL320_.jpg"
                },
                {
                    id: 32,
                    url: "https://m.media-amazon.com/images/I/81eBUIBfJpL._AC_UL320_.jpg"
                },
                {
                    id: 33,
                    url: "https://m.media-amazon.com/images/I/91YHIgoKb4L._AC_UL320_.jpg"
                },
                {
                    id: 34,
                    url: "https://m.media-amazon.com/images/I/A1T0ERFxCkL._AC_UL320_.jpg"
                },
                {
                    id: 35,
                    url: "https://m.media-amazon.com/images/I/810hQ8n009L._AC_UL320_.jpg"
                },
                {
                    id: 36,
                    url: "https://m.media-amazon.com/images/I/810sqe8XJ+L._AC_UL320_.jpg"
                },
                
            ],
        }
    ]

}

function Landing(){
    let history = useHistory();
    const [closetIndex, closetIndexSet] = useState(0)


    
    const handlePrev = () => {
        closetIndexSet(closetIndex - 4)
    }

    const handleNext = () => {
         // fetch more closets to add to data, if no more exist, set closetIndex to 0
        closetIndexSet(closetIndex + 4)
    }

    const handleGoToClost = (id) => {
        history.push(`/closet/${id}`)
    }

    return(

            <motion.div id="landing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{   opacity: 0 }}
            >
                <div id="title">Download Extension</div>
                <div id="title">How to use Rex</div>
                <div>How to use rex content here</div>
                <div id="title">Most Popular Collection</div>
                <div id="top">
                    <div id="prev">
                        <IconButton id="button" onClick={handlePrev} disabled={closetIndex===0}>
                            <BsCaretLeft/>
                        </IconButton>
                    </div>
                    <div id="popular-closets">
                        {
                            data.PopularClosets.slice(closetIndex, 4).map(
                                (closet, i) => 
                                <div key={i} className={`closet_${i+1} banner`} style={{backgroundColor: closet.color}} onClick={()=>handleGoToClost(closet.id)}>
                                    <div id="text">
                                        <div id="user">{closet.username.replace("_", " ")}'s</div>
                                        <div id="name">{closet.name}</div>
                                        {closet.optional_note &&
                                        <div id="optional_note">{closet.optional_note}</div>
                                        }
                                    </div>
                                    <img src={closet.closet_png} id="img" alt="closet"/>
                                </div>
                            )
                        }
                        
                    </div>
                    <div id="next">
                        <IconButton id="button" onClick={handleNext}>
                            <BsCaretRight/>
                        </IconButton>
                    </div>
                </div>
                <div id="title">Recommended Closets</div>
                <div id="recommended">
                {
                    data.RecommendedClosets.map(
                        (closet, i) => 
                            <SingleClosetFeed closet={closet} key={i} />
                        
                    )
                }
                </div>
                <div id="title">Explore</div>
            </motion.div>

    )
}

export default Landing