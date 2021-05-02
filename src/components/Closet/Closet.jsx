import React, { useEffect, useState } from 'react';
import './Closet.scss';
import { useHistory, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, Checkbox, FormControlLabel, Grid, IconButton, TextField } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { FiEdit2 } from 'react-icons/fi';
import APIURL from '../../assets/URL';
import ProductItem from '../ProductItem/ProductItem';
import './Closet.scss';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';

function Closet() {
    const history = useHistory();

    const [closetData, closetDataSet] = useState(undefined);
    const [showClosetForm, showClosetFormSet] = useState(false);
    const [publicValue, publicValueSet] = useState(true);
    const [closetName, closetNameSet] = useState(undefined);
    const [imageUpload, imageUploadSet] = useState(undefined);
    const [fileUpload, fileUploadSet] = useState(undefined);
    const [headerColor, setHeaderColor] = useState(undefined);
    const [isOwned, setIsOwned] = useState(false);
    const { id } = useParams();

    const fetchCloset = () => {
        const rexUID = localStorage.getItem('rexUID');

        let idParams = '';
        if (rexUID !== null) idParams = `?uid=${rexUID}&id=${id}`;
        const url = `${APIURL}/api/closet${idParams}`;

        fetch(url)
            .then((res) => res.json())
            .then((json) => {
                closetDataSet(json);
                setHeaderColor(json.background_color);
                if (json.isOwned === true) {
                    setIsOwned(true);
                    imageUploadSet(json.closet_image_uri);
                    publicValueSet(json.user.isPublic);
                    closetNameSet(json.name);
                }
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        const { state } = history.location;
        if (state) showClosetFormSet(state.edit);
    }, [history.location]);

    useEffect(() => {
        if (!showClosetForm) {
            fetchCloset();
        }
    }, [id, showClosetForm]);

    const showEditForm = () => {
        showClosetFormSet(!showClosetForm);
    };

    const handleUpdateCloset = () => {
        const rexUID = localStorage.getItem('rexUID');
        const payload = {
            id: id,
            closet_name: closetName,
            is_public: publicValue,
            closet_image_uri: fileUpload ?? null,
            background_color: headerColor
        };

        fetch(`${APIURL}/api/update-closet?uid=${rexUID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(() => {
                fetchCloset();
            }).then(() => {
            handleGoBack();
        });
    };

    const handleUpload = (e) => {
        const image = URL.createObjectURL(e.target.files[0]);

        function getBase64(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                fileUploadSet(reader.result);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }

        getBase64(e.target.files[0]);

        imageUploadSet(image);
    };

    const handleGoBack = () => {
        showClosetFormSet(false);
        publicValueSet(closetData.user.isPublic);
        closetNameSet(closetData.name);
    };

    const handleBackButton = () => {
        if (showClosetForm) {
            handleGoBack();
        } else {
            history.push('/closets');
        }
    };

    const handleBackButtonSocial = () => {
        history.push(`/user/${closetData.user.id}`);
    };

    return (
        <motion.div
            id="ClosetPage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {
                closetData ? (
                    closetData.isOwned ? (
                        <motion.div
                            id="closet-header"
                            style={{ backgroundColor: `#${headerColor}` }}
                            initial={{ x: 200, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div style={{display: 'flex', flexDirection: 'column', margin: '0', width: '100%'}}>
                                <div style={{margin: '0 0 auto 0', width: '100%', display: 'flex', flexDirection: 'row'}}>
                                    <IconButton
                                        id="back-button"
                                        onClick={handleBackButton}
                                    >
                                        <ArrowBack />
                                    </IconButton>
                                    <div id="text">
                                        <div id="name">{closetData.name}</div>
                                    </div>
                                    
                                    {
                                        
                                        !showClosetForm ? (
                                            // <IconButton onClick={showEditForm} id="edit-form-button">
                                            //   <FiEdit2 /> 
                                            // </IconButton> 
                                            <Button 
                                                onClick={()=>{showEditForm()}} 
                                                id="edit-form-button" 
                                                style={{
                                                    color: `#${headerColor}`
                                                }}>
                                                Edit
                                            </Button>
                                        ) : (
                                        <Button 
                                            onClick={()=>{handleUpdateCloset()}} 
                                            id="edit-form-button" 
                                            style={{
                                                color: `#${headerColor}`
                                            }}>
                                            Save
                                        </Button>

                                        )
                                    }
                                </div>
                                {
                                    
                                    showClosetForm && 
                                    <Button component="label" style={{display: 'flex', flexDirection: 'row', fontFamily: 'baloo 2', fontSize: '20px', margin: '20px 20px auto auto', textTransform: 'none', color: 'white'}}>
                                        <PublishRoundedIcon style={{color: 'white', width: '30px', height: '30px', margin: 'auto 5px auto auto'}}>

                                        </PublishRoundedIcon>
                                        Upload thumbnail

                                        <div id="upload" style={{position: 'absolute', width: '100%', height: '100%'}}>
                                            <input
                                                style={{ display: 'none' }}
                                                id="raised-button-file"
                                                multiple
                                                type="file"
                                                accept="image/jpeg"
                                                onChange={handleUpload}
                                            />
                                            <label htmlFor="raised-button-file">
                                                <Button component="span" id="upload-button" />
                                            </label>
                                        </div>
                                    </Button>
                                }
                            </div>
                        
                        </motion.div>
                    ) : (
                        <motion.div
                            id="closet-header"
                            style={{ backgroundColor: `#${headerColor}` }}
                            initial={{ x: 200, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <IconButton
                                id="back-button"
                                onClick={()=>{handleBackButtonSocial()}}
                            >
                                <ArrowBack />
                            </IconButton>
                            <div id="text">
                                <div id="closet-name">{`${closetData.user.first_name} ${closetData.user.last_name}'s`}</div>
                                <div id="name">{closetData.name}</div>
                            </div>
                        </motion.div>
                    )
                ) : null
            }
            <AnimatePresence>
                {
                    showClosetForm ? (
                    
                        <motion.div
                            id="editForm"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                           
                            <div id="row">
                                <div id="label">Closet Name :</div>
                                <div id="field">
                                    <TextField
                                        value={closetName}
                                        onChange={(e) => {
                                            closetNameSet(e.target.value);
                                        }}
                                    />
                                </div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            checked={publicValue ?? false}
                                            onChange={() => publicValueSet(!publicValue)}
                                        />
                                    }
                                    label="Public :"
                                    labelPlacement="start"
                                    style={{margin: '0px 30px auto auto'}}
                                />
                            </div>

                            <Grid id="item-container" style={{minHeight: '500px'}}spacing={2} container>
                                {closetData && closetData.listings.map(p => (
                                    <Grid key={p.id} item>
                                        <ProductItem item={p} isOwned={isOwned} updateProducts={fetchCloset} isEditing={true}/>
                                    </Grid>
                                ))}
                            </Grid>
                            
                    </motion.div>
                
                    ):(
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <Grid id="item-container" style={{minHeight: '500px'}}spacing={2} container>
                        {closetData && closetData.listings.map(p => (
                            <Grid key={p.id} item>
                                <ProductItem item={p} isOwned={isOwned} updateProducts={fetchCloset} isEditing={false} />
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
                    )}
            
            </AnimatePresence>
        </motion.div>
    );
}

export default Closet;
