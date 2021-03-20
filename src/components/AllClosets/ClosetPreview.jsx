import React, {useState, useEffect} from 'react';



function ClosetPreview({closet}){
    const [imageData, imagesSet] = useState(undefined)

    let temp = []
    console.log("Render")
    closet.items.slice(0, 4).map(
        item => {
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
                    temp.push('data:image/jpeg;base64,' +base64)
                })
               
            }else{
                fetch(item.img).then(
                    res => res.json()
                ).then(json => 
                    temp.push(json.uri)
                )
            }
            if( temp !== []){
                imagesSet(temp)
            }
          
        }
    )


useEffect(() => {
    // console.log(images)
    // console.log(images)
    return () => {
    }
}, [imageData])

    return(
    <div id="closet">
       {imageData && 
        imageData[0] &&
        <>
            {imageData[0] && <img src={imageData[0]} id="img" alt="1" />}
            {imageData[1] && <img src={imageData[1]} id="img"  alt="2" />}
            {imageData[2] && <img src={imageData[2]} id="img"  alt="3" />}
            {imageData[3] && <img src={imageData[3]} id="img"  alt="4" />}
        </>
        }
        <div id="closet-name">{closet.closet_name}</div>
    </div>
    )
}

export default ClosetPreview