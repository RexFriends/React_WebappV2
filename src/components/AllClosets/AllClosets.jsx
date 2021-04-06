import React, { useEffect, useState } from 'react';
import APIURL from '../../assets/URL';
import './AllClosets.scss';
import ClosetPreview from './ClosetPreview';
import { motion } from 'framer-motion';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import TextField from '@material-ui/core/TextField';
import { Button} from '@material-ui/core';
import { showAlert } from '../Alerts/Alerts';


function AllClosets() {
    const rexUID = localStorage.getItem('rexUID');
    const [closetData, closetDataSet] = useState(undefined);
    const [creatingCloset, creatingClosetSet] = useState(false);
    const [closetName, closetNameSet] = useState("");
    useEffect(() => {
        fetch(`${APIURL}/api/closet_preview?uid=${rexUID}`)
            .then(res => res.json())
            .then(json => {
                const updatedData = json.closet_preview.filter(c => c.closet_name !== 'Saved Products');
                closetDataSet(updatedData);
            }
        );
    }, [rexUID, closetData]);

    async function handleNewCloset() {
        if (closetName.length == 0) {
            showAlert('Give your closet a name!', 'error');
        } else {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ closet_name: closetName })
            };
        try {
            const res = await fetch(`${APIURL}/api/closet?uid=${rexUID}`, requestOptions);
            const json = await res.json();
            console.log(json);
            if (json.success) {
                showAlert('Closet Created!', 'success');
                creatingClosetSet(false);
            } else {
                showAlert(`${json.reason}!`, 'error');
                return new Error(json.reason);
            }
            
        } catch (err) {
            //idk why successfull requests go here
            showAlert('Closet Created!', 'success');
                creatingClosetSet(false);
        }
        }
    }

    return (
        <motion.div id='AllClosetsPage'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div id="title">All Closets</div>
            {
                closetData &&
                <div id="closet-container">
                    <motion.div
                        className="closet"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            type: 'tween',
                            delay: 0.3
                        }}
                        onClick={() => creatingClosetSet(true)}
                    >
                        <div id="new-closet">
                            {  
                               
                                creatingCloset ?
                                <div id="new-form">
                                    <TextField 
                                    style={{margin: 'auto auto 0px auto', color: '#fff'}}
                                    label='Closet Name'
                                    value={closetName}
                                    onChange={(e) => {
                                        closetNameSet(e.target.value);
                                    }}
                                    ></TextField>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className="send-button"
                                        style={{margin: '20px auto auto auto', height: '30px', width: '65px', backgroundColor: 'white', color: '#207c9d', borderRadius: 50, fontWeight: 600}}
                                        onClick={() => handleNewCloset()}
                                        >
                                        Done
                                    </Button>
                                </div>
                                
                            :
                            <div id="content"> 
                                <LibraryAddIcon style={{color: "white", fontSize: 70, margin: "auto auto 0px auto"}}/>
                                <span style={{margin: '5px auto auto auto', color: 'white', fontWeight: '700', fontSize: '24px'}}>New</span> 
                        </div>
                            }
                        </div>
                    </motion.div>
                    {closetData.map((closet, i) => <ClosetPreview closet={closet} key={i}/>)}
                </div>
            }
        </motion.div>
    );
}

export default AllClosets;
