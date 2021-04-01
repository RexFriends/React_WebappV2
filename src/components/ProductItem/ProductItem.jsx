import React, { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { BsInfo } from 'react-icons/bs';
import './ProductItem.scss';
import TextOverflow from '../TextOverflow/TextOverflow';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SendIcon from '@material-ui/icons/Send';

function ProductItem({ item }) {
    const [hover, hoverSet] = useState(false);
    const [image, imageSet] = useState(undefined);
    const [brand, brandSet] = useState("Brand");
    const [product_name, product_nameSet] = useState("Product name");
    const [price, priceSet] = useState("$99.99");
    const [brandLogo, setbrandlogo] = useState(undefined)
    
    useEffect(() => {
        if (item.images !== null) {
            fetch(item.images)
                .then(res => res.json())
                .then(json => {
                    imageSet(json.img_1);
                })
                .catch(err => console.log("err 1"));
        } else {
            fetch(item.screenshot)
                .then(res => res.json())
                .then(json => imageSet(json.uri))
                .catch(err => console.log("err 2"));
        }
        console.log(item.site_name)
        brandSet(item.brand)
        setbrandlogo(item.site_name)
        // setbrandlogo(item.site_name)
        // var item_name = item.name
        // if (item_name) {
        //     var name = item_name.substring(0, item_name.indexOf(','))
        //     product_nameSet(name)
        // }
        product_nameSet(item.name);
        const itemPrice = item.price ? `${item.price}` : '';
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
                {/* <img style={{width: '30px', height: 'auto', borderFadius: '100%'}} src={`logo.clearbit.com/${brandLogo}`} /> */}
                <img src={image} alt="product" id="image" />
                <Grid style={{ width: 220, padding: '0 10px' }} justify="space-between" container>
                    <Grid xs={8} direction="column" container item>
                        <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '15px' }}>{brand}</span>
                        <TextOverflow
                            style={{ color: 'rgb(114, 114, 114)', fontSize: '13px', lineHeight: '1em', textAlign: 'left' }}
                            text={product_name ? product_name.split(',')[0] : ''}
                        />
                    </Grid>
                    <Grid xs={4} id="price" item>
                        <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{price}</span>
                        <IconButton style={{marginTop: '8px' }}/>
                    </Grid>
                </Grid>
                <AnimatePresence>
                    {
                        hover &&
                        <motion.div id="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div id="top">
                                <IconButton onClick={handleShowInfo} id="info">
                                    <SendIcon fontSize="large" style={{color: "14c4b2", width: "30px", height: "30px"}}/>
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
