import React, {useState} from 'react'
import './SingleItemContainer.scss'
import {AnimatePresence, motion} from 'framer-motion'
import IconButton from '@material-ui/core/IconButton'
import {BsInfo} from 'react-icons/bs'
import {FaSave} from 'react-icons/fa'
import Button from '@material-ui/core/button'
import Select from 'react-select';
import Scrollbars from "react-custom-scrollbars";
import Check from '../../assets/img/Check.png'
import NoCheck from '../../assets/img/NoCheck.png'
import ChatBubble from 'react-chat-bubble';
// we need to obtain all the closets that the user has
let data = {
    closets: [
        {id: 52, name: "Saved Products"},
        {id: 56, name: "new item"},
        {id: 58, name: "test 1"},
        {id: 59, name: "new closet"},
        {id: 60, name: "new closet 1"},
        {id: 61, name: "new closet 2"},
        {id: 62, name: "new closet 3"},
        {id: 63, name: "new closet 4"},
        {id: 64, name: "new closet 5"},
        { id: 65, name: "test 1 "},
        { id: 66, name: "test2 "}
    ]
}


function SingleItemContainer ({i, item}){
    const [itemSaved, itemSavedSet] = useState(false)
    const [hover, hoverSet] = useState(false)
    const [selectedClosetId, selectedClosetIdSet] = useState("1")
    const [selectedClosetName, selectedClosetNameSet] = useState("Save For Later")

    const customStyles = (width = 50, height = 20) => {
        return {
            container: (base) => ({
                ...base,
                display:'inline-block',
                width: width,
            }),
            valueContainer: (base) => ({
                ...base,
                minHeight: height,
            }),
            menuList: (base)=>({
                ...base,
                // border: "solid red 2px",
                height: "160px",
               
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
                marginBottom: "2px"

            }),
            menu: (base)=>({
                ...base,
                width: "130px",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
                // border: "solid red 2px",
                marginLeft: "5px",
                marginBottom: "2px"
            }),
        }
    }
    const renderScrollbar = props => {
        return (
          <div style={{ height: 100 }}>
            <Scrollbars>{props.children}</Scrollbars>
          </div>
        );
      };


    const handleShowInfo = () => {
        console.log("Show Item:", item)
    }

    const handleSaveToCloset = () => {
        console.log("Save current item to designated closet:", selectedClosetId)
        itemSavedSet(true)
    }

    const closetOptions = [
        { value: "2", label: 'Summer' },
        { value: '3', label: 'Fall' },
        { value: '4', label: 'Winter' },
        { value: '5', label: 'Spring' },
        { value: '6', label: 'Strawberry' },
        { value: '7', label: 'Vanilla' },
        { value: '8', label: 'Chocolate' },
        { value: '9', label: 'Strawberry' },
        { value: '10', label: 'Vanilla' },
        { value: '11', label: 'Chocolate' },
        { value: '12', label: 'Strawberry' },
        { value: '13', label: 'Vanilla' },
        { value: '14', label: 'Chocolate' },
        { value: '15', label: 'Strawberry' },
        { value: '16', label: 'Vanilla' },
    ]

    return(
        <div key={i} id="product" onMouseEnter={()=>hoverSet(true)} onMouseLeave={()=>hoverSet(false)}>
            <img src={item.url} id="image" alt="product_img" />
            <AnimatePresence>
            {
                itemSaved &&
                <motion.div id="overlay_saved"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                >
                    <img src={Check} alt="check" id="check"/>
                </motion.div>
            }
            </AnimatePresence>
             <AnimatePresence>
            {hover && 
                <motion.div id="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                >
                    <div id="top">
                        <IconButton onClick={handleShowInfo} id="info">
                            <BsInfo/>
                        </IconButton>
                    </div>
                    {
                        itemSaved ?
                            <div id="item-saved">
                               {selectedClosetName}
                               <div id="arrow">

                               </div>
                            </div>
                        :
                        <div id="bottom">
                        <Select
                            id="select"
                            closeMenuOnSelect={false}
                            menuPlacement="top"
                            options={closetOptions}
                            styles={customStyles(150, 30)}
                            defaultValue={{ label: "Save For Later", value: "3"}}
                            components={{ MenuList: renderScrollbar }}
                            onChange={(e)=>{selectedClosetNameSet(e.label); selectedClosetIdSet(e.value)}}
                        />
                        <IconButton onClick={handleShowInfo} id="closet" onClick={handleSaveToCloset} size="small">
                            <FaSave/>
                        </IconButton>
                        </div>
                    
                    }
                                
                </motion.div>
            }
            </AnimatePresence>
        </div>
    )
}
export default SingleItemContainer