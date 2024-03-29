import React from 'react';
import './NoMatch.scss';
import { useLocation } from 'react-router-dom';

function NoMatch() {
    const location = useLocation();

    return (
        <div>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </div>
    );
}

export default NoMatch;
