import React from 'react'
import './Dashboard.scss'
import { useLocation }from "react-router-dom"

function Dashboard({children}){
    let location = useLocation()
    return(
        <div>
        This is Dashboard, currently on page {location.pathname}
        {children}
        </div>
    )
}

export default Dashboard