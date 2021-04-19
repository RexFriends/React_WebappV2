import React from 'react';
import { motion } from 'framer-motion';
import { Button, Checkbox, FormControlLabel, StylesProvider, TextField } from '@material-ui/core';
import { Close, LibraryAdd } from '@material-ui/icons';

export interface INewClosetTileProps {
    closetName: string,
    closetNameSet: React.Dispatch<React.SetStateAction<string>>,
    creatingCloset: boolean,
    handleEditCloset: (val: boolean) => void,
    isPublic: boolean,
    handlePublicChange: () => void,
    handleNewCloset: () => Promise<any>
}

function NewClosetTile(props: INewClosetTileProps): JSX.Element {
    const { closetName, closetNameSet, creatingCloset, handleEditCloset, isPublic, handlePublicChange, handleNewCloset } = props;

    return (
        <motion.div
            className="closet"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'tween', delay: 0.3 }}
            onClick={() => handleEditCloset(true)}
        >
            <div id="new-closet">
                {
                    creatingCloset ? (
                        <motion.div id='new-form'
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: "tween", delay: 0.2 }}
                        >
                            <Button
                                onClick={(e) => {handleEditCloset(false); e.stopPropagation();}}
                                style={{width: '30px', height: '30px', borderRadius: '100px', margin: '5px 0px 5px auto'}}
                            >
                                <Close style={{color: 'white', width: '30x', height: '30px'}} />
                            </Button>
                            <StylesProvider injectFirst>
                                <TextField
                                    id="text"
                                    style={{margin: 'auto auto 0px auto', color: '#fff'}}
                                    label='Closet Name'
                                    InputProps={{
                                        /* @ts-ignore */
                                        style: { color: '#fff', borderRadius: 50, borderBottomColor: '#fff', borderColor: '#fff' }
                                    }}
                                    value={closetName}
                                    onChange={(e) => {
                                        closetNameSet(e.target.value);
                                    }}
                                />
                            </StylesProvider>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isPublic}
                                        onChange={() => {handlePublicChange()}}
                                        name="checkedA"
                                        color="primary"
                                    />
                                }
                                label="Public"
                                style={{ color: 'white' }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                className="send-button"
                                style={{margin: '20px auto auto auto', height: '30px', width: '65px', backgroundColor: 'white', color: '#207c9d', borderRadius: 50, fontWeight: 600}}
                                onClick={() => handleNewCloset()}
                            >
                                Done
                            </Button>
                        </motion.div>
                    ) : (
                        <div id="content">
                            <LibraryAdd style={{color: "white", fontSize: 70, margin: "auto auto 0px auto"}} />
                            <span style={{margin: '5px auto auto auto', color: 'white', fontWeight: 'bold', fontSize: '24px'}}>New</span>
                        </div>
                    )
                }
            </div>
        </motion.div>
    );
}

export default NewClosetTile;
