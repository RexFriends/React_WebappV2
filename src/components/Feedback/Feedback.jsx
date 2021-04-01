import React, {useEffect, useState} from 'react';

import {useParams} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import useWindowDimensions from '../../Hooks/useWindowDimensions'
import {AiOutlineSmile, AiOutlineFrown} from 'react-icons/ai'
import {FiSend} from 'react-icons/fi'
import '@brainhubeu/react-carousel/lib/style.css';
import './Feedback.scss'
import { AnimatePresence, motion } from 'framer-motion';
import Asset from "../../assets/img/Asset 1.png"
import URL from '../../assets/URL'

function Feedback(){
    let {id} = useParams()
    const { width } = useWindowDimensions();
    const [formData, formDataSet] = useState(undefined)
    const [images, imagesSet] = useState([])
    const [additionalFeedback, additionalFeedbackSet] = useState("")
    const [thumbs, thumbsSet] = useState(undefined)
    const [imageIndex, imageIndexSet] = useState(0);
    const [completePage, completePageSet] = useState(false)
    const [errorMessage, errorMessageSet] = useState(undefined)
    const [uid, uidSet] = useState(undefined)
    const [tempFirstName, tempFirstNameSet] = useState("")
    const [tempLastName, tempLastNameSet] = useState("")

    const [feedbackRowId, feedbackRowIdSet] = useState(null)
    const [completePageContent, completePageContentSet] = useState(undefined)
    useEffect(() => {
        let rexUID = localStorage.getItem("rexUID")
     
        uidSet(rexUID)
        console.log(uid);

        fetch(URL +  `/feedback?uid=${uid ? uid : ""}&rex_feedback_link=${id}`)
            .then(res => res.json())
            .then(json =>{ 
                console.log(json)
                let data = json
                console.log(data)
                feedbackRowIdSet(json.feedback_row_id)
                formDataSet(data)
                    let tempImages = []
                    let screenshot = json.screenshot
                    if(data.images !== null){
                    fetch(data.images)
                    .then((res) => res.json())
                    .then((json) => {
                    //! need to transform the weird base64 code to an img html object
                        console.log(json)
                        for (const key in json) {
                            let base64 = json[key];
                            if (
                            base64.substring(0, 2) === "b'" &&
                            base64[base64.length - 1]
                            ) {
                            base64 = base64.slice(2);
                            base64 = base64.slice(0, -1);
                            tempImages.push(
                                <img  src={'data:image/jpeg;base64,' + base64} id="img" alt={`webscraper ${key}`}/>
                                );
                            }else{
                                tempImages.push( <img  src={ base64} id="img" alt={`webscraper ${key}`}/>
                                )
                            }
                          
                        }

                        fetch(screenshot)
                        .then((res) => res.json())
                        .then((json) => {
                            tempImages.push(<img src={json.uri} id="img" alt="screenshot" />)
                            imagesSet(tempImages);
                        });

                    
                    })
                
                }else{
                    let screenshot = json.screenshot
                    let tempImages = []
                
                    fetch(screenshot)
                    .then((res) => res.json())
                    .then((json) => {
      
                        tempImages.push(<img src={json.uri} id="carousel-single" alt="screenshot" />)
                        imagesSet(tempImages);
                    });
                }

    })
        return () => {
            
        }
    }, [id,  uid])

    const cycle_images_right = () => {
        console.log('clicked')
    }

    const cycle_images_left = () => {

        // imageIndexSet((imageIndex - 1) % imagesSet.length());
        // console.log(imageIndex)
    }

    const  handleSendFeedback = () => {
        if(thumbs === undefined){
            errorMessageSet("Give a rating!")
            setTimeout(()=>errorMessageSet(undefined), 2000 )
        }else if(uid === null && tempFirstName === ""){
            errorMessageSet("Add a Name!")
            setTimeout(()=>errorMessageSet(undefined), 2000 )
        }else{
            let payload = {
                additionalFeedback: additionalFeedback,
                review: thumbs,
                feedback_row_id: feedbackRowId
            }
            if (uid === null){
                payload.name = tempFirstName.concat(" ", tempLastName)
            } 

            fetch(URL +  `/feedback?uid=${uid ? uid : "null"}&rex_feedback_link=${id}`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
            }
            ).then(
                res => res.json()
            ).then(json =>{
                console.log("response after send", json)
                if(json.success === true){
                    completePageSet(true)
                    return
                }
                if(json.success === false){
                    completePageSet(true)
                    completePageContentSet(json.reason)
                }
            }    
            ).catch(err => console.log("err response after send", err)
            
                )
            
        }
    }
    const handleCarousel = (e) => {
        imageIndexSet(e);
      };

    return(
        <div id="feedback_page">
            <AnimatePresence >
            {completePage ?
                <motion.div id="complete"
                    initial={{opacity: 0,  x:0}}
                    animate={{opacity: 1,  x:0}}
                    exit={{opacity: 0}}
                    transition={{ delay: 1 }} 
                >
                    <img src={Asset} alt="logo" id="logo"/>
                    {completePageContent &&
                        <div>
                            {completePageContent}
                        </div>
                    }
                    <div id="text">
                        Sent!
                    </div>
                    {  uid === null ?
                    <a id="link" href="/login">
                        Sign up!
                    </a>
                    :
                    <a id="link" href="/">
                    Return to Dashboard
                    </a>
                    }
                </motion.div>
            :
            formData  &&
                formData.url ?
                <motion.div id="content" className={width > 1000 ? "large" : "small"}
                    initial={{opacity: 0, x: 100}}
                    transition={{ delay: 1 }} 
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: 100}}
                >
                     <img src={Asset} alt="logo" id="logo"/>
                {images.length > 1 ?
                   
                    <div id="carousel">
                        <div id="sub-carousel">
                            
                            <Carousel
                                arrows
                                // value={imageIndex}
                                // slides={images}
                                // onChange={handleCarousel}
                                dots
                            >
                                {
                            images.map(item => item)}
                            </Carousel>
                          
                        </div>

                            
                    </div>
                    :
                    images[0]
                }
                    <div id="text">
                        <div id="user">
                            <div id="name">

                                {formData.user_first_name} {formData.user_last_name}
                            </div>
                            <a href={formData.url} target="_blank" id="link"  rel="noreferrer"> View Product </a>
                        </div>
                        <div id="form">
                            {
                                uid === null &&   
                                <div id="tempName">
                                    <TextField  label="First Name" autoComplete="off" value={tempFirstName} onChange={(e)=> tempFirstNameSet(e.target.value)}/>
                                    <TextField  label="Last Name" autoComplete="off" value={tempLastName} onChange={(e)=> tempLastNameSet(e.target.value)}/>
                                </div>
                            }
                        
                            <div id="submit_box">
                                <div id="thumbs">
                                    <IconButton id="button" className={ thumbs === true ? "highlight1" : "" } style={{color: "#37DB69"}} onClick={()=>thumbsSet(true)}>
                                        <AiOutlineSmile id="icon" />
                                    </IconButton>
                                    <IconButton id="button"  className={ thumbs === false ? "highlight2" : "" } style={{color: "#FD6C73"}} onClick={()=>thumbsSet(false)}>
                                        <AiOutlineFrown id="icon"  />
                                    </IconButton>
                                    <Button onClick={handleSendFeedback} id="submit" endIcon={<FiSend/>}>Submit</Button>                                 
                                </div>
                            </div>
                        <div id="feedback_text">
                                    <TextField multiline id="text_field" label="thoughts???" autoComplete="off" value={additionalFeedback} onChange={(e)=> additionalFeedbackSet(e.target.value)}/>
                        </div>
                            
                            <AnimatePresence>
                            {errorMessage &&
                            <motion.div id="error"
                            initial={{y: 300, opacity:0}}
                            animate={{y: 0, opacity:1}}
                            exit={{y: 300, opacity:0}}
                            >
                                {errorMessage}
                            </motion.div>
                            }
                            </AnimatePresence>
                        </div>
                    </div>
                    </motion.div>
                :
                <div id="loading screen">
                   
                </div>
            }
            </AnimatePresence>
        </div>
    )
}

export default Feedback
