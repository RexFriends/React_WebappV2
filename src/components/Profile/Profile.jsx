import React, {useState} from 'react'
import './Profile.scss'
import {useParams, useHistory} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {BiArrowBack} from 'react-icons/bi'
import Button from '@material-ui/core/Button'
import {RiUserHeartFill, RiUser3Fill} from 'react-icons/ri'
import ClosetBox from './ClosetBox'


let data = {
    propic: "https://img.etimg.com/thumb/width-1200,height-900,imgsize-95316,resizemode-1,msid-81163729/markets/stocks/news/elon-musk-loses-15-billion-in-a-day-after-bitcoin-warning.jpg",
    user_id: 42069,
    followState: false,
    followers: 5347924,
    username: "ElongatedMuskrat",
    closetCount: 15, // number of closets
    following: true, // only send if user is authenticated
    closets: [
        {
            id: 37,
            name: "Yoga Gear",
            color: "#1F7C9D",
            item_count: 4,
            publish_time: 1614266044395,
        
        },
        {
            id: 38,
            name: "Lounge Wear",
            color: "#1EC4B2",
            item_count: 6,
            publish_time: 1614266044395,
            closet_png: "https://extension-static-image-hosting-rexfriends.s3.amazonaws.com/HardCodeData/elon-musk-tesla-motors-solarcity-sticker-standing-clipart-a00fc67697ba6b61ff76c89fdf0d10dd.png"
        },
        {
            id: 39,
            name: "Meme Wear",
            color: "#FECC77",
            item_count: 7,
            publish_time: 1614266044395,
            closet_png: "https://extension-static-image-hosting-rexfriends.s3.amazonaws.com/HardCodeData/elon-musk-businessperson-sticker-spacex-telegram-elon-2aa7adc8295259c3f852b76e4b8e8905.png"
        },
        {
            id: 40,
            name: "PC Build",
            color: "#FD6C73",
            item_count: 8,
            publish_time: 1614266044395,
            closet_png: "https://extension-static-image-hosting-rexfriends.s3.amazonaws.com/HardCodeData/lmj9q9qd7cn7k9ubl896jdjaak.png"
        },
        {
            id: 41,
            name: "Yummy Yummy Foods",
            color: "#1F7C9D",
            item_count: 12,
            publish_time: 1614266044395,
        }
    ],
    
}

function Profile(){
    const [following, followingSet] = useState(data.following)
    let {id} = useParams();
    const history = useHistory()
    console.log(`make a fetch to /api/profile/${id} to fill content with data`)
    
    const handleFollow = () => {
        // fetch call to change follow state
        let payload = {
            user_id: data.user_id,
            new_follow_state: !following
        }
        console.log("Change follow state to:", payload)
        followingSet(!following)
    }

    const handleBack = () => {
        history.goBack()
    }

    const handleProfileMenu = () => {
        console.log("show user menu")
    }

    const handleShowCloset = (id) => {
        history.push(`/closet/${id}`)
    }

    const handleShowClosetMenu = (id) => {
        console.log("show closet menu, id:", id)
    }

   

    return(
        <div id="profile-page">
            <div id="user-info">
                <img src={data.propic} id="propic" alt="propic" />
                <div id="username">@{data.username}</div>
                <div id="buttons">
                   
                    <IconButton id="back" onClick={handleBack}><BiArrowBack/></IconButton>
                  
                    <div id="closetcount">{data.closetCount} Closets</div>
                    <div id="profile-options">
                        <Button id="follow" className={following ? "highlight" : "none"} onClick={handleFollow} size="small" startIcon={following ? <RiUserHeartFill/> : <RiUser3Fill/>}>{following ? "Following" : "Follow"}</Button>
                        <IconButton id="menu" onClick={handleProfileMenu}><BsThreeDotsVertical/></IconButton>
                    </div>
                </div>
            </div>
            <div id="user-closets">
                {   
                    data.closets.map(
                        (closet, i) => 
                        <ClosetBox closet={closet} key={i} handleShowCloset={handleShowCloset}  handleShowClosetMenu={handleShowClosetMenu} username={data.username}/>

                        
                    )
                }
            </div>
        </div>
    )
}

export default Profile