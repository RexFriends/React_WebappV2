import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import './AllProducts.scss';
import { AnimatePresence, motion } from 'framer-motion';
import APIURL from '../../assets/URL';
import ProductItem from '../ProductItem/ProductItem';

function AllProducts() {
    const [productData, productDataSet] = useState([]);

    const fetchProducts = () => {
        const rexUID = localStorage.getItem('rexUID');
        fetch(`${APIURL}/api/all_listings?uid=${rexUID}`)
            .then(res => res.json())
            .then(json => {
                productDataSet(json.products);
            });
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <motion.div id="allProducts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div id="title">All Saved</div>
            <Grid id="container" spacing={2} container>
                <AnimatePresence>
                    {productData.map(p => (
                        <Grid key={p.id} item>
                            <ProductItem item={p} isOwned={true} updateProducts={fetchProducts} />
                        </Grid>
                    ))}
                </AnimatePresence>
            </Grid>

        </motion.div>
    );
}

export default AllProducts;
