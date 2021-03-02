import React from 'react'
import './AllProducts.scss'
import AllProductItem from './AllProductItem'
import {AnimatePresence, motion} from 'framer-motion'

let data = {
    products: [
        {
            id: 30,
            url: "https://m.media-amazon.com/images/I/91QvbQrZ4eL._AC_UL320_.jpg",
            closet: [20, 21]
        },
        {
            id: 31,
            url: "https://m.media-amazon.com/images/I/81Sv3Z2suBL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 32,
            url: "https://m.media-amazon.com/images/I/81eBUIBfJpL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 33,
            url: "https://m.media-amazon.com/images/I/91YHIgoKb4L._AC_UL320_.jpg"
            ,closet: []
        },
        {
            id: 34,
            url: "https://m.media-amazon.com/images/I/A1T0ERFxCkL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 35,
            url: "https://m.media-amazon.com/images/I/810hQ8n009L._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 36,
            url: "https://m.media-amazon.com/images/I/810sqe8XJ+L._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 30,
            url: "https://m.media-amazon.com/images/I/91QvbQrZ4eL._AC_UL320_.jpg",
            closet: [20, 21]
        },
        {
            id: 31,
            url: "https://m.media-amazon.com/images/I/81Sv3Z2suBL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 32,
            url: "https://m.media-amazon.com/images/I/81eBUIBfJpL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 33,
            url: "https://m.media-amazon.com/images/I/91YHIgoKb4L._AC_UL320_.jpg"
            ,closet: []
        },
        {
            id: 34,
            url: "https://m.media-amazon.com/images/I/A1T0ERFxCkL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 35,
            url: "https://m.media-amazon.com/images/I/810hQ8n009L._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 36,
            url: "https://m.media-amazon.com/images/I/810sqe8XJ+L._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 30,
            url: "https://m.media-amazon.com/images/I/91QvbQrZ4eL._AC_UL320_.jpg",
            closet: [20, 21]
        },
        {
            id: 31,
            url: "https://m.media-amazon.com/images/I/81Sv3Z2suBL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 32,
            url: "https://m.media-amazon.com/images/I/81eBUIBfJpL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 33,
            url: "https://m.media-amazon.com/images/I/91YHIgoKb4L._AC_UL320_.jpg"
            ,closet: []
        },
        {
            id: 34,
            url: "https://m.media-amazon.com/images/I/A1T0ERFxCkL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 35,
            url: "https://m.media-amazon.com/images/I/810hQ8n009L._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 36,
            url: "https://m.media-amazon.com/images/I/810sqe8XJ+L._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 30,
            url: "https://m.media-amazon.com/images/I/91QvbQrZ4eL._AC_UL320_.jpg",
            closet: [20, 21]
        },
        {
            id: 31,
            url: "https://m.media-amazon.com/images/I/81Sv3Z2suBL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 32,
            url: "https://m.media-amazon.com/images/I/81eBUIBfJpL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 33,
            url: "https://m.media-amazon.com/images/I/91YHIgoKb4L._AC_UL320_.jpg"
            ,closet: []
        },
        {
            id: 34,
            url: "https://m.media-amazon.com/images/I/A1T0ERFxCkL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 35,
            url: "https://m.media-amazon.com/images/I/810hQ8n009L._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 36,
            url: "https://m.media-amazon.com/images/I/810sqe8XJ+L._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 30,
            url: "https://m.media-amazon.com/images/I/91QvbQrZ4eL._AC_UL320_.jpg",
            closet: [20, 21]
        },
        {
            id: 31,
            url: "https://m.media-amazon.com/images/I/81Sv3Z2suBL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 32,
            url: "https://m.media-amazon.com/images/I/81eBUIBfJpL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 33,
            url: "https://m.media-amazon.com/images/I/91YHIgoKb4L._AC_UL320_.jpg"
            ,closet: []
        },
        {
            id: 34,
            url: "https://m.media-amazon.com/images/I/A1T0ERFxCkL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 35,
            url: "https://m.media-amazon.com/images/I/810hQ8n009L._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 36,
            url: "https://m.media-amazon.com/images/I/810sqe8XJ+L._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 30,
            url: "https://m.media-amazon.com/images/I/91QvbQrZ4eL._AC_UL320_.jpg",
            closet: [20, 21]
        },
        {
            id: 31,
            url: "https://m.media-amazon.com/images/I/81Sv3Z2suBL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 32,
            url: "https://m.media-amazon.com/images/I/81eBUIBfJpL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 33,
            url: "https://m.media-amazon.com/images/I/91YHIgoKb4L._AC_UL320_.jpg"
            ,closet: []
        },
        {
            id: 34,
            url: "https://m.media-amazon.com/images/I/A1T0ERFxCkL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 35,
            url: "https://m.media-amazon.com/images/I/810hQ8n009L._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 36,
            url: "https://m.media-amazon.com/images/I/810sqe8XJ+L._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 30,
            url: "https://m.media-amazon.com/images/I/91QvbQrZ4eL._AC_UL320_.jpg",
            closet: [20, 21]
        },
        {
            id: 31,
            url: "https://m.media-amazon.com/images/I/81Sv3Z2suBL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 32,
            url: "https://m.media-amazon.com/images/I/81eBUIBfJpL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 33,
            url: "https://m.media-amazon.com/images/I/91YHIgoKb4L._AC_UL320_.jpg"
            ,closet: []
        },
        {
            id: 34,
            url: "https://m.media-amazon.com/images/I/A1T0ERFxCkL._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 35,
            url: "https://m.media-amazon.com/images/I/810hQ8n009L._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
        {
            id: 36,
            url: "https://m.media-amazon.com/images/I/810sqe8XJ+L._AC_UL320_.jpg"
            ,closet: [20, 21]
        },
    ]
}

function AllProducts(){
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
                    data.products.map(
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