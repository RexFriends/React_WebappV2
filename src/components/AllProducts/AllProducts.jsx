import React, { useEffect, useState } from 'react';
import './AllProducts.scss';
import { AnimatePresence, motion } from 'framer-motion';
import APIURL from '../../assets/URL';
import ProductItem from '../ProductItem/ProductItem';

function AllProducts() {
    const [productData, productDataSet] = useState([]);

    useEffect(() => {
        const rexUID = localStorage.getItem('rexUID');

        fetch(`${APIURL}/api/all_listings?uid=${rexUID}`)
            .then(res => res.json())
            .then(json => {
                productDataSet(json.products);
            });
    }, []);

    return (

        <motion.div id="allProducts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div id="title">All Saved</div>
            <div id="container">
                <AnimatePresence>
                    <>
                        {productData.map((product, i) => <ProductItem item={product} key={i}/>)}
                    </>
                </AnimatePresence>
            </div>

        </motion.div>
    );
}

export default AllProducts;
