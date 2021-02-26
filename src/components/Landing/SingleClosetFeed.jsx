import React from 'react'
import {useHistory} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import {BiCloset} from 'react-icons/bi'
function SingleClosetFeed ({closet}){
    let history = useHistory();
    const handleClosetPage = () => {
        history.push(`/closet/${closet.id}`)
    }

    return(
        <div id="closet">
            <div id="text">
                <div id="name">{closet.name}  
                <div id="user">By {closet.username.replace("_", " ")}</div>
                <IconButton onClick={handleClosetPage} size="small"  id="closet">
                    <BiCloset/>
                </IconButton>
            </div>
            </div>
            <div id="display-case">
                {closet.products.map(
                    (item, i ) =>
                    <div key={i} id="product">
                        <img src={item.url} id="image" alt="product_img" />
                    </div>
                )}
                <div id="product" className="select" onClick={handleClosetPage}>
                    <img src="https://extension-static-image-hosting-rexfriends.s3.amazonaws.com/injection-cart-nocheck.png" id="image"/>
                </div>
            </div>
        </div>

    )
}

export default SingleClosetFeed