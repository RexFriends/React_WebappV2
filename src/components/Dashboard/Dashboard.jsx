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
import env from "react-dotenv";
import Button from '@material-ui/core/Button'
// import {useQueryClient} from 'react-query'

import Scrollbars from "react-custom-scrollbars";
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
    // const queryClient = useQueryClient()
    let location = useLocation()
    let history = useHistory()
   
    const [scrolled, scrolledSet] = useState(false)
    const [searchbar, searchbarSet] = useState("")
    const [showSidebar, showSidebarSet] = useState(true)
    const [showClosets, showClosetsSet] = useState(false)
    const [currentCloset, currentClosetSet] = useState(undefined)
    const [showNotification, showNotificationSet] = useState(false)
    const [userAuth, userAuthSet] = useState(undefined)
    const [userData, userDataSet] = useState(undefined)
    const [closetData, closetDataSet] = useState(undefined)

    useEffect(() => {
        console.log("This is the initial application load")
        let rexUID = localStorage.getItem("rexUID")
        console.log("checking if user is logged in...", rexUID)
        
        if(rexUID !== null){
          fetch(env.API_URL + "/api/webdashboard?uid=" + rexUID,{
            method: "POST",
            headers:{   
                'Content-Type': 'application/json'
            }
        }).then(
            res => res.json()
        ).then(
            json =>{
               console.log(json)
               if(json.user){
                    userAuthSet(true)
                    userDataSet(json.user)
                    closetDataSet(json.closets)
               }else{
                    userAuthSet(false)
               }
            }
        )
        }else{
            userAuthSet(false)
        }
        return () => {
            
        }
    }, [])

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
        showNotificationSet(false)
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

    const handleExploreClick = () => {
        history.push("/explore")
    }

    // const handleStoresClick = () => {
    //     history.push("/stores")
    // }
    const handleClosetClick = () => {
        currentClosetSet(undefined)
        showClosetsSet(true)
        history.push("/closets")
    }

    // const handleFriendsClick = () => {
    //     history.push("/friends")
    // }
    const handleLikedClosetClick = () => {
        history.push("/liked")
    }
    
    const handleSavedClick = () => {
        history.push("/saved")
    }

    const handleSettingClick = () => {
        history.push("/setting")
    }
    const handleGotoCloset = (id) => {
        history.push(`/closet/${id}`)
    }

    const redirectLogin = () => {
        history.push("/login")
    }

    const handleSignupClick = () => {
        history.push("login")
    }

    return(
        <div id="dashboard">
            
            <AnimatePresence initial={false}>
            {
                typeof userAuth !== "undefined" && showSidebar &&
                <motion.div id="sidebar"
                    initial={{x:-500, width: 0}}
                    animate={{ x: 0, width: showClosets ? 250 : 150 }}
                    exit={{x: -500, width: 0}}
                    transition={spring}

                > 
                        <div id="top">
                            <img src={logo} alt="logo" id="logo" onClick={handleHomeClick}/>
                        </div>
                        <motion.div id="links" className={userAuth === false ? "no-auth" : "auth"}
                        >   
                            <div id="link" className={location.pathname === "/" ? "highlight" : ""} onClick={handleHomeClick}>Home</div>
                            {/* <div id="link" className={location.pathname === "/stores" ? "highlight" : ""} onClick={handleStoresClick}>Stores</div> */}
                            <div id="link" className={location.pathname === "/explore" ? "highlight" : ""} onClick={handleExploreClick}>Explore</div>
                            
                            {
                                userAuth === true ?
                            <>
                            {/* <div id="link" className={location.pathname === "/friends" ? "highlight" : ""} onClick={handleFriendsClick} >Friends</div> */}
                            <div id="link" className={location.pathname === "/saved" ? "highlight" : ""} onClick={handleSavedClick}>Saved Products</div>
                            <div id="link" className={location.pathname === "/liked" ? "highlight" : ""} onClick={handleLikedClosetClick} >Liked Closets</div>
                            <div id="link" className={location.pathname === "/closets" ? "highlight" : ""} onClick={handleClosetClick} >My Closets</div>
                            </>
                            :
                            <>
                            {/* <div id="link" className={location.pathname === "/friends" ? "highlight" : ""} onClick={handleFriendsClick} >Friends</div> */}
                            <div id="link" onClick={handleSignupClick}>Saved Products</div>
                            <div id="link" onClick={handleSignupClick} >Liked Closets</div>
                            <div id="link" onClick={handleSignupClick} >My Closets</div>
                            </>
                            }
                        
                            <AnimatePresence>
                            {
                                showClosets &&
                     
                               
                                    <motion.div id="closetList"
                                        initial={{y: 0, height: 0, opacity: 0}}
                                        animate={{ y: 0, height: "calc(60vh - 200px)", opacity: 1}}
                                        exit={{y: 0, height: 0, opacity: 0}}
                                    >
                                         <Scrollbars autoHide>
                                        {
                                            closetData &&
                                            closetData.map(
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
                        {
                            userAuth === true &&
                            <IconButton id="setting" className={location.pathname === "/setting" ?
                            "highlight" : ""}  onClick={handleSettingClick}>
                                <RiSettings3Line/>
                            </IconButton>
                        }
                        </div>
                </motion.div>
            }

            </AnimatePresence>
            <AnimatePresence initial={false}>
            {
                typeof userAuth !== "undefined" &&
                <motion.div id="body" style={{width:  "100%" }}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
          
                >
                <div id="header" className={scrolled ? "shadow" : ""}>
                    <div id="current-user">
                        <IconButton  id="expand" onClick={()=>showSidebarSet(!showSidebar)}>
                        {   !showSidebar ?
                            <AiOutlineMenuUnfold id="icon"/> :
                            <AiOutlineMenuFold id="icon"/>}
                        </IconButton>
                        {
                         typeof userAuth === "undefined"  ?
                        <div id="notif">

                        </div> :
                        userAuth === false ?
                        <div id="notif">

                        </div>
                        :
                        <div  id="notif">
                            <IconButton style={{height: "65px", width: "65px", color: showNotification ? "rgba(255, 0, 0, 0.336)" : ""}} onClick={()=>showNotificationSet(!showNotification)} >
                                <StyledBadge badgeContent={data.notification_count} color="secondary" max={99} >
                                    <IoMail style={{fontSize:"35px"}}/>
                                </StyledBadge>
                            </IconButton>
                            
                        </div>
                        }
                        <div id="searchbar">
                            <SearchBar
                                placeholder="Search People or Closets"
                                value={searchbar} 
                                onChange={(val) => searchbarSet(val)}
                                onRequestSearch={handleSearch}
                                style={{backgroundColor: scrolled && "#f6f8f8" }}
                            />
                        </div>
                        {
                            typeof userAuth === "undefined" ?
                            <div id="profile">

                            </div>:
                            !userAuth ?
                            <div id="profile">
                                <Button id="login-signup" onClick={redirectLogin}>Login / Signup</Button>
                            </div>:
                        
                            <div id="profile">
                                <div id="username">{ userData && `${userData.first_name} ${userData.last_name}`}</div>
                                <img src={data.propic} alt="userpropic" id="propic" />
                            </div>
                        }
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
            </motion.div>}
            </AnimatePresence>
            
        </div>
    )
}

export default Dashboard