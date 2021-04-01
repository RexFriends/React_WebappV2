import React, {useState, useEffect} from 'react';
import { useHistory }from "react-router-dom"
import {motion, AnimatePresence} from 'framer-motion'
import './ClosetPreview.scss';

function ClosetPreview({closet}){

    let history = useHistory()
    const [imageData, imageDataSet] = useState([])
    const [hover, hoverSet] = useState(false);
    const [change, changeSet] = useState(false)
    useEffect(() => {
        // console.log("Render", closet.id)
        
        async function fetchImages(){
            let temp = []
            closet.items.slice(0, 4).forEach(
                item => {
                    if(item.images !== null){
                        fetch(item.images).then(
                            res => res.json()
                        ).then(json => {
                            temp.push(json.img_1);
                        })
                    }else{
                        fetch(item.img).then(
                            res => res.json()
                        ).then(json => 
                            temp.push(json.uri)
                        )
                    }
                   
                }
            )
            return temp
        }
        fetchImages().then(temp => {
            imageDataSet(temp)
            // !check if needed
            // history.push("/closets")
        }
        )
        
        return () => {
        }
    }, [closet, history])

    setTimeout(()=> changeSet(!change), 50)

    const handleClosetView = () => {
        history.push(`/closets/${closet.id}`)
    }

    return(
    <motion.div id="closet"
    onMouseEnter={() => hoverSet(true)}
    onMouseLeave={() => hoverSet(false)}
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
        type: "tween",
        delay: 0.3}}
        onClick={handleClosetView}
    >   
        {
            // closet.closet_icon !== "FaSave" ?
            closet.closet_icon ?
            <img src={closet.closet_icon} id="closet-icon" alt="closet-icon" />


            :
            imageData.map(
                (img, i) => 
                <img src={img} id="img" key={i}  alt={i} />
            )
            // :
            // imageData.map(
            //     (img, i) => 
                

        }
        <AnimatePresence>
                    {
                        hover &&
                        <motion.div id="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {/* <div id="top">
                                <IconButton onClick={handleShowInfo} id="info">
                                    <SendIcon fontSize="large" style={{color: "14c4b2", width: "30px", height: "30px"}}/>
                                </IconButton>
                            </div> */}
                        </motion.div>
                    }
                </AnimatePresence>
        
        <div id="closet-name">{closet.closet_name}</div>
    </motion.div>
    )
}

export default ClosetPreview
