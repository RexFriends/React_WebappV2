import React from 'react';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { BiCloset } from 'react-icons/bi';
import './SingleClosetFeed.scss';
import SingleItemContainer from './SingleItemContainer';
import Scrollbars from 'react-custom-scrollbars';

function SingleClosetFeed({ closet }) {
    let history = useHistory();
    const handleClosetPage = () => {
        history.push(`/closet/${closet.id}`);
    };

    return (
        <div id="closet">
            <div id="text">
                <div id="name">{closet.name}
                    <div id="user">By {closet.username.replace('_', ' ')}</div>
                    <IconButton onClick={handleClosetPage} size="small" id="closet">
                        <BiCloset />
                    </IconButton>
                </div>
            </div>
            <Scrollbars style={{ width: '100%', height: '235px' }} id="scrollbar">
                <div id="display-case">
                    {
                        closet.products.map((item, i) =>
                            <SingleItemContainer i={i} item={item} key={i} />
                        )
                    }
                    <div id="product" className="select showmore" onClick={handleClosetPage}>
                        <img
                            src="https://extension-static-image-hosting-rexfriends.s3.amazonaws.com/injection-cart-nocheck.png"
                            id="image" alt="nocheck"
                        />
                    </div>
                    <div id="space">

                    </div>
                </div>
            </Scrollbars>
        </div>
    );
}

export default SingleClosetFeed;
