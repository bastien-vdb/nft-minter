import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Pictures from './Pictures';

function NftForm(props) {

    const [picture, setPicture] = useState(null);
    const [pictureUrl, setPictureUrl] = useState(null);
    
    const uploadNftPicture=(e)=>{
        const file = e.target?.files[0];
        setPictureUrl(URL.createObjectURL(file));
        setPicture(file);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '7em', flexWrap: 'wrap' }}>

            <div style={{ width: '45%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2em', margin: '2em' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em', justifyContent: 'center', alignItems: 'center', marginBottom: '5em' }}>
                    <p style={{ color: 'red' }}>Upload a picture (Format: png/jpg/jpeg)</p>
                    <Button variant="contained" component="label">
                        Upload
                        <input onChange={uploadNftPicture} hidden accept="image/*" multiple type="file" />
                    </Button>
                </div>

                <TextField id="outlined-basic" label="Name" variant="outlined" />
                <TextField id="outlined-basic" label="Description" variant="outlined" />
                <div style={{ display: 'flex', gap: '0.5em' }}>
                    <TextField id="outlined-basic" label="Propriété1: name" variant="outlined" />
                    <TextField id="outlined-basic" label="Propriété1: description" variant="outlined" />
                </div>
                <div style={{ display: 'flex', gap: '0.5em' }}>
                    <TextField id="outlined-basic" label="Propriété2: name" variant="outlined" />
                    <TextField id="outlined-basic" label="Propriété2: description" variant="outlined" />
                </div>

                <Button variant="contained" endIcon={<SendIcon />}>
                    Send
                </Button>
            </div>

            <div style={{ width: '45%', display: 'flex', height: '100%', margin: '2em', justifyContent: 'center', alignItems: 'center' }}>
                <Pictures picture={picture} pictureUrl={pictureUrl} />
            </div>

        </div>
    );
}

export default NftForm;