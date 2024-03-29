import './App.css';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AppContextComponent } from './components/AppContext/AppContext';
import Closet from './components/Closet/Closet';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import NoMatch from './components/NoMatch/NoMatch';
import Profile from './components/Profile/Profile';
import AllProducts from './components/AllProducts/AllProducts';
import Setting from './components/Setting/Setting';
import Feedback from './components/Feedback/Feedback';
import AllClosets from './components/AllClosets/AllClosets';
import { AnimatePresence } from 'framer-motion';
import Alerts from './components/Alerts/Alerts';

function App() {
    return ( <
        AppContextComponent >
        <
        div className = "App" >
        <
        Router >
        <
        Switch >
        <
        Route path = "/login"
        children = { < Login / > }
        /> <
        Route path = "/feedback/:id"
        children = { < Feedback / > }
        /> <
        Dashboard >
        <
        Route render = {
            ({ location }) => ( <
                AnimatePresence exitBeforeEnter >
                <
                Switch location = { location }
                key = { location.pathname } >
                <
                Route path = "/saved"
                children = { < AllProducts / > }
                /> <
                Route path = "/setting"
                children = { < Setting / > }
                /> <
                Route path = "/closets"
                exact = { true }
                children = { < AllClosets / > }
                /> <
                Route path = "/closets/:id"
                exact = { true }
                children = { < Closet / > }
                /> <
                Route path = "/user/:id"
                children = { < Profile / > }
                /> <
                Route path = "/nomatch/:id"
                children = { < NoMatch / > }
                /> <
                Route path = "*" >
                <
                Redirect to = "/login" / >
                <
                /Route> <
                /Switch> <
                /AnimatePresence>
            )
        }
        /> <
        /Dashboard> <
        /Switch> <
        /Router> <
        Alerts / >
        <
        /div> <
        /AppContextComponent>
    );
}

export default App;