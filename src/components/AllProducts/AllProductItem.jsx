import React, {useState, useEffect} from 'react'
import {useQueryClient} from 'react-query'
import {AnimatePresence, motion} from 'framer-motion'
import IconButton from '@material-ui/core/IconButton'
import {BsInfo} from 'react-icons/bs'

function AllProductItem({item}){
    const [hover, hoverSet] = useState(false)
    const [image, imageSet] = useState(undefined)
    useEffect(() => {

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
            imageSet('data:image/jpeg;base64,' +base64)
            })
            .catch(err => console.log("err 1"))
        }else{
            fetch(item.screenshot).then(
                res => res.json()
            ).then(json => 
                imageSet(json.uri)
            ).catch(err => console.log("err 2"))
        }     
    }, [item])
    const queryClient = useQueryClient()
    // const query = useQuery('ItemDetails', ItemDetails)
 
    const handleShowInfo = () => {
        let payload = { display: true, itemId: item.id}
        queryClient.setQueryData(['ItemDetails'], payload)
    }

    return(
        <motion.div id="product" onMouseEnter={()=>hoverSet(true)} onMouseLeave={()=>hoverSet(false)}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "tween",
                delay: 0.3}}
        >
            <img src={image} alt="product" id="image"/>
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
                </motion.div>
            }
            </AnimatePresence>
        </motion.div>
    )
}

export default AllProductItem