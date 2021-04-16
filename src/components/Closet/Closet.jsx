import React, { useEffect, useState } from 'react';
import './Closet.scss';
import { useHistory, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { FiEdit2 } from 'react-icons/fi';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import APIURL from '../../assets/URL';
import ProductItem from '../ProductItem/ProductItem';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './Closet.scss';

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
        console.log('update payload ', payload);

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
                            <IconButton
                                id="back-button"
                                onClick={handleBackButton}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            <div id="text">
                                <div id="name">{closetData.name}</div>
                            </div>
                            {
                                !showClosetForm && (
                                    <IconButton onClick={showEditForm} id="edit-form-button">
                                        <FiEdit2 />
                                    </IconButton>
                                )
                            }
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
                                onClick={handleBackButtonSocial}
                            >
                                <ArrowBackIcon />
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
                                />
                            </div>
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
                            </div>
                            <div id="currentImage">
                                {
                                    imageUpload ? (
                                        <div id="image">
                                            <img id="closet-img" alt="closet" src={imageUpload} />
                                        </div>
                                    ) : (
                                        <div id="image">
                                            <img
                                                id="closet-img"
                                                alt="closet"
                                                src="https://icons-for-free.com/iconfiles/png/512/box+document+outline+share+top+upload+icon-1320195323221671611.png"
                                            />
                                        </div>
                                    )
                                }
                                <div id="upload">
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
                            </div>
                            <Button id="save-button" onClick={handleUpdateCloset}>
                                Save
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            id="item-container"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            <>
                                {
                                    closetData &&
                                    closetData.listings.map((product, i) => (<ProductItem item={product} isOwned={isOwned} updateProducts={fetchCloset} key={i} />))
                                }
                            </>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </motion.div>
    );
}

export default Closet;
