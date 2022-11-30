import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Pictures from './Pictures';

function NftForm(props) {

    const [picture, setPicture] = useState(null);
    const [pictureUrl, setPictureUrl] = useState(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrlIpfs, setImageUrlIpfs] = useState('');
    const [propriete1, setPropriete1] = useState('');
    const [propriete1Description, setPropriete1Description] = useState('');

    const fieldName = useRef(null);
    const fieldDescription = useRef(null);
    const fieldImageUrlIpfs = useRef(null);
    const fieldPropriete1 = useRef(null);
    const fieldPropriete1Description = useRef(null);
    
    const uploadNftPicture=(e)=>{
        const file = e.target?.files[0];
        setPictureUrl(URL.createObjectURL(file));
        setPicture(file);
    }

    const handleSend = async()=>{
        console.log(fieldName.current.value);
        setName(fieldName.current.value);
        setDescription(fieldDescription.current.value);
        setImageUrlIpfs(fieldImageUrlIpfs.current.value);
        setPropriete1(fieldPropriete1.current.value);
        setPropriete1Description(fieldPropriete1Description.current.value);
    }

    useEffect(()=>{
        console.log(name, description, imageUrlIpfs, propriete1, propriete1Description);
    },[name, description, imageUrlIpfs, propriete1, propriete1Description]);

    const handleSendPictureToIpfs = async()=>{

    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '7em', flexWrap: 'wrap' }}>

            <form style={{ width: '45%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2em', margin: '2em' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em', justifyContent: 'center', alignItems: 'center', marginBottom: '5em' }}>
                    <p style={{ color: 'red' }}>Upload a picture (Format: png/jpg/jpeg)</p>
                    <Button variant="contained" component="label">
                        Upload
                        <input onChange={uploadNftPicture} hidden accept="image/*" multiple type="file" />
                    </Button>
                </div>

                <TextField inputRef={fieldName} id="outlined-basic" label="Name" variant="outlined" />
                <TextField inputRef={fieldDescription} id="outlined-basic" label="Description" variant="outlined" />
                <TextField inputRef={fieldImageUrlIpfs} id="outlined-basic" label="ipfs url of the picture" variant="outlined" />
                <div style={{ display: 'flex', gap: '0.5em' }}>
                    <TextField inputRef={fieldPropriete1} id="outlined-basic" label="Propriété1: name" variant="outlined" />
                    <TextField inputRef={fieldPropriete1Description} id="outlined-basic" label="Propriété1: description" variant="outlined" />
                </div>

                <Button onClick={handleSend} variant="contained" endIcon={<SendIcon />}>
                    Send
                </Button>
            </form>

            <div style={{ width: '45%', display: 'flex', height: '100%', margin: '2em', justifyContent: 'center', alignItems: 'center' }}>
                <Pictures picture={picture} pictureUrl={pictureUrl} />
            </div>

            {picture && <Button onClick={handleSendPictureToIpfs} variant="outlined" endIcon={<SendIcon />}>
                    Send the NFT on IPFS
            </Button>}

        </div>
    );
}

export default NftForm;