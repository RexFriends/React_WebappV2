import React, {useState} from 'react'
import './Dashboard.scss'
import { useLocation, Link }from "react-router-dom"
import {IoMail} from 'react-icons/io5'
import {CgArrowTopLeftR} from 'react-icons/cg'
import IconButton from '@material-ui/core/IconButton'
import SearchBar from "material-ui-search-bar";
import Badge from "@material-ui/core/Badge"
import { withStyles } from '@material-ui/core/styles';
import logo from '../../assets/img/Asset 1.png'
import Button from '@material-ui/core/Button'


const StyledBadge = withStyles((theme) => ({
    badge: {
      right: 2,
      top: 5,
      border: `0px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);



function Dashboard({children}){
    let location = useLocation()
    const [scrolled, scrolledSet] = useState(false)
    const [searchbar, searchbarSet] = useState("")
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

    let data = {
        username: "Wesley1479",
        user_id: "1479",
        propic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        closets: [

        ],
        notification_count: 5
    }

    return(
        <div id="dashboard">
            {/* This is Dashboard, currently on page {location.pathname} */}
            <div id="sidebar"> 
                <div id="top">
                    <img src={logo} alt="logo" id="logo" />
                    {/* <IconButton id="collapse">
                        <CgArrowTopLeftR id="collapse"/>
                    </IconButton> */}
                </div>
                <div id="links">
                    <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
                    <Link to="/closets" style={{ textDecoration: 'none' }}>Closets</Link>
                    <Link to="/setting" style={{ textDecoration: 'none' }}>Settings</Link>
                </div>
            </div>



            <div id="body">
                <div id="header" className={scrolled ? "shadow" : ""}>
                    <div id="current-user">
                        <div  id="notif">
                            <IconButton style={{height: "65px", width: "65px"}} >
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
                </div>
                
                <div id="responsive-insert" onScroll={handleScroll}>
                    {children}
                </div>
            </div>
            
            
        </div>
    )
}

export default Dashboard