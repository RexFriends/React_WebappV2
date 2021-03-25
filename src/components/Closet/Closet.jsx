import React, {useEffect, useState} from 'react'
import './Closet.scss'
import {useParams} from 'react-router-dom'
import {AnimatePresence, motion} from 'framer-motion'
import ClosetItem from './ClosetItem'
import IconButton from '@material-ui/core/IconButton'
import Button from "@material-ui/core/Button"
import {FiEdit2, FiSave} from 'react-icons/fi'
import {IoArrowBack} from 'react-icons/io5'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import APIURL from '../../assets/URL'

function Closet(){
    // use the id to fetch the closet data
    const [closetData, closetDataSet] = useState(undefined)
    const [showClosetForm, showClosetFormSet] = useState(false)
    const [publicValue, publicValueSet] = useState(true)
    const [closetName, closetNameSet] = useState(undefined)
    const [imageUpload, imageUploadSet] = useState(undefined)
    const [fileUpload, fileUploadSet] = useState(undefined)
    let {id} = useParams()

    useEffect(() => {
        let rexUID = localStorage.getItem("rexUID")
        let url;

        if(rexUID !== null){
            url = APIURL + "/api/closet?uid=" + rexUID + "&id=" + id
        }else{
            url = APIURL + "/api/closet"
        }
        // console.log(url)
        fetch(url
        ).then(
            res => res.json()
        ).then(
            json => {
            // console.log("closet fetch results", json)
            closetDataSet(json)
            if(json.isOwned === true){
                imageUploadSet(json.closet_image_uri)
                publicValueSet(json.user.isPublic)
                closetNameSet(json.name)
            }
        }
        ).catch(err => console.log(err))
 
        return () => {
            
        }
    }, [id])


    const showEditForm = () => {
        showClosetFormSet(!showClosetForm)
    }

    const handleUpdateCloset = () => {
        let rexUID = localStorage.getItem("rexUID")
        let payload = {
            new_closet: {
                id: id,
                closet_name: closetName,
                is_public: publicValue,
                closet_image_uri: fileUpload ?? null
        }
        }
        // console.log(payload)
        fetch(APIURL + "/api/update-closet?uid=" + rexUID, {
           method: "PATCH",
           headers:{
            'Content-Type': 'application/json'
           },
        body: JSON.stringify(payload)
        }).then(res => res.json())
        // .then(json => console.log(json))
    }

    const handleUpload = (e) => {
        let image = URL.createObjectURL(e.target.files[0])

        function getBase64(file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                fileUploadSet(reader.result);
            };
            reader.onerror = function (error) {
              console.log('Error: ', error);
            };
        }

        getBase64(e.target.files[0])

        imageUploadSet(image)
    }
 
    const handleGoBack = ()=> {
        showClosetFormSet(false)
        publicValueSet(closetData.user.isPublic)
        closetNameSet(closetData.name)
    }

    return(
        <motion.div id="ClosetPage"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{   opacity: 0 }}
        >
            {
                closetData ?
                closetData.isOwned ?

                <motion.div id="closet-header" style={{backgroundColor: "#1F7C9D"}}
                initial={{ x:200, opacity: 0 }}
                animate={{ x:0, opacity: 1 }}
                transition={{duration: 0.3}}
                >
                    {/* <img src={data.closet_png} id="img" alt="closet"/> */}
                    <div id="text">
                        <div id="name">{closetData.name}</div>
                    </div>
                    {
                        !showClosetForm &&
                        <IconButton onClick={showEditForm} id="edit-form-button">
                            <FiEdit2/>
                        </IconButton>
                    }
                </motion.div>
               :
                <motion.div id="closet-header" style={{backgroundColor: "#1F7C9D"}}
                 initial={{ x:200, opacity: 0 }}
                 animate={{ x:0, opacity: 1 }}
                 transition={{duration: 0.3}}
                >
                    {/* <img src={data.closet_png} id="img" alt="closet"/> */}
                    <div id="text">
                        <div id="user">{closetData.user.first_name + " " + closetData.user.last_name}'s</div>
                        <div id="name">{closetData.name}</div>
                    </div>
                </motion.div>
                :
                <div>
               
                </div>
            }
            <AnimatePresence>
            {showClosetForm ?
                <motion.div id="editForm"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{duration: 0.3, delay: 0.1}}
                    >
                    
                    <div id="top-row">
                        <Button startIcon={<IoArrowBack/>} onClick={handleGoBack}>Go Back</Button>
                        <div id="center">Edit Closet</div>
                        <Button startIcon={<FiSave/>} onClick={handleUpdateCloset}>Save Settings</Button>
                    </div>
                    <div id="row">
                        <FormControlLabel
                     
 
                        control={<Checkbox color="primary"  checked={publicValue ?? false } onChange={()=>publicValueSet(!publicValue)} />}
                        label="Public :"
                        labelPlacement="start"
                        />
                    </div>

                    <div id="row">
                        <div id="label">Closet Name :</div>
                        <div id="field">
                        <TextField  value={closetName} onChange={(e)=>{closetNameSet(e.target.value)} }/>
                        </div>
                    </div>

                    <div id="currentImage">
                        {imageUpload ? 
                            <div id="image">
                                <img id="closet-img" alt="closet" src={imageUpload}/>
                            </div>
                    
                            :

                            <div id="image">
                                <img id="closet-img" alt="closet"  src="https://media.istockphoto.com/vectors/closet-icon-vector-sign-and-symbol-isolated-on-white-background-logo-vector-id1022960976"/>
                            </div>
                        }
                    </div>
  
                    <div id="upload">
                        <input
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        accept="image/jpeg"
                        onChange={handleUpload}
                        />
                        <label htmlFor="raised-button-file" >
                            <Button  component="span" id="upload-button" >
                                Upload Closet Image
                            </Button>
                        </label> 
                    </div>
                    
                </motion.div>
                :
                <motion.div id="item-container"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{duration: 0.3, delay: 0.1}}
                >
                        {closetData &&
                            closetData.listings.map(
                                (product, i) => 
                                <ClosetItem item={product} key={i}/>
                            )               
                        }
                </motion.div>}
            </AnimatePresence>
        </motion.div>
    )
}

export default Closet