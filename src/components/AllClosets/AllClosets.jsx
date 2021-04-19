import React, { useEffect, useState } from 'react';
import APIURL from '../../assets/URL';
import './AllClosets.scss';
import ClosetPreview from './ClosetPreview';
import { motion } from 'framer-motion';
import { Button, Checkbox, FormControlLabel, Grid, TextField, StylesProvider } from '@material-ui/core';
import { Close, LibraryAdd } from '@material-ui/icons';
import { showAlert } from '../Alerts/Alerts';
import NewClosetTile from '../NewClosetTile/NewClosetTile';

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
                console.log('closet preview ', json);
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
                console.error(err);
                showAlert('Creating closet failed!', 'error');
                throw err;
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
                <Grid id="closet-container" spacing={2} container>
                    <Grid item>
                        <NewClosetTile
                            closetName={closetName}
                            closetNameSet={closetNameSet}
                            creatingCloset={creatingCloset}
                            handleEditCloset={handleEditCloset}
                            isPublic={isPublic}
                            handlePublicChange={handlePublicChange}
                            handleNewCloset={handleNewCloset}
                        />
                    </Grid>
                    {closetData.map(c => (
                        <Grid key={c.id} item>
                            <ClosetPreview closet={c} updateClosets={fetchClosets} />
                        </Grid>
                    ))}
                </Grid>
            }
        </motion.div>
    );
}

export default AllClosets;
