import React, { useEffect, useState } from "react";
import { Button, Checkbox, Divider, Grid, Popover } from "@material-ui/core";
import type { PopoverOrigin, PopoverPosition } from "@material-ui/core";
import { Done } from "@material-ui/icons";
import { positionPopup } from "../../util";
import APIURL from "../../assets/URL";
import { showAlert } from "../Alerts/Alerts";

export interface IAddToClosetPopupProps {
    anchorElementId: string;
    open: boolean;
    onClose: () => void;
    item: IProduct;
    updateProducts: () => void;
}

interface CheckedMap {
    [id: number]: boolean
}

function AddToClosetPopup(props: IAddToClosetPopupProps): JSX.Element {
    const { anchorElementId, open, onClose, item, updateProducts } = props;
    const [position, setPosition] = useState<PopoverPosition>({
        top: 0,
        left: 0,
    });
    const [origin, setOrigin] = useState<PopoverOrigin>({
        vertical: "top",
        horizontal: "right",
    });
    const [closets, setClosets] = useState<Array<ICloset>>([]);
    const [closetsChecked, setClosetsChecked] = useState<CheckedMap>({});

    const anchorElement = document.getElementById(anchorElementId);
    useEffect(() => {
        positionPopup(anchorElement, open, setOrigin, setPosition);
    }, [anchorElement, open]);

    const fetchClosets = () => {
        const rexUID = localStorage.getItem("rexUID");
        fetch(`${APIURL}/api/closet_preview?uid=${rexUID}`)
            .then((res) => res.json())
            .then((json) => {
                const closets: Array<ICloset> = json.closet_preview.filter((c: ICloset) => c.closet_name !== 'Saved Products');
                setClosets(closets);
                const checked = closets.reduce((acc: CheckedMap, c: ICloset) => {
                    acc[c.id] = c.items.some(i => i.product_id === item.id);
                    return acc;
                }, {});
                setClosetsChecked(checked);
            });
    };

    useEffect(() => {
        fetchClosets();
    }, []);

    const handleChange = (event: { target: HTMLInputElement }) => {
        const checked = Object.assign({}, closetsChecked);
        checked[Number.parseInt(event.target.name)] = event.target.checked;
        setClosetsChecked(checked);
    };

    const handleAdd = () => {
        const promises = Object.entries(closetsChecked)
            .reduce((acc: Array<Promise<Response>>, [keyStr, c]) => {
                const key = Number.parseInt(keyStr);
                const closetContainsItem = closets.filter(c => c.id === key)[0].items
                    .some(i => i.product_id === item.id);

                if ((c && !closetContainsItem) || (!c && closetContainsItem)) {
                    const rexUID = localStorage.getItem("rexUID");
                    acc.push(fetch(`${APIURL}/api/item_closet_change?uid=${rexUID}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            closet_id: key,
                            product_id: item.id,
                            new_state: c,
                        })
                    }));
                }

                return acc;
            }, []);

        Promise.all(promises)
            .then(() => {
                showAlert("Updated closets!", "success");
                onClose();
            })
            .catch((err) => {
                console.error(err);
                showAlert("Updating closets failed!", "error");
            })
            .finally(() => {
                fetchClosets();
                updateProducts();
            });
    };

    return (
        <Popover
            anchorEl={anchorElement}
            anchorReference="anchorPosition"
            anchorPosition={position}
            transformOrigin={origin}
            PaperProps={{ style: { padding: 15, borderRadius: 15 } }}
            open={open}
            onClose={onClose}
        >
            <Grid
                alignItems="center"
                direction="column"
                container
                id="PopOverGrid"
                style={{ alignContent: "center" }}
            >
                <Grid item id="grid">
                    <span
                        style={{
                            fontWeight: "bold",
                            fontSize: "15px",
                        }}
                    >
                        Add to Closet
                    </span>
                </Grid>
                <Grid
                    style={{
                        margin: "10px 0 ",
                        width: "calc(100% + 30px)",
                    }}
                    item
                >
                    <Divider />
                </Grid>
                <div style={{ height: 100, overflowY: "auto" }}>
                    {
                        closets.map(c => (
                            <Grid key={c.id} alignItems="center" container item>
                                <Grid item>
                                    <Checkbox
                                        style={{
                                            margin: "0 12px 0 0",
                                            padding: 0,
                                        }}
                                        name={c.id.toString()}
                                        checked={closetsChecked[c.id]}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item style={{ minWidth: 150 }}>
                                    <span>{c.closet_name}</span>
                                </Grid>
                            </Grid>
                        ))
                    }
                </div>
                <Button
                    className="round-button"
                    style={{
                        marginTop: 10,
                        width: "70%",
                        backgroundColor: "#14c4b2",
                        fontWeight: "bold",
                        color: "#ffffff",
                    }}
                    startIcon={<Done />}
                    onClick={handleAdd}
                    variant="contained"
                >
                    Update
                </Button>
            </Grid>
        </Popover>
    );
}

export default AddToClosetPopup;
