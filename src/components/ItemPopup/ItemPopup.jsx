import React, {useEffect, useState} from 'react'
import {useQuery, useQueryClient} from 'react-query'
import './ItemPopup.scss'
import {AnimatePresence, motion} from 'framer-motion'

const ItemDetails = () => {
    // console.log("querying")
    return(
        {
            display: false,
        }
    )
}


function ItemPopup (){
    // const query = useQuery('ItemDetails', ItemDetails)
    const [itemDetail, itemDetailSet] = useState(undefined)
    const queryClient = useQueryClient()
    const query = useQuery('ItemDetails', ItemDetails)

    useEffect(() => {
        // console.log("Show Item Popup", query.data)
        if( query.status === "success" && query.data.display === true){
            // make fetch call here with provided item id to fill data
            console.log("Show current item, ID:", query.data.itemId)
            let payload={
                "closets": [
                    44
                ],
                "feedbacks": [],
                "id": 30,
                "imgURL": "https://product-images-rex.s3.amazonaws.com/users/TIarE2P8bXMPASMb04ShfO7GCJ7f/items/30",
                "itemName": "PS5 Controller Charger Station Compatible with Upgraded Playstation 5 Dualsense Controller, DinoFire USB Type-C Fast PS5 Controller Dual Charging Dock Station with 2 Type-C Connectors & LED Indicators",
                "itemNotes": "Charge 2 PS5 ControllersCharge up to 2 wireless ps5 controllers at the same time without having to connect them to your ps5 console, space saving and storage the two charger station dock for dualsense wireless controller. Fast PS5 Charging DockThis ps5 controller charging dock can fully charge 2 controllers at the same time 2-3 hours, and the type-c charge cable is included; please use the 5V/2A adapter to power the controller for playstation 5 LED Indicator Light & Intelligent ProtectionThe led indicator light of ps5 controller charger station show each controller's charge status. Green light - Full charged, Red light  Charging. The controller charger built in intelligent chip. You can safely charge the controller without worrying about overcharging Included 2 Charge Ports to Charge Quickly and Protect Controllers' InterfaceUse Type c ports for charging, making it easier to plug and unplug the controller, and effectively protect the controllers' charging interface from wear What You GetThe PS5 accessoreis package include a ps5 controller charger, 2 type-c connector & 1 type-c charger cable, also the ps5 controller charger has product support. Contact seller if any questions about ps5 controller charger, we will reply in 24 hours                 Read more               Read more               Read more                              PS5 Charger Station    PS5 Charger Station    PS5 Cooling Stand          DinoFire PS5 Controller Charger Station  Features:  Dual Charging Station This PS5 charging dock conveniently charges 2 controllers simultaneously.   Save Place This PS5 Charger Station provides an easy and quick way to charge and store your PS5 controllers.   Anti-Slip Base Anti-skid rubber pad keeps the charger in place, which protects your charging dock from shifting and falling.   Charge Time Full charge can be completed within 2.5 hours when charging one controller. Full charge 2 controllers simultaneously within 3 hours.  Packing List 1 x PS5 Controller Charger 1 x Charging Cable 2 x Dongles (Connector) 1 x User Manual ",
                "itemURL": "https://www.amazon.com/Controller-Compatible-Playstation-DinoFire-Connectors/dp/B08JG6R3RF/ref=sr_1_1_sspa?dchild=1&keywords=ps5+controller&qid=1614374616&s=videogames&sr=1-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExVDBHWUtYV0hDQlhaJmVuY3J5cHRlZElkPUEwNzE1MDczMUdIVkJVTzBWTlRMNiZlbmNyeXB0ZWRBZElkPUEwMjgzMzIzMVBOUk5VQVFHRThGVyZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU="
            }
            itemDetailSet(payload)
        }
    }, [query.data, query.status])


    const handleClosetPopup = () => {
        queryClient.setQueryData(['ItemDetails'], { display: false})    
    }


    if(query.data && query.data.display){

        return(
            <AnimatePresence>
                <motion.div id="ItemPopup"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}    
                >
                    {/* This is the item popup */}
                    <div id="itemContainer">
                            <button onClick={handleClosetPopup} id="close">Close</button>
                        {
                            itemDetail &&
                            <>
                            <div id="name">{itemDetail.itemName}</div>
                            <a href={itemDetail.itemURL} target="_"></a>
                            </>
                        }
                    </div>
                </motion.div>
            </AnimatePresence>
        )
    }else{
        return(
            <div id="none">
                empty
            </div>

        )
    }
    
    




}
export default ItemPopup