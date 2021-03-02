import React, {useState} from 'react'
import {useQueryClient} from 'react-query'
import {AnimatePresence, motion} from 'framer-motion'
import IconButton from '@material-ui/core/IconButton'
import {BsInfo} from 'react-icons/bs'

function AllProductItem({item}){
    const [hover, hoverSet] = useState(false)

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
            <img src={item.url} alt="product" id="image"/>
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