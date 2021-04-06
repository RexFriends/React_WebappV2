import React, { useEffect, useRef, useState } from 'react';
import type { MouseEventHandler } from 'react';
import { Button, Grid, IconButton, InputAdornment, Popover, TextField } from '@material-ui/core';
import type { PopoverOrigin, PopoverPosition } from '@material-ui/core';
import { Cancel, Close, FileCopy, PersonAdd, Search, Send } from '@material-ui/icons';
import TextOverflow from '../TextOverflow/TextOverflow';
import Scrollbars from 'react-custom-scrollbars';
import { positionPopup } from '../../util';

export interface IFeedbackPopupProps {
    anchorElementId: string,
    open: boolean,
    onClose: () => void,
    handleGetCopyLink: MouseEventHandler
    handleSearch: (event: object) => void,
    friends: Array<IFriend>,
    handleSendRequest: (id: number) => void,
    handleInvite: (ref: React.RefObject<HTMLElement>) => Promise<void>
}

function FeedbackPopup(props: IFeedbackPopupProps): JSX.Element {
    const { anchorElementId, open, onClose, handleGetCopyLink, handleSearch, handleSendRequest, handleInvite, friends } = props;
    const [position, setPosition] = useState<PopoverPosition>({ top: 0, left: 0 });
    const [origin, setOrigin] = useState<PopoverOrigin>({ vertical: 'top', horizontal: 'right' });
    const [invite, setInvite] = useState<boolean>(false);
    const phoneInput = useRef<HTMLElement>(null);

    const anchorElement = document.getElementById(anchorElementId);
    useEffect(() => {
        positionPopup(anchorElement, open, setOrigin, setPosition);
    }, [anchorElement, open]);

    const handleClose = () => {
        setInvite(false);
        onClose();
    };

    const handleCancel = () => {
        // @ts-ignore
        phoneInput.current.children[1].value = '';
        setInvite(false);
    };

    const onInvite = () => {
        handleInvite(phoneInput)
            .then(() => {
                handleCancel();
            });
    };

    return (
        <Popover
            anchorEl={document.getElementById(anchorElementId)}
            anchorReference="anchorPosition"
            anchorPosition={position}
            transformOrigin={origin}
            PaperProps={{ style: { padding: 15, borderRadius: 15 } }}
            open={open}
            onClose={handleClose}
        >
            <Grid direction="column" container>
                <Grid justify="space-between" alignItems="center" wrap="nowrap" container item>
                    <Grid alignItems="center" container item>
                        <Grid item>
                            <IconButton onClick={handleClose}><Close /></IconButton>
                        </Grid>
                        <Grid item>
                            <span style={{ fontSize: '18pt' }}>Get Feedback!</span>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={handleGetCopyLink}><FileCopy /></IconButton>
                    </Grid>
                </Grid>
                <Grid spacing={invite ? 1 : 2} alignItems="center" container item>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            InputProps={{
                                /* @ts-ignore */
                                startAdornment: <InputAdornment style={{ marginRight: 5 }}>{invite ? <PersonAdd /> : <Search />}</InputAdornment>,
                                style: { height: 40, borderRadius: 15 },
                                ref: phoneInput
                            }}
                            placeholder={invite ? 'Add Phone Number' : 'Search for Users'}
                            onChange={invite ? () => null : handleSearch}
                        />
                    </Grid>
                    {
                        invite ? (
                            <Grid item>
                                <IconButton className="round-button" onClick={onInvite}><Send /></IconButton>
                                <IconButton className="round-button" onClick={handleCancel}><Cancel /></IconButton>
                            </Grid>
                        ) : (
                            <Grid item>
                                <Button className="round-button" onClick={() => setInvite(true)} startIcon={<PersonAdd />}>Invite</Button>
                            </Grid>
                        )
                    }
                </Grid>
                <Grid style={{ height: '30vh', maxHeight: 350 }} item>
                    <Scrollbars style={{ height: '100%' }} autoHide>
                        {
                            friends.map((f, i) => (
                                <Grid key={i} style={{ width: '100%' }} item>
                                    <Button className="contact-button" onClick={() => handleSendRequest(f.id)}>
                                        <Grid justify="space-between" alignItems="center" container>
                                            <Grid style={{ width: 'auto' }} wrap="nowrap" alignItems="center" container item>
                                                <img style={{ height: 40, width: 40, paddingRight: 10 }} src={f.profile_image} alt="Profile" />
                                                <Grid direction="column" justify="center" alignItems="flex-start" container item>
                                                    <TextOverflow
                                                        style={{ fontSize: '9pt', fontWeight: 'bold' }}
                                                        text={f.is_user ? `${f.first_name} ${f.last_name}` : f.name}
                                                        overflowLength={26}
                                                    />
                                                    {
                                                        f.is_user ? (
                                                            <span style={{ fontSize: '8pt' }}>@{f.username}</span>
                                                        ) : null
                                                    }
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Send />
                                            </Grid>
                                        </Grid>
                                    </Button>
                                </Grid>
                            ))
                        }
                    </Scrollbars>
                </Grid>
            </Grid>
        </Popover>
    );
}

export default FeedbackPopup;
