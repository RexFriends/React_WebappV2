import React, {useEffect, useState} from 'react';
import './Notification.scss'
import env from 'react-dotenv'

function Notification(){
    const [NotifData, NotifDataSet] = useState(undefined)
    useEffect(() => {
        let rexUID = localStorage.getItem("rexUID")
        fetch(env.API_URL + "/api/get_notif?uid=" + rexUID)
        .then(res => res.json())
        .then(json => NotifDataSet(json.notifications))


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