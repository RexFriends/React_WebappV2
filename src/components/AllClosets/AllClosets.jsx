import React, { useEffect, useState } from "react";
import APIURL from "../../assets/URL";
import "./AllClosets.scss";
import ClosetPreview from "./ClosetPreview";
import { AnimatePresence, motion } from "framer-motion";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { showAlert } from "../Alerts/Alerts";
import CloseIcon from "@material-ui/icons/Close";
import { StylesProvider } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import "./styles.css";
import Checkbox from "@material-ui/core/Checkbox";
import { SquareFoot } from "@material-ui/icons";
import Select from "@material-ui/core/Select";

import { BsOption } from "react-icons/bs";

function AllClosets() {
    const rexUID = localStorage.getItem("rexUID");
    const [closetData, closetDataSet] = useState(undefined);
    const [creatingCloset, creatingClosetSet] = useState(false);
    const [closetName, closetNameSet] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [sortType, sortTypeSet] = useState("newest");

    const fetchClosets = () => {
        fetch(`${APIURL}/api/closet_preview?uid=${rexUID}`)
            .then((res) => res.json())
            .then((json) => {
                console.log("closet preview ", json);
                const updatedData = json.closet_preview.filter(
                    (c) => c.closet_name !== "Saved Products"
                );

                closetDataSet(updatedData.sort((a, b) => a.id < b.id));
            });
    };

    useEffect(() => {
        fetchClosets();
    }, [rexUID]);

    async function handleNewCloset() {
        if (closetName.length === 0) {
            showAlert("Give your closet a name!", "error");
        } else {
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    closet_name: closetName,
                    is_public: isPublic,
                }),
            };
            try {
                const res = await fetch(
                    `${APIURL}/api/closet?uid=${rexUID}`,
                    requestOptions
                );
                const json = await res.json();
                console.log(json);
                if (json.success) {
                    showAlert("Closet Created!", "success");
                    creatingClosetSet(false);
                    fetchClosets();
                } else {
                    showAlert(`${json.reason}!`, "error");
                    return new Error(json.reason);
                }
            } catch (err) {
                //idk why successfull requests go here
                showAlert("Closet Created!", "success");
                creatingClosetSet(false);
                fetchClosets();
                closetNameSet("");
            }
        }
    }

    const handleEditCloset = (val) => {
        if (creatingCloset) {
            creatingClosetSet(val);
            closetNameSet("");
        } else {
            creatingClosetSet(val);
        }
    };

    const handlePublicChange = () => {
        setIsPublic(!isPublic);
    };

    const handleClosetSort = () => {
        switch (sortType) {
            case "newest":
                return closetData.sort((a, b) => a.id < b.id);

            case "oldest":
                return closetData.sort((a, b) => a.id > b.id);

            case "m#i":
                return closetData.sort(
                    (a, b) => a.items.length < b.items.length
                );
            case "l#i":
                return closetData.sort(
                    (a, b) => a.items.length > b.items.length
                );
            case "public":
                return closetData.filter((closet) => closet.is_public === true);
            case "private":
                return closetData.filter(
                    (closet) => closet.is_public === false
                );
            default:
                return closetData.sort((a, b) => a.id < b.id);
        }
    };

    return (
        <motion.div id="AllClosetsPage">
            <div id="top">
                <div id="title">All Closets</div>

                <div id="filters">
                    <Select
                        native
                        value={sortType}
                        onChange={(e) => {
                            console.log(e.target.value);
                            sortTypeSet(e.target.value);
                        }}
                    >
                        <optgroup label="Sort by">
                            <option value="newest">Most Recent</option>
                            <option value="oldest">Oldest</option>
                            <option value="m#i">Most # of items</option>
                            <option value="l#i">Least # of items</option>
                            <option disabled value="mpopular">
                                Most Popular
                            </option>
                            <option disabled value="lpopular">
                                Least Popular
                            </option>
                        </optgroup>
                        <optgroup label="Show only">
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </optgroup>
                    </Select>
                </div>
            </div>

            {closetData && (
                <motion.div id="closet-container" key={sortType}>
                    <motion.div
                        className="closet"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            type: "tween",
                            delay: 0.3,
                        }}
                        onClick={() => handleEditCloset(true)}
                    >
                        <div id="new-closet">
                            {creatingCloset ? (
                                <motion.div
                                    id="new-form"
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ type: "tween", delay: 0.2 }}
                                >
                                    <Button
                                        onClick={(e) => {
                                            handleEditCloset(false);
                                            e.stopPropagation();
                                        }}
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            borderRadius: "100px",
                                            margin: "5px 0px 5px auto",
                                        }}
                                    >
                                        <CloseIcon
                                            style={{
                                                color: "white",
                                                width: "30x",
                                                height: "30px",
                                            }}
                                        />
                                    </Button>
                                    <StylesProvider injectFirst>
                                        <TextField
                                            id="text"
                                            style={{
                                                margin: "auto auto 0px auto",
                                                color: "#fff",
                                            }}
                                            label="Closet Name"
                                            InputProps={{
                                                /* @ts-ignore */
                                                style: {
                                                    color: "#fff",
                                                    borderRadius: 50,
                                                    borderBottomColor: "#fff",
                                                    borderColor: "#fff",
                                                },
                                            }}
                                            value={closetName}
                                            onChange={(e) => {
                                                closetNameSet(e.target.value);
                                            }}
                                        ></TextField>
                                    </StylesProvider>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isPublic}
                                                onChange={() => {
                                                    handlePublicChange();
                                                }}
                                                name="checkedA"
                                                color="primary"
                                            />
                                        }
                                        label="Public"
                                        styles={{ color: "white" }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className="send-button"
                                        style={{
                                            margin: "20px auto auto auto",
                                            height: "30px",
                                            width: "65px",
                                            backgroundColor: "white",
                                            color: "#207c9d",
                                            borderRadius: 50,
                                            fontWeight: 600,
                                        }}
                                        onClick={() => handleNewCloset()}
                                    >
                                        Done
                                    </Button>
                                </motion.div>
                            ) : (
                                // <motion.div id='content'
                                //         initial={{ y: -100, opacity: 0 }}
                                //         animate={{ y: 0, opacity: 1 }}
                                //         transition={{ type: "tween", delay: 0.0 }}
                                //     >
                                //     <LibraryAddIcon style={{color: "white", fontSize: 70, margin: "auto auto 0px auto"}}/>
                                //     <span style={{margin: '5px auto auto auto', color: 'white', fontWeight: '700', fontSize: '24px'}}>New</span>
                                // </motion.div>
                                <div id="content">
                                    <LibraryAddIcon
                                        style={{
                                            color: "white",
                                            fontSize: 70,
                                            margin: "auto auto 0px auto",
                                        }}
                                    />
                                    <span
                                        style={{
                                            margin: "5px auto auto auto",
                                            color: "white",
                                            fontWeight: "700",
                                            fontSize: "24px",
                                        }}
                                    >
                                        New
                                    </span>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {handleClosetSort().map((c) => (
                        <ClosetPreview
                            closet={c}
                            updateClosets={fetchClosets}
                            key={c.id}
                        />
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
}

export default AllClosets;
