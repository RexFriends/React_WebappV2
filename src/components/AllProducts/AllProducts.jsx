import React, {useEffect, useState} from 'react'
import './AllProducts.scss'
import AllProductItem from './AllProductItem'
import {AnimatePresence, motion} from 'framer-motion'
import URL from '../../assets/URL'

function AllProducts(){
    const [productData, productDataSet] = useState([])
    useEffect(() => {
        let rexUID = localStorage.getItem("rexUID")

        fetch(URL + "/api/all_listings?uid=" + rexUID)
        .then(
            res => res.json()
        ).then(
            json => {
                // console.log("Saved Product Fetch:", json)
                productDataSet(json.products)}
        )

        return () => {
            
        }
    }, [])

    return(
    
        <motion.div id="allProducts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{   opacity: 0 }}
        >
            <div id="title">All Saved</div>
            <div id="container" >
                <AnimatePresence>
                {
                    productData.map(
                        (product, i) => 
                        <AllProductItem item={product} key={i}/>

                    )
                }
                </AnimatePresence>
            </div>

        </motion.div>
    )
}

export default AllProducts