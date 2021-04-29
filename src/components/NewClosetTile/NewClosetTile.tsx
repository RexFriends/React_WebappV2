import React from 'react';
import { motion } from 'framer-motion';
import { Button, Checkbox, FormControlLabel, StylesProvider, TextField, Tooltip,IconButton } from '@material-ui/core';
import { Close, LibraryAdd } from '@material-ui/icons';
import { withStyles, Theme, makeStyles } from '@material-ui/core/styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

export interface INewClosetTileProps {
    closetName: string,
    closetNameSet: React.Dispatch<React.SetStateAction<string>>,
    creatingCloset: boolean,
    handleEditCloset: (val: boolean) => void,
    isPublic: boolean,
    handlePublicChange: () => void,
    handleNewCloset: () => Promise<any>
}

const CssTextField = withStyles({
    root: {
        '& label.Mui': {
            color: 'red !important',
            },
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        "& .MuiInput-underline:hover:before": {
            borderBottomColor: "white !important"
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
            borderColor: 'white',
            },
            '&:hover fieldset': {
            borderColor: 'white',
            },
        },
    }
  })(TextField);


const CssCheckbox = withStyles({
    root: {
        color: 'white !important'
    }
})(Checkbox);

const LightTooltip = withStyles({
    tooltip: {
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: '0 rgba(0, 0, 0, .5);',
        fontSize: 11
    }
})(Tooltip);

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
                                <CssTextField
                                    id="text"
                                    style={{margin: 'auto auto 0px auto', color: '#fff'}}
                                    label='Closet Name'
                                    InputProps={{
                                        /* @ts-ignore */
                                        style: { color: 'white', borderRadius: 50, borderBottomColor: '#fff', borderColor: '#fff' }
                                    }}
                                    InputLabelProps={{
                                        style: {color: 'white'}
                                    }}
                                    value={closetName}
                                    onChange={(e) => {
                                        closetNameSet(e.target.value);
                                    }}
                                />
                            </StylesProvider>
                            {/* <div> */}
                                <FormControlLabel
                                    control={
                                        <CssCheckbox
                                            checked={isPublic}
                                            onChange={() => {handlePublicChange()}}
                                            name="checkedA"
                                        />
                                    }
                                    label="Public"
                                    style={{ color: 'white', marginLeft: '15px', fontFamily: 'baloo2'}}
                                />
                                {/* <LightTooltip title="Add"> */}
                                    {/* <Button styles={{marginTop: 'auto', marginBottom: 'auto'}}> */}
                                        {/* <InfoOutlinedIcon styles={{color: 'white'}}/> */}
                                    {/* </Button> */}
                                    {/* <Button>s</Button> */}
                                    
                                    {/* <Button>asdf</Button> */}
                                {/* </LightTooltip> */}
                            {/* </div> */}
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
