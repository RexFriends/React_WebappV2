import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Grid, Popover } from '@material-ui/core';
import type { PopoverOrigin, PopoverPosition } from '@material-ui/core';
import { AddToPhotos } from '@material-ui/icons';
import { positionPopup } from '../../util';
import APIURL from '../../assets/URL';
import { showAlert } from '../Alerts/Alerts';

export interface IAddToClosetPopupProps {
    anchorElementId: string,
    open: boolean,
    onClose: () => void,
    item: IProduct,
    updateProducts: () => void
}

let originalClosetsChecked: Array<boolean> = [];

function AddToClosetPopup(props: IAddToClosetPopupProps): JSX.Element {
    const { anchorElementId, open, onClose, item, updateProducts } = props;
    const [position, setPosition] = useState<PopoverPosition>({ top: 0, left: 0 });
    const [origin, setOrigin] = useState<PopoverOrigin>({ vertical: 'top', horizontal: 'right' });
    const [closets, setClosets] = useState<Array<ICloset>>([]);
    const [closetsChecked, setClosetsChecked] = useState<Array<boolean>>([]);

    const anchorElement = document.getElementById(anchorElementId);
    useEffect(() => {
        positionPopup(anchorElement, open, setOrigin, setPosition);
    }, [anchorElement, open]);

    const fetchClosets = () => {
        const rexUID = localStorage.getItem('rexUID');
        fetch(`${APIURL}/api/closet_preview?uid=${rexUID}`)
            .then(res => res.json())
            .then(json => {
                    setClosets(json.closet_preview);
                    const checked = json.closet_preview.map((c: ICloset) => c.items.some(i => i.product_id === item.id));
                    if (!originalClosetsChecked.length) originalClosetsChecked = checked;
                    setClosetsChecked(Array.from(checked));
                }
            );
    };

    useEffect(() => {
        fetchClosets();
    }, []);

    const handleChange = (event: { target: HTMLInputElement }) => {
        const checked = Array.from(closetsChecked);
        checked[Number.parseInt(event.target.name)] = event.target.checked;
        setClosetsChecked(checked);
    };

    const handleAdd = () => {
        const promises: Array<Promise<object>> = [];
        originalClosetsChecked.forEach((oc, i) => {
            const c = closetsChecked[i];
            if (oc !== c) {
                const rexUID = localStorage.getItem('rexUID');
                promises.push(fetch(`${APIURL}/api/item_closet_change?uid=${rexUID}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        closet_id: closets[i].id,
                        product_id: item.id,
                        new_state: c
                    })
                }));
            }
        });

        Promise.all(promises)
            .then(() => {
                showAlert('Updated closets!', 'success');
                onClose();
            })
            .catch(err => {
                console.error(err);
                showAlert('Updating closets failed!', 'error');
            })
            .finally(() => {
                originalClosetsChecked = [];
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
            <Grid direction="column" container>
                {
                    closets.map((c, i) => (
                        <Grid key={i} alignItems="center" container item>
                            <Checkbox name={i.toString()} checked={closetsChecked[i]} onChange={handleChange} />
                            <span>{c.closet_name}</span>
                        </Grid>
                    ))
                }
                <Button className="round-button" startIcon={<AddToPhotos />} onClick={handleAdd}>Add</Button>
            </Grid>
        </Popover>
    );
}

export default AddToClosetPopup;
