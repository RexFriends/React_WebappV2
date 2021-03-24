import React, {useEffect, useState} from 'react'
import './Closet.scss'
import {useParams} from 'react-router-dom'
import {motion} from 'framer-motion'
import ClosetItem from './ClosetItem'
import IconButton from '@material-ui/core/IconButton'
import {FiEdit2} from 'react-icons/fi'
import env from "react-dotenv";

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
        }
        ).catch(err => console.log(err))
 
        return () => {
            
        }
    }, [id])


    const showEditForm = () => {
        showClosetFormSet(true)
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
           <div id="item-container">
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
           </div>
           {  
            showEditForm && 
            <motion.div id="EditForm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{   opacity: 0 }}
            >
                <div>Edit Form</div>
            </motion.div>
           }
        </motion.div>
    )
}

export default Closet