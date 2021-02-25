import React, {useState} from 'react'
import './Landing.scss'
import IconButton from '@material-ui/core/IconButton'
import {BsCaretLeft, BsCaretRight} from 'react-icons/bs'
import { useHistory } from "react-router-dom";
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
            username: "Rex",
            name: "Cozy Comforts",
            products: [
                {
                    id: 30,
                    // url: 

                }
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
        <div id="landing">
            <div id="title">Popular Closets</div>
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
                            <div className={`closet_${i+1} banner`} style={{backgroundColor: closet.color}} onClick={()=>handleGoToClost(closet.id)}>
                                <div id="text">
                                    <div id="user">{closet.username.replace("_", " ")}'s</div>
                                    <div id="name">{closet.name}</div>
                                    {closet.optional_note &&
                                    <div id="optional_note">{closet.optional_note}</div>
                                    }
                                </div>
                                <img src={closet.closet_png} id="img"/>
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
            <h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </h2>
        </div>
    )
}

export default Landing