import React, { useEffect, useState } from 'react';
import './Dashboard.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { IoMail } from 'react-icons/io5';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { RiSettings3Line } from 'react-icons/ri';
import { Popover } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SearchBar from 'material-ui-search-bar';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import logo from '../../assets/img/Asset 1.png';
import Button from '@material-ui/core/Button';
import AllNotifications from '../AllNotifications/AllNotifications';
import APIURL from '../../assets/URL';
import Scrollbars from 'react-custom-scrollbars';
import { AnimatePresence, motion } from 'framer-motion';

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: 2,
        top: 5,
        border: `0px solid ${theme.palette.background.paper}`,
        padding: '0 4px'
    }
}))(Badge);

const spring = {
    type: 'spring',
    damping: 50,
    stiffness: 100,
    default: { duration: 0.5 }
};

function Dashboard({ children }) {
    let location = useLocation();
    let history = useHistory();

    const [scrolled, scrolledSet] = useState(false);
    const [searchbar, searchbarSet] = useState('');
    const [showSidebar, showSidebarSet] = useState(true);
    const [showClosets, showClosetsSet] = useState(false);
    const [currentCloset, currentClosetSet] = useState(undefined);
    const [showNotification, showNotificationSet] = useState(false);
    const [userAuth, userAuthSet] = useState(undefined);
    const [userData, userDataSet] = useState(undefined);
    const [closetData, closetDataSet] = useState(undefined);
    const [NotifCount, NotifCountSet] = useState(undefined);

    useEffect(() => {
        const rexUID = localStorage.getItem('rexUID');

        if (rexUID !== null) {
            fetch(`${APIURL}/api/webdashboard?uid=${rexUID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then((json) => {
                    if (json.user) {
                        userAuthSet(true);
                        userDataSet(json.user);
                        const updatedData = json.closets.filter(c => c.closet_name !== 'Saved Products');
                        closetDataSet(updatedData);
                        NotifCountSet(json.notif_count);
                    } else {
                        userAuthSet(false);
                        localStorage.removeItem('rexUID');
                        history.push('/login');
                    }
                });
        } else {
            userAuthSet(false);
            history.push('/login');
        }
    }, []);

    useEffect(() => {
        const currentPage = location.pathname.split('/');
        if (currentPage[1] === 'closet') {
            showClosetsSet(true);
            currentClosetSet(parseInt(currentPage[2]));
        } else if (currentPage[1] === 'closets') {
            showClosetsSet(true);
        } else {
            showClosetsSet(false);
            currentClosetSet(undefined);
        }
    }, [location.pathname]);

    const handleScroll = (e) => {
        showNotificationSet(false);
        if (e.target.scrollTop > 0) {
            scrolledSet(true);
        }
        if (e.target.scrollTop === 0) {
            scrolledSet(false);
        }
    };

    const handleSearch = () => {
        console.log('Search term:', searchbar);
    };

    const handleHomeClick = () => {
        history.push('/');
        showClosetsSet(false);
    };

    const handleClosetClick = () => {
        currentClosetSet(undefined);
        showClosetsSet(true);
        history.push('/closets');
    };

    const handleSavedClick = () => {
        history.push('/saved');
    };

    const handleSettingClick = () => {
        history.push('/setting');
    };
    const handleGotoCloset = (id) => {
        history.push(`/closets/${id}`);
    };

    const redirectLogin = () => {
        history.push('/login');
    };

    const handleSignupClick = () => {
        history.push('login');
    };

    return (
        <div id="dashboard">
            <AnimatePresence initial={false}>
                {
                    typeof userAuth !== 'undefined' && showSidebar &&
                    <motion.div
                        id="sidebar"
                        initial={{ x: -500, width: 0 }}
                        animate={{ x: 0, width: showClosets ? 250 : 150 }}
                        exit={{ x: -500, width: 0 }}
                        transition={spring}
                    >
                        <div id="top">
                            <img src={logo} alt="logo" id="logo" onClick={handleHomeClick}/>
                        </div>
                        <motion.div id="links" className={userAuth === false ? 'no-auth' : 'auth'}>
                            {
                                userAuth === true ? (
                                    <>
                                        <div
                                            id="link"
                                            className={location.pathname === '/saved' ? 'highlight' : ''}
                                            onClick={handleSavedClick}
                                        >
                                            My Products
                                        </div>
                                        <div
                                            id="link"
                                            className={location.pathname === '/closets' ? 'highlight' : ''}
                                            onClick={handleClosetClick}
                                        >
                                            My Closets
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div id="link" onClick={handleSignupClick}>
                                            Login
                                        </div>
                                    </>
                                )
                            }
                            <AnimatePresence>
                                {
                                    showClosets &&
                                    <motion.div
                                        id="closetList"
                                        initial={{ y: 0, height: 0, opacity: 0 }}
                                        animate={{ y: 0, height: 'calc(60vh)', opacity: 1 }}
                                        exit={{ y: 0, height: 0, opacity: 0 }}
                                    >
                                        <Scrollbars autoHide>
                                            {
                                                closetData &&
                                                closetData.map((closet, i) => (
                                                    <div
                                                        id="closet"
                                                        key={i}
                                                        className={
                                                            currentCloset === closet.id ? 'highlight' : ''
                                                        }
                                                        onClick={() => handleGotoCloset(closet.id)}
                                                    >
                                                        {closet.name}
                                                    </div>
                                                ))
                                            }
                                        </Scrollbars>
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </motion.div>
                        <div id="bottom">
                            {
                                userAuth === true &&
                                <IconButton
                                    id="setting"
                                    className={location.pathname === '/setting' ? 'highlight' : ''}
                                    onClick={handleSettingClick}
                                >
                                    <RiSettings3Line/>
                                </IconButton>
                            }
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
            <AnimatePresence initial={false}>
                {
                    typeof userAuth !== 'undefined' &&
                    <motion.div id="body" style={{ width: '100%' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div id="header" className={scrolled ? 'shadow' : ''}>
                            <div id="current-user">
                                <IconButton id="expand" onClick={() => showSidebarSet(!showSidebar)}>
                                    {
                                        !showSidebar ?
                                            <AiOutlineMenuUnfold id="icon"/>
                                            :
                                            <AiOutlineMenuFold id="icon"/>
                                    }
                                </IconButton>
                                {
                                    typeof userAuth === 'undefined' ? (
                                        <div id="notif" />
                                    ) : userAuth === false ? (
                                        <div id="notif" />
                                    ) : (
                                        <div id="notif">
                                            <IconButton
                                                id="notif-button"
                                                style={{
                                                    height: '65px',
                                                    width: '65px',
                                                    color: showNotification ? 'rgba(255, 0, 0, 0.336)' : ''
                                                }}
                                                onClick={() => showNotificationSet(!showNotification)}
                                            >
                                                <StyledBadge
                                                    badgeContent={NotifCount}
                                                    color="secondary"
                                                    max={99}
                                                >
                                                    <IoMail style={{ fontSize: '35px' }}/>
                                                </StyledBadge>
                                            </IconButton>
                                            <Popover
                                                PaperProps={{ style: { maxHeight: 550, width: 950 } }}
                                                open={showNotification}
                                                onClose={() => showNotificationSet(!showNotification)}
                                                anchorEl={document.getElementById('notif-button')}
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                            >
                                                <AllNotifications notifCountSetter={NotifCountSet}/>
                                            </Popover>
                                        </div>
                                    )
                                }
                                <div id="searchbar">
                                    <SearchBar
                                        placeholder="Find People You Know / IN DEV"
                                        value={searchbar}
                                        onChange={(val) => searchbarSet(val)}
                                        onRequestSearch={handleSearch}
                                        style={{ backgroundColor: scrolled && '#f6f8f8' }}
                                    />
                                </div>
                                {
                                    typeof userAuth === 'undefined' ? (
                                        <div id="profile" />
                                    ) : !userAuth ? (
                                        <div id="profile">
                                            <Button id="login-signup" onClick={redirectLogin}>
                                                Login / Signup
                                            </Button>
                                        </div>
                                    ) : (
                                        <div id="profile">
                                            <div id="username">
                                                {userData && `${userData.first_name} ${userData.last_name}`}
                                            </div>
                                            <div id="temp-propic">
                                                {
                                                    userData &&
                                                    `${userData.first_name.charAt(0)}${userData.last_name.charAt(0)}`
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div id="responsive-insert" style={{ width: `100%` }}>
                            <Scrollbars onScroll={handleScroll}>{children}</Scrollbars>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
}

export default Dashboard;
