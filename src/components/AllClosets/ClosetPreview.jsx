import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, IconButton } from "@material-ui/core";
import { Edit, FileCopy, MoreHoriz } from "@material-ui/icons";
import OptionsPopup from "../OptionsPopup/OptionsPopup";
import APIURL from "../../assets/URL";
import { copyFallback } from "../../util";
import { showAlert } from "../Alerts/Alerts";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import TextOverflow from "../TextOverflow/TextOverflow";

function ClosetPreview({ closet, updateClosets }) {
    const history = useHistory();
    const [showPopup, setShowPopup] = useState(false);
    const [hover, hoverSet] = useState(false);
    const [isPublic, isPublicSet] = useState(closet.is_public);
    const handleClosetView = (edit) => {
        history.push({ pathname: `/closets/${closet.id}`, state: { edit } });
    };

    const handleGetCopyLink = (e) => {
        e.stopPropagation();

        const link = `${APIURL}/closets/${closet.id}`;

        if (navigator.clipboard) {
            navigator.clipboard
                .writeText(link)
                .then(() => {
                    showAlert("Link copied to clipboard!", "success");
                })
                .catch((err) => {
                    console.error(err);
                    copyFallback(link);
                });
        } else copyFallback(link);
    };

    const handleDelete = () => {
        const rexUID = localStorage.getItem("rexUID");
        fetch(`${APIURL}/api/closet?uid=${rexUID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                closet_id: closet.id,
            }),
        })
            .then((res) => res.json())
            .then(() => {
                showAlert("Removed closet!", "success");
                updateClosets();
                setShowPopup(false);
            })
            .catch((err) => {
                console.error(err);
                showAlert("Removing closet failed!", "error");
            });
    };

    const updatePublic = (e) => {
        e.stopPropagation();

        const pub = !isPublic;
        isPublicSet(pub);
        const rexUID = localStorage.getItem("rexUID");
        const payload = {
            id: closet.id,
            closet_name: closet.closet_name,
            is_public: pub,
            closet_image_uri: closet.closet_icon ?? null,
            background_color: closet.color,
        };
        console.log("updated payload ", payload);

        fetch(`${APIURL}/api/update-closet?uid=${rexUID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((res) => res.json())
            .then(() => {
                showAlert("Updated public status!", "success");
                updateClosets();
            });
    };

    const closetId = `closet-${closet.id}`;

    return (
        <>
            <motion.div
                className="closet"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
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
                        src={closet.closet_icon}
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
                        style={{ backgroundColor: `#${closet.color}` }}
                    >
                        {/* <span id="name"></span> */}
                        <TextOverflow
                            id="name"
                            text={closet.closet_name}
                            overflowLength={25}
                        />

                        <IconButton
                            id={closetId}
                            className="options-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowPopup(true);
                            }}
                        >
                            <MoreHoriz
                                fontSize="large"
                                style={{
                                    color: "white",
                                    width: "30px",
                                    height: "30px",
                                }}
                            />
                        </IconButton>
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
                            height: "auto",
                            borderRadius: "100px",
                            margin: "10px 5px auto 135px",
                            fontWeight: 600,
                            position: "absolute",
                        }}
                    >
                        Share
                    </Button>
                )}
                <Button
                    onClick={updatePublic}
                    style={{
                        color: "white",
                        position: "absolute",
                        minWidth: "50px",
                        width: "50px",
                        height: "50px",
                        bottom: 0,
                        left: 0,
                        margin: "auto auto 7px 4px",
                        borderRadius: "100px",
                    }}
                >
                    {!isPublic ? (
                        <LockIcon
                            style={{
                                color: "white",
                                width: "30px",
                                height: "30px",
                            }}
                        />
                    ) : (
                        <LockOpenIcon
                            style={{
                                color: "white",
                                width: "30px",
                                height: "30px",
                            }}
                        />
                    )}
                </Button>
            </motion.div>
            <OptionsPopup
                anchorElementId={closetId}
                open={showPopup}
                onClose={() => setShowPopup(false)}
                buttons={[
                    {
                        text: "Edit Closet",
                        onClick: () => handleClosetView(true),
                        icon: <Edit />,
                    },
                    {
                        text: "Copy Link",
                        onClick: handleGetCopyLink,
                        icon: <FileCopy />,
                    },
                    {
                        text: "Remove Closet",
                        onClick: handleDelete,
                        isDelete: true,
                    },
                ]}
            />
        </>
    );
}

export default ClosetPreview;
