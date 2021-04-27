import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@material-ui/core";
import APIURL from "../../assets/URL";
import { copyFallback } from "../../util";
import { showAlert } from "../Alerts/Alerts";

function ClosetPreview({ closet }) {
    const history = useHistory();
    const [hover, hoverSet] = useState(false);

    const handleClosetView = (edit) => {
        history.push({ pathname: `/closets/${closet.id}`, state: { edit } });
    };

    const handleGetCopyLink = (e) => {
        e.stopPropagation();
        const link = `https://app.rexfriends.com/closets/${closet.id}`;

        if (navigator.clipboard) {
            navigator.clipboard
                .writeText(link)
                .then(() => {
                    showAlert("Copied link!", "success");
                })
                .catch((err) => {
                    console.error(err);
                    copyFallback(link);
                });
        } else copyFallback(link);
    };

    return (
        <>
            <motion.div
                className="closet"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{ textAlign: "left" }}
                onMouseEnter={() => hoverSet(true)}
                onMouseLeave={() => hoverSet(false)}
                transition={{
                    type: "tween",
                    delay: 0.3,
                }}
                onClick={() => handleClosetView(false)}
            >
                {closet.closet_icon ? (
                    <img
                        src={closet.closet_image}
                        style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                            borderRadius: "10px",
                        }}
                        id="closet-icon"
                        alt="closet-icon"
                    />
                ) : (
                    <div
                        id="stock-closet-image"
                        style={{
                            backgroundColor: `#${closet.background_color}`,
                        }}
                    >
                        <span id="name">{closet.closet_name}</span>
                    </div>
                )}

                {hover && (
                    <Button
                        className="share-buton"
                        onClick={handleGetCopyLink}
                        style={{
                            backgroundColor: "#14c4b2",
                            color: "white",
                            width: "60px",
                            height: "30px",
                            borderRadius: "100px",
                            top: 0,
                            right: 0,
                            marginTop: 10,
                            marginRight: 10,
                            fontWeight: 600,
                            position: "absolute",
                            textTransform: "none"
                        }}
                    >
                        Share
                    </Button>
                )}
            </motion.div>
        </>
    );
}

export default ClosetPreview;
