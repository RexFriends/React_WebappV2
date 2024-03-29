import React, { useEffect, useRef, useState } from "react";
import type { MouseEventHandler } from "react";
import {
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Popover,
    TextField,
} from "@material-ui/core";
import type { PopoverOrigin, PopoverPosition } from "@material-ui/core";
import {
    Cancel,
    Close,
    Dialpad,
    FileCopy,
    PersonAdd,
    Search,
    Send,
} from "@material-ui/icons";
import TextOverflow from "../TextOverflow/TextOverflow";
import { positionPopup } from "../../util";

export interface IFeedbackPopupProps {
    anchorElementId: string;
    open: boolean;
    onClose: () => void;
    handleGetCopyLink: MouseEventHandler;
    handleSearch: (event: object) => void;
    friends: Array<IFriend>;
    handleSendRequest: (id: number, isUser: boolean) => void;
    handleInvite: (
        nameInput: React.RefObject<HTMLElement>,
        phoneInput: React.RefObject<HTMLElement>
    ) => Promise<void>;
}

function FeedbackPopup(props: IFeedbackPopupProps): JSX.Element {
    const {
        anchorElementId,
        open,
        onClose,
        handleGetCopyLink,
        handleSearch,
        handleSendRequest,
        handleInvite,
        friends,
    } = props;
    const [position, setPosition] = useState<PopoverPosition>({
        top: 0,
        left: 0,
    });
    const [origin, setOrigin] = useState<PopoverOrigin>({
        vertical: "top",
        horizontal: "right",
    });
    const [invite, setInvite] = useState<boolean>(false);
    const nameInput = useRef<HTMLInputElement>(null);
    const phoneInput = useRef<HTMLInputElement>(null);

    const anchorElement = document.getElementById(anchorElementId);
    useEffect(() => {
        positionPopup(anchorElement, open, setOrigin, setPosition);
    }, [anchorElement, open]);

    const handleClose = () => {
        setInvite(false);
        onClose();
    };

    const handleCancel = () => {
        nameInput.current!.value = "";
        phoneInput.current!.value = "";
        setInvite(false);
    };

    const onInvite = () => {
        handleInvite(nameInput, phoneInput).then(() => {
            handleCancel();
        });
    };

    return (
        <Popover
            anchorEl={document.getElementById(anchorElementId)}
            anchorReference="anchorPosition"
            anchorPosition={position}
            transformOrigin={origin}
            PaperProps={{
                style: {
                    padding: "15px 0px 3px 15px",
                    borderRadius: 15,
                },
            }}
            open={open}
            onClose={handleClose}
        >
            <Grid direction="column" container>
                <Grid
                    justify="space-between"
                    alignItems="center"
                    wrap="nowrap"
                    container
                    item
                >
                    <Grid alignItems="center" container item>
                        <Grid item>
                            <IconButton onClick={handleClose}>
                                <Close />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <span style={{ fontSize: "18pt" }}>
                                Get Feedback!
                            </span>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={handleGetCopyLink}>
                            <FileCopy />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid
                    spacing={invite ? 1 : 2}
                    alignItems="center"
                    container
                    item
                >
                    <Grid item>
                        <TextField
                            variant="outlined"
                            InputProps={{
                                /* @ts-ignore */
                                startAdornment: (
                                    /* @ts-ignore */
                                    <InputAdornment style={{ marginRight: 5 }}>
                                        {invite ? <PersonAdd /> : <Search />}
                                    </InputAdornment>
                                ),
                                style: { height: 40, borderRadius: 15 },
                            }}
                            placeholder={invite ? "Name" : "Search for Users"}
                            onChange={invite ? () => null : handleSearch}
                            inputRef={nameInput}
                        />
                    </Grid>
                    {invite ? (
                        <Grid item>
                            <IconButton
                                className="round-button"
                                onClick={onInvite}
                            >
                                <Send />
                            </IconButton>
                            <IconButton
                                className="round-button"
                                onClick={handleCancel}
                            >
                                <Cancel />
                            </IconButton>
                        </Grid>
                    ) : (
                        <Grid item>
                            <Button
                                className="round-button"
                                onClick={() => setInvite(true)}
                                startIcon={<PersonAdd />}
                            >
                                Invite
                            </Button>
                        </Grid>
                    )}
                </Grid>
                {invite && (
                    <Grid style={{ marginTop: 5 }} item>
                        <TextField
                            variant="outlined"
                            InputProps={{
                                /* @ts-ignore */
                                startAdornment: (
                                    /* @ts-ignore */
                                    <InputAdornment style={{ marginRight: 5 }}>
                                        {<Dialpad />}
                                    </InputAdornment>
                                ),
                                style: { height: 40, borderRadius: 15 },
                            }}
                            placeholder="Phone Number"
                            inputRef={phoneInput}
                        />
                    </Grid>
                )}
                <Grid style={{ height: "30vh", maxHeight: 450, width: 350 }} item>
                    <div style={{ height: "98%", marginTop: "5px", overflowY: 'auto' }}>
                        {friends.map(f => (
                            <Grid key={f.id} style={{ width: "100%" }} item>
                                <Button className="contact-button">
                                    <Grid
                                        justify="space-between"
                                        alignItems="center"
                                        container
                                    >
                                        <Grid
                                            style={{ width: "auto" }}
                                            wrap="nowrap"
                                            alignItems="center"
                                            container
                                            item
                                        >
                                            <img
                                                style={{
                                                    height: 40,
                                                    width: 40,
                                                    paddingRight: 10,
                                                }}
                                                src={f.profile_image}
                                                alt="Profile"
                                            />
                                            <Grid
                                                direction="column"
                                                justify="center"
                                                alignItems="flex-start"
                                                container
                                                item
                                            >
                                                <TextOverflow
                                                    style={{
                                                        fontSize: "9pt",
                                                        fontWeight: "bold",
                                                    }}
                                                    text={
                                                        f.is_user
                                                            ? `${f.first_name} ${f.last_name}`
                                                            : f.name
                                                    }
                                                    overflowLength={15}
                                                />
                                                {
                                                    <span
                                                        style={{
                                                            fontSize: "8pt",
                                                        }}
                                                    >
                                                        {f.is_user
                                                            ? `@${f.username}`
                                                            : `(${f.phone_number.substring(
                                                                  0,
                                                                  3
                                                              )}) ${f.phone_number.substring(
                                                                  3,
                                                                  6
                                                              )}-${f.phone_number.substring(
                                                                  6
                                                              )}`}
                                                    </span>
                                                }
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Grid
                                                className="send-button"
                                                style={{
                                                    width: "80px",
                                                    height: "30px",
                                                    backgroundColor: "#14c4b2",
                                                    borderRadius: 50,
                                                    fontWeight: 600,
                                                    color: "white",
                                                    textTransform: "none",
                                                    marginRight: "0",
                                                    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
                                                }}
                                                onClick={() =>
                                                    handleSendRequest(
                                                        f.id,
                                                        f.is_user
                                                    )
                                                }
                                                justify="center"
                                                alignItems="center"
                                                container
                                                item
                                            >
                                                Send
                                                <Send style={{ marginLeft: 8, marginRight: -4, height: 20, width: 20 }}>Send</Send>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Button>
                            </Grid>
                        ))}
                    </div>
                </Grid>
            </Grid>
        </Popover>
    );
}

export default FeedbackPopup;
