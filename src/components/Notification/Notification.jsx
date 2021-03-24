import React, {useEffect, useState} from 'react';
import './Notification.scss'
import env from 'react-dotenv'

function Notification(){

    useEffect(() => {
        let rexUID = localStorage.getItem("rexUID")
        fetch(env.API_URL + "/api/get_notif?uid=" + rexUID)
        .then(res => res.json())
        .then(json => console.log(json))


        return () => {
            
        }
    }, [])
    return(
        <div id="notification">
            This is notification component
        </div>
    )
}

export default Notification