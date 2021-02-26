import React from 'react'
import './Closet.scss'
import {useParams} from 'react-router-dom'
function Closet(){
    let {id} = useParams()
    return(
        <div>
            This is closet/{id}
        </div>
    )
}

export default Closet