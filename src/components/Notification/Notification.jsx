import React, {useEffect, useState} from 'react';
import './Notification.scss'
import APIURL from '../../assets/URL'

function Notification(){
    const [NotifData, NotifDataSet] = useState(undefined)
    useEffect(() => {
        let rexUID = localStorage.getItem("rexUID")
        fetch(APIURL + "/api/get_notif?uid=" + rexUID)
        .then(res => res.json())
        .then(json =>{
            console.log("Notification Fetch", json)
            NotifDataSet(json.notifications)})


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