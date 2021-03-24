import React, {useEffect, useState} from 'react'
import './Closet.scss'
import {useParams} from 'react-router-dom'
import {AnimatePresence, motion} from 'framer-motion'
import ClosetItem from './ClosetItem'
import IconButton from '@material-ui/core/IconButton'
import Button from "@material-ui/core/Button"
import {FiEdit2, FiSave} from 'react-icons/fi'
import Checkbox from '@material-ui/core/Checkbox'
import env from "react-dotenv";
import TextField from '@material-ui/core/TextField'

let data = {
    id: 20,
    username: "Gigi_Hadid",
    name: "Yoga Gear",
    color: "#1F7C9D",
    item_count: 4,
    publish_time: 1614266044395,
    closet_png: "https://extension-static-image-hosting-rexfriends.s3.amazonaws.com/HardCodeData/Gigi.png",
    products: [
        {
            id: 30,
            url: "https://m.media-amazon.com/images/I/91QvbQrZ4eL._AC_UL320_.jpg",
            closet: [20, 21]
        },
        {
            id: 31,
            url: "https://m.media-amazon.com/images/I/81Sv3Z2suBL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 32,
            url: "https://m.media-amazon.com/images/I/81eBUIBfJpL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 33,
            url: "https://m.media-amazon.com/images/I/91YHIgoKb4L._AC_UL320_.jpg"
            ,closet: []
        },
        {
            id: 34,
            url: "https://m.media-amazon.com/images/I/A1T0ERFxCkL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 35,
            url: "https://m.media-amazon.com/images/I/810hQ8n009L._AC_UL320_.jpg"
            ,closet: [20, 21]
        }]
}

function Closet(){
    // use the id to fetch the closet data
    const [closetData, closetDataSet] = useState(undefined)
    const [showClosetForm, showClosetFormSet] = useState(false)
    const [publicValue, publicValueSet] = useState(undefined)
    const [closetImageURI, closetImageURISet] = useState(undefined)
    const [closetName, closetNameSet] = useState(undefined)
    let {id} = useParams()

    useEffect(() => {
        let rexUID = localStorage.getItem("rexUID")
        let url;

        if(rexUID !== null){
            url = env.API_URL + "/api/closet?uid=" + rexUID + "&id=" + id
        }else{
            url = env.API_URL + "/api/closet"
        }
        console.log(url)
        fetch(url
        ).then(
            res => res.json()
        ).then(
            json => {
            console.log("closet fetch results", json)
            closetDataSet(json)
            if(json.isOwned){
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
        let payload = {
            closet_name: closetName,
            is_public: publicValue,
            closet_image_uri: "www.newclosetimage.com"
        }
        console.log(payload)
    }

    const handleUpload = (e) => {
        console.log(e.target.value)
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

                <motion.div id="closet-header" style={{backgroundColor: data.color}}
                initial={{ x:200, opacity: 0 }}
                animate={{ x:0, opacity: 1 }}
                transition={{duration: 0.3}}
                >
                    {/* <img src={data.closet_png} id="img" alt="closet"/> */}
                    <div id="text">
                        <div id="name">{closetData.name}</div>
                    </div>
                    <IconButton onClick={showEditForm}>
                        <FiEdit2/>
                    </IconButton>
                </motion.div>
               :
                <motion.div id="closet-header" style={{backgroundColor: data.color}}
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
                    Loading
                </div>
            }
            <AnimatePresence>
            {showClosetForm ?
                <motion.div id="editForm"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{duration: 0.3, delay: 0.1}}
                    >
                    <div>Edit Form</div>
                    <Checkbox value={publicValue} onChange={()=>publicValueSet(!publicValue)} />
                    <TextField id="standard-basic" label="Standard" value={closetName} onChange={(e)=>{closetNameSet(e.target.value)} }/>
                    <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={handleUpload}
                    />
                    <label htmlFor="raised-button-file" >
                    <Button variant="raised" component="span" >
                        Upload
                    </Button>
                    </label> 
                    <Button startIcon={<FiSave/>} onClick={handleUpdateCloset}>Save Closet Settings</Button>
                </motion.div>
                :
                <motion.div id="item-container"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{duration: 0.3, delay: 0.1}}
                >
                        {closetData ?
                            closetData.listings.map(
                                (product, i) => 
                                <ClosetItem item={product} key={i}/>
                            )            
                            :
                            <div>
                                Loading
                            </div>    
                        }
                </motion.div>}
            </AnimatePresence>
        </motion.div>
    )
}

export default Closet