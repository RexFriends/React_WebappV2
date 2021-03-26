import React, {useState, useEffect} from 'react';
import { useHistory }from "react-router-dom"
import {motion} from 'framer-motion'

function ClosetPreview({closet}){

    let history = useHistory()
    const [imageData, imageDataSet] = useState([])
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
                            let base64 = json.img_1
                            if (
                                base64.substring(0, 2) === "b'" &&
                                base64[base64.length - 1]
                                ) {
                                base64 = base64.slice(2);
                                base64 = base64.slice(0, -1);
                                }
                            temp.push('data:image/jpeg;base64,' +base64)
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
        
        <div id="closet-name">{closet.closet_name}</div>
    </motion.div>
    )
}

export default ClosetPreview