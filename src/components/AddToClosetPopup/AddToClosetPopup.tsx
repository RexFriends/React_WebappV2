import React, { useEffect, useState } from 'react';
import { Grid, Popover } from '@material-ui/core';
import type { PopoverOrigin, PopoverPosition } from '@material-ui/core';
import { positionPopup } from '../../util';

export interface IAddToClosetPopupProps {
    anchorElementId: string,
    open: boolean,
    onClose: () => void
}

function AddToClosetPopup(props: IAddToClosetPopupProps): React.ReactNode {
    const { anchorElementId, open, onClose } = props;
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

            </Grid>
        </Popover>
    );
}

export default AddToClosetPopup;
