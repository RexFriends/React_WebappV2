import React from 'react';
import './Setting.scss';
import Button from '@material-ui/core/Button';
import { Redirect, useHistory } from 'react-router-dom';

function Setting() {
    let history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('rexUID');
        history.go(0);
    };

    if (!localStorage.getItem('rexUID')) {
        return <Redirect to="/" />;
    }

    return (
        <div id="SettingPage">
            <Button id="button" onClick={handleLogout}>Log Out</Button>
        </div>
    );
}

export default Setting;
