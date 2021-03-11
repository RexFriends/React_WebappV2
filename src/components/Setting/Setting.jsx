import React from 'react'
import './Setting.scss'
import Button from '@material-ui/core/Button'
import {  useHistory, Redirect }from "react-router-dom"
function Setting(){
    let history = useHistory()
    
    const handleLogout = () => {
        localStorage.removeItem('rexUID')
        history.go(0)
    }

    if(!localStorage.getItem("rexUID")){
        return <Redirect to="/"/>
    }

    return(
        <div>
            <Button onClick={handleLogout}>LogOut</Button>
        </div>
    )
}

export default Setting