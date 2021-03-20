import React, {useEffect, useState} from 'react';
import env from 'react-dotenv';
import './AllClosets.scss'
import ClosetPreview from './ClosetPreview'
function AllClosets () {

    const [closetData, closetDataSet] = useState(undefined)
    useEffect(() => {
        let rexUID = localStorage.getItem("rexUID")

        fetch(env.API_URL + "/api/closet_preview?uid=" + rexUID)
        .then(
            res => res.json()
        ).then(
            json => {
            closetDataSet(json.closet_preview)
            }
        )

        return () => {
            
        }
    }, [])

        return(
            <div id='AllClosetsPage'>
                <div id="header">This is the header</div>
                { closetData &&
                <div id="closet-container">
                  {  closetData.slice(0, 5).map((closet, i ) => 
                            <ClosetPreview closet={closet} key={i}/>
                  )
                    }
                </div>}
            </div>
        )
}

export default AllClosets