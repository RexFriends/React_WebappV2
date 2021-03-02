import React, {useState, useEffect} from 'react'
import './Dashboard.scss'
import { useLocation, useHistory }from "react-router-dom"
import {IoMail} from 'react-icons/io5'
import {AiOutlineMenuUnfold, AiOutlineMenuFold} from 'react-icons/ai'
import {RiSettings3Line} from 'react-icons/ri'
import IconButton from '@material-ui/core/IconButton'
import SearchBar from "material-ui-search-bar";
import Badge from "@material-ui/core/Badge"
import { withStyles } from '@material-ui/core/styles';
import logo from '../../assets/img/Asset 1.png'
// import Button from '@material-ui/core/Button'
import Scrollbars from "react-custom-scrollbars";
// import useWindowSize from '../../Hooks/useWindowSize'
import { motion, AnimatePresence } from 'framer-motion'



const StyledBadge = withStyles((theme) => ({
    badge: {
      right: 2,
      top: 5,
      border: `0px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

const spring = {
    type: "spring",
    damping: 50,
    stiffness: 100,
    default: { duration: 0.5 },
  
}

let data = {
    username: "Wesley1479",
    user_id: "1479",
    propic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
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
        },
        {
            id: 327,
            name: "Yoga Gear",
            color: "#1F7C9D",
            item_count: 4,
            publish_time: 1614266044395,
        
        },
        {
            id: 381,
            name: "Lounge Wear",
            color: "#1EC4B2",
            item_count: 6,
            publish_time: 1614266044395,
            closet_png: "https://extension-static-image-hosting-rexfriends.s3.amazonaws.com/HardCodeData/elon-musk-tesla-motors-solarcity-sticker-standing-clipart-a00fc67697ba6b61ff76c89fdf0d10dd.png"
        },
        {
            id: 319,
            name: "Meme Wear",
            color: "#FECC77",
            item_count: 7,
            publish_time: 1614266044395,
            closet_png: "https://extension-static-image-hosting-rexfriends.s3.amazonaws.com/HardCodeData/elon-musk-businessperson-sticker-spacex-telegram-elon-2aa7adc8295259c3f852b76e4b8e8905.png"
        },
        {
            id: 401,
            name: "PC Build",
            color: "#FD6C73",
            item_count: 8,
            publish_time: 1614266044395,
            closet_png: "https://extension-static-image-hosting-rexfriends.s3.amazonaws.com/HardCodeData/lmj9q9qd7cn7k9ubl896jdjaak.png"
        },
        {
            id: 411,
            name: "Yummy Yummy Foods",
            color: "#1F7C9D",
            item_count: 12,
            publish_time: 1614266044395,
        },
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
        },
        {
            id: 327,
            name: "Yoga Gear",
            color: "#1F7C9D",
            item_count: 4,
            publish_time: 1614266044395,
        
        },
        {
            id: 381,
            name: "Lounge Wear",
            color: "#1EC4B2",
            item_count: 6,
            publish_time: 1614266044395,
            closet_png: "https://extension-static-image-hosting-rexfriends.s3.amazonaws.com/HardCodeData/elon-musk-tesla-motors-solarcity-sticker-standing-clipart-a00fc67697ba6b61ff76c89fdf0d10dd.png"
        },
        {
            id: 319,
            name: "Meme Wear",
            color: "#FECC77",
            item_count: 7,
            publish_time: 1614266044395,
            closet_png: "https://extension-static-image-hosting-rexfriends.s3.amazonaws.com/HardCodeData/elon-musk-businessperson-sticker-spacex-telegram-elon-2aa7adc8295259c3f852b76e4b8e8905.png"
        },
        {
            id: 401,
            name: "PC Build",
            color: "#FD6C73",
            item_count: 8,
            publish_time: 1614266044395,
            closet_png: "https://extension-static-image-hosting-rexfriends.s3.amazonaws.com/HardCodeData/lmj9q9qd7cn7k9ubl896jdjaak.png"
        },
        {
            id: 411,
            name: "Yummy Yummy Foods",
            color: "#1F7C9D",
            item_count: 12,
            publish_time: 1614266044395,
        }
    ],
    notification_count: 5
}




function Dashboard({children}){
    let location = useLocation()
    let history = useHistory()
    const [scrolled, scrolledSet] = useState(false)
    const [searchbar, searchbarSet] = useState("")
    const [showSidebar, showSidebarSet] = useState(true)
    const [showClosets, showClosetsSet] = useState(false)
    const [currentCloset, currentClosetSet] = useState(undefined)
    const [showNotification, showNotificationSet] = useState(false)

    useEffect(() => {
        let currentPage = location.pathname.split("/")
        if(currentPage[1] === "closet"){
            showClosetsSet(true)
            currentClosetSet(
                parseInt(currentPage[2]))
        }else if(currentPage[1] === "closets"){
            showClosetsSet(true)
        }
        else{
            showClosetsSet(false)
            currentClosetSet(undefined)
        }

        return () => {
        }
    }, [location.pathname])

 


    const handleScroll = (e) => {
        if(e.target.scrollTop > 0){
            scrolledSet(true)
        }
        if(e.target.scrollTop === 0){
            scrolledSet(false)
        }
    }

    const handleSearch = () => {
        // Make a search here
        console.log("Search term:", searchbar)
    }

    const handleHomeClick = () => {
        history.push("/")
        showClosetsSet(false)
    }

    const handleClosetClick = () => {
        currentClosetSet(undefined)
        showClosetsSet(true)
        history.push("/closets")
    }
    
    const handleSettingClick = () => {
        history.push("/setting")
    }
    const handleGotoCloset = (id) => {
        history.push(`/closet/${id}`)
    }

    return(
        <div id="dashboard">
            
            <AnimatePresence initial={false}>
            {
                showSidebar &&
                <motion.div id="sidebar"
                    initial={{x:-500, width: 0}}
                    animate={{ x: 0, width: showClosets ? 250 : 150 }}
                    exit={{x: -500, width: 0}}
                    transition={spring}

                > 
                        <div id="top">
                            <img src={logo} alt="logo" id="logo" onClick={handleHomeClick}/>
                        </div>
                        <motion.div id="links"
                        >   
                            <div id="link" className={location.pathname === "/" ? "highlight" : ""} onClick={handleHomeClick}>Home</div>
                            <div id="link" className={location.pathname === "/closets" ? "highlight" : ""} onClick={handleClosetClick} >My Closets</div>
                            <AnimatePresence>
                            {
                                showClosets &&
                               
                                    <motion.div id="closetList"
                                        initial={{y: 0, height: 0, opacity: 0}}
                                        animate={{ y: 0, height: "calc(60vh - 100px)", opacity: 1}}
                                        exit={{y: 0, height: 0, opacity: 0}}
                                    >
                                         <Scrollbars autoHide>
                                        {
                                            data.closets.map(
                                                (closet, i) => 
                                                <div id="closet" key={i}className={currentCloset === closet.id ? "highlight" : ""}
                                                onClick={()=>handleGotoCloset(closet.id)}>
                                                    {closet.name}
                                                </div>
                                            )
                                        }
                                        </Scrollbars>
                                    </motion.div>
                                
                            }
                            </AnimatePresence>
                            
                            {/* <div>{size.width}</div>
                            <div> {location.pathname} </div> */}
                        </motion.div>
                        <div id="bottom">
                        <IconButton id="setting" className={location.pathname === "/setting" ?
                         "highlight" : ""}  onClick={handleSettingClick}>
                            <RiSettings3Line/>
                        </IconButton>
                        </div>
                </motion.div>
            }
            </AnimatePresence>


            {/* <div id="body" style={{width: showSidebar ? "calc(100% - 150px)" : "100%" }}> */}
            <div id="body" style={{width:  "100%" }}>
                <div id="header" className={scrolled ? "shadow" : ""}>
                    <div id="current-user">
                        <IconButton  id="expand" onClick={()=>showSidebarSet(!showSidebar)}>
                        {   !showSidebar ?
                            <AiOutlineMenuUnfold id="icon"/> :
                            <AiOutlineMenuFold id="icon"/>}
                        </IconButton>
                        <div  id="notif">
                            <IconButton style={{height: "65px", width: "65px", color: showNotification ? "rgba(255, 0, 0, 0.336)" : ""}} onClick={()=>showNotificationSet(!showNotification)} >
                                <StyledBadge badgeContent={data.notification_count} color="secondary" max={99} >
                                    <IoMail style={{fontSize:"35px"}}/>
                                </StyledBadge>
                            </IconButton>
                            
                        </div>
                        <div id="searchbar">
                            <SearchBar
                                value={searchbar} 
                                onChange={(val) => searchbarSet(val)}
                                onRequestSearch={handleSearch}
                                style={{backgroundColor: scrolled && "#f6f8f8" }}
                            />
                        </div>
                        <div id="profile">
                            <div id="username">{data.username}</div>
                            <img src={data.propic} alt="userpropic" id="propic" />
                        </div>
                    </div>
                    <div id="notification-bar-container">
                    <AnimatePresence>
                    {
                    showNotification &&
                    <motion.div id="notification-bar"
                        initial={{height: 0, opacity: 0, y: -150}}
                        animate={{height: "150px", opacity: 1, y: 0}}
                        exit={{   height: 0, opacity: 0, y: -150 }}
                    >
                        This is the notification
                    </motion.div>
                    }
                    </AnimatePresence>
                    </div>
                </div>
            
                <div id="responsive-insert" style={{width: `100%` }}>
                    <Scrollbars onScroll={handleScroll}
                    // renderTrackHorizontal={props => <div {...props} style={{display: 'none'}} className="track-horizontal"/>}
                    >
                        {children}
                    </Scrollbars>
                </div>
            </div>
            
            
        </div>
    )
}

export default Dashboard