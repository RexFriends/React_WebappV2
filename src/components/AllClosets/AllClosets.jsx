import React, { useEffect, useState } from 'react';
import APIURL from '../../assets/URL';
import './AllClosets.scss';
import ClosetPreview from './ClosetPreview';
import { motion } from 'framer-motion';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import TextField from '@material-ui/core/TextField';
import { Button} from '@material-ui/core';
import { showAlert } from '../Alerts/Alerts';
import CloseIcon from '@material-ui/icons/Close';
import { StylesProvider } from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import "./styles.css";
import Checkbox from '@material-ui/core/Checkbox';
import { SquareFoot } from '@material-ui/icons';

function AllClosets() {
    const rexUID = localStorage.getItem('rexUID');
    const [closetData, closetDataSet] = useState(undefined);
    const [creatingCloset, creatingClosetSet] = useState(false);
    const [closetName, closetNameSet] = useState("");
    const [isPublic, setIsPublic] = useState(false);


    const fetchClosets = () => {
        fetch(`${APIURL}/api/closet_preview?uid=${rexUID}`)
            .then(res => res.json())
            .then(json => {
                    const updatedData = json.closet_preview.filter(c => c.closet_name !== 'Saved Products');
                    closetDataSet(updatedData);
                }
            );
    };

    useEffect(() => {
        fetchClosets();
    }, [rexUID]);

    async function handleNewCloset() {
        if (closetName.length === 0) {
            showAlert('Give your closet a name!', 'error');
        } else {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ closet_name: closetName, is_public: isPublic })
            };
            try {
                const res = await fetch(`${APIURL}/api/closet?uid=${rexUID}`, requestOptions);
                const json = await res.json();
                console.log(json);
                if (json.success) {
                    showAlert('Closet Created!', 'success');
                    creatingClosetSet(false);
                    fetchClosets();
                } else {
                    showAlert(`${json.reason}!`, 'error');
                    return new Error(json.reason);
                }
            } catch (err) {
                //idk why successfull requests go here
                showAlert('Closet Created!', 'success');
                creatingClosetSet(false);
                fetchClosets();
                closetNameSet("");
            }
        }
    }

    const handleEditCloset = (val) => {
        if (creatingCloset) {
            creatingClosetSet(val);
            closetNameSet("");
        } else {
            creatingClosetSet(val);
        }
    }

    const handlePublicChange = () => {
            setIsPublic(!isPublic);


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
                        onClick={() => handleEditCloset(true)}
                    >
                        <div id="new-closet">
                            {

                                creatingCloset ?

                                <motion.div id='new-form'
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ type: "tween", delay: 0.2 }}
                                >

                                    <Button
                                        onClick={(e) => {handleEditCloset(false); e.stopPropagation();}}
                                        style={{width: '30px', height: '30px', borderRadius: '100px', margin: '5px 0px 5px auto'}}>
                                        <CloseIcon style={{color: 'white', width: '30x', height: '30px'}}/>
                                    </Button>
                                    <StylesProvider injectFirst>
                                    <TextField
                                    id="text"
                                    style={{margin: 'auto auto 0px auto', color: '#fff'}}
                                    label='Closet Name'
                                    InputProps={{
                                        /* @ts-ignore */
                                        style: { color: '#fff', borderRadius: 50, borderBottomColor: '#fff', borderColor: '#fff' }
                                    }}
                                    value={closetName}
                                    onChange={(e) => {
                                        closetNameSet(e.target.value);
                                    }}
                                    ></TextField>
                                    </StylesProvider>
                                    <FormControlLabel
                                        control={
                                        <Checkbox
                                        checked={isPublic}
                                        onChange={() => {handlePublicChange()}}
                                        name="checkedA"
                                        color="primary"
                                        />
                                    }
                                        label="Public"
                                        styles={{color: 'white'}}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className="send-button"
                                        style={{margin: '20px auto auto auto', height: '30px', width: '65px', backgroundColor: 'white', color: '#207c9d', borderRadius: 50, fontWeight: 600}}
                                        onClick={() => handleNewCloset()}
                                        >
                                        Done
                                    </Button>
                                </motion.div>

                            :
                            // <motion.div id='content'
                            //         initial={{ y: -100, opacity: 0 }}
                            //         animate={{ y: 0, opacity: 1 }}
                            //         transition={{ type: "tween", delay: 0.0 }}
                            //     >
                            //     <LibraryAddIcon style={{color: "white", fontSize: 70, margin: "auto auto 0px auto"}}/>
                            //     <span style={{margin: '5px auto auto auto', color: 'white', fontWeight: '700', fontSize: '24px'}}>New</span>
                            // </motion.div>
                            <div id="content">
                                <LibraryAddIcon style={{color: "white", fontSize: 70, margin: "auto auto 0px auto"}}/>
                                <span style={{margin: '5px auto auto auto', color: 'white', fontWeight: '700', fontSize: '24px'}}>New</span>
                                </div>
                            }
                        </div>
                    </motion.div>
                    {closetData.map(c => <ClosetPreview closet={c} updateClosets={fetchClosets} key={c.id} />)}
                </div>
            }
        </motion.div>
    );
}

export default AllClosets;
