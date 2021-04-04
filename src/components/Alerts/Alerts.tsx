import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import type { Color } from '@material-ui/lab';

let updateShow:  React.Dispatch<React.SetStateAction<boolean>>,
    updateText: React.Dispatch<React.SetStateAction<string>>,
    updateType: React.Dispatch<React.SetStateAction<Color>>;

const showAlert = (text: string, type: 'success' | 'error'): void => {
    updateText(text);
    updateType(type);
    updateShow(true);
};

export { showAlert };

function Alerts(): React.ReactNode {
    const [show, setShow] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [type, setType] = useState<Color>('success');
    updateShow = setShow;
    updateText = setText;
    updateType = setType;

    const closeAlert = () => {
        setShow(false);
    };

    return (
        <Snackbar style={{ zIndex: 3000 }} open={show} onClose={closeAlert} autoHideDuration={2500} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity={type} variant="filled" onClose={closeAlert}>
                {text}
            </Alert>
        </Snackbar>
    );
}

export default Alerts;

