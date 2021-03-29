import React, { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { BsInfo } from 'react-icons/bs';
import '../AllProducts/AllProducts.scss';
import TextOverflow from '../TextOverflow/TextOverflow';

function ProductItem({ item }) {
    const [hover, hoverSet] = useState(false);
    const [image, imageSet] = useState(undefined);
    const [brand, brandSet] = useState("Brand");
    const [product_name, product_nameSet] = useState("Product name");
    const [price, priceSet] = useState("$99.99");
    
    useEffect(() => {
        if(item.images !== null) {
            fetch(item.images)
                .then(res => res.json())
                .then(json => {
                    let base64 = json.img_1;
                    if (base64.substring(0, 2) === "b'" && base64[base64.length - 1]) {
                        base64 = base64.slice(2);
                        base64 = base64.slice(0, -1);
                    }
                    imageSet('data:image/jpeg;base64,' + base64);
                })
                .catch(err => console.log("err 1"));
        } else {
            fetch(item.screenshot)
                .then(res => res.json())
                .then(json => imageSet(json.uri))
                .catch(err => console.log("err 2"));
        }
        brandSet(item.brand)
        // var item_name = item.name
        // if (item_name) {
        //     var name = item_name.substring(0, item_name.indexOf(','))
        //     product_nameSet(name)
        // }
        product_nameSet(item.name);
        const itemPrice = item.price ? `${item.currency}${item.price}` : '';
        priceSet(itemPrice);
    }, [item])
    const queryClient = useQueryClient()
    // const query = useQuery('ItemDetails', ItemDetails)

    const handleShowInfo = () => {
        const payload = { display: true, itemId: item.id};
        queryClient.setQueryData(['ItemDetails'], payload);
    }

    return(
        <>
            <motion.div
                id="product"
                onMouseEnter={() => hoverSet(true)}
                onMouseLeave={() => hoverSet(false)}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "tween", delay: 0.3}}
            >
                <img src={image} alt="product" id="image" />
                <Grid style={{ width: 220, padding: '0 10px' }} justify="space-between" container>
                    <Grid xs={8} direction="column" container item>
                        <span style={{ fontWeight: 'bold', textAlign: 'left' }}>{brand}</span>
                        <TextOverflow
                            style={{ color: 'rgb(114, 114, 114)', fontSize: '10pt', lineHeight: '1em', textAlign: 'left' }}
                            text={product_name ? product_name.split(',')[0] : ''}
                        />
                    </Grid>
                    <Grid xs={4} id="price" item>
                        <span style={{ fontWeight: 'bold' }}>{price}</span>
                    </Grid>
                </Grid>
                <AnimatePresence>
                    {
                        hover &&
                        <motion.div id="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div id="top">
                                <IconButton onClick={handleShowInfo} id="info">
                                    <BsInfo/>
                                </IconButton>
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
            </motion.div>
        </>
    )
}

export default ProductItem;
