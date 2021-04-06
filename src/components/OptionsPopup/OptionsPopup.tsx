import React, { useEffect, useState } from 'react';
import './OptionsPopup.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Button, Divider, Grid, Popover } from '@material-ui/core';
import type { PopoverOrigin, PopoverPosition } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { positionPopup } from '../../util';

export interface IButton {
    text: string,
    onClick: React.MouseEventHandler,
    icon?: JSX.Element,
    isDelete?: boolean
}

export interface IOptionsPopupProps {
    anchorElementId: string,
    open: boolean,
    onClose: () => void,
    buttons: Array<IButton>
}

function OptionsPopup({ anchorElementId, open, onClose, buttons }: IOptionsPopupProps): JSX.Element {
    const [position, setPosition] = useState<PopoverPosition>({ top: 0, left: 0 });
    const [origin, setOrigin] = useState<PopoverOrigin>({ vertical: 'top', horizontal: 'right' });

    const anchorElement = document.getElementById(anchorElementId);
    useEffect(() => {
        positionPopup(anchorElement, open, setOrigin, setPosition);
    }, [anchorElement, open]);

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
                <Grid item>
                    <span style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '15px' }}>Options</span>
                </Grid>
                <Grid style={{ margin: '10px 0 10px -15px', width: 'calc(100% + 30px)' }} item>
                    <Divider />
                </Grid>
                {
                    buttons.map((b, i) => (
                        <Grid style={{ width: '100%' }} key={i} item>
                            <Button
                                className={b.isDelete ? "round-button options-popup-button delete-button" : "round-button options-popup-button"}
                                onClick={b.onClick}
                                startIcon={b.isDelete ? <Delete /> : b.icon}
                            >
                                {b.text}
                            </Button>
                        </Grid>
                    ))
                }
            </Grid>
        </Popover>
    );
}

export default OptionsPopup;
