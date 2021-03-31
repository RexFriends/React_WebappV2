import React from 'react'
import {useState, useEffect} from 'react'
import './Setting.scss'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {  useHistory, Redirect }from "react-router-dom"
function Setting(){
    let history = useHistory()
    const [username, usernameSet] = useState("")
    const [isEditingUsername, isEditingUsernameSet] = useState(false)   
    const handleLogout = () => {
        localStorage.removeItem('rexUID')
        history.go(0)
    }

    if(!localStorage.getItem("rexUID")){
        return <Redirect to="/"/>
    }

    return(
        <div id="SettingPage">
            <div id="username">
                <span>Username:</span>
                { isEditingUsername ?
                
                <TextField label="username" variant="outlined" size="small"value={username} onChange={(e)=>usernameSet(e.target.value)} />
                :
                    <span>testUsername123</span>
                }
                
                
                
            </div>
            <div id="profile-image-update">
                
            </div>
            <Button id="button" onClick={handleLogout}>LogOut</Button>
        </div>
    )
}

export default Setting