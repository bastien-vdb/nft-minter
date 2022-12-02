import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import './NftForm.css';

function NftForm({ imageUrlIpfs, pictureUrl, imageUrlUrl }) {

    const fieldName = useRef(null);
    const fieldDescription = useRef(null);
    const fieldPropriete1 = useRef(null);
    const fieldPropriete1Description = useRef(null);

    const [tokenUri, setTokenUri] = useState('');
    const [tokenUriToVisit, setTokenUriToVisit] = useState('');

    const handleSend = async (e) => {

        e.preventDefault();
        console.log(fieldName.current.value);

        //make metadata
        const metadata = {
            name: fieldName.current.value,
            image: imageUrlIpfs,
            description: fieldDescription.current.value,
            date: Date.now(),
            attributes: [
                {
                    trait_type: fieldPropriete1Description.current.value,
                    value: "Orangus"
                }]
        }

        console.log('metadata', metadata);

        const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
        //making axios POST request to Pinata ⬇️
        return axios
            .post(url, metadata, {
                headers: {
                    pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
                    pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
                }
            })
            .then(function (response) {

                const uriToVisit = "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash;
                const uriToMint = "ipfs://" + response.data.IpfsHash;
                setTokenUri(uriToMint);
                setTokenUriToVisit(uriToMint);

            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <div id='NftFormContainer'>
            <form onSubmit={handleSend}>
                <img src={pictureUrl} alt='nft picture' />
                <TextField inputRef={fieldName} id="outlined-basic" label="Name" variant="outlined" />
                <TextField inputRef={fieldDescription} id="outlined-basic" label="Description" variant="outlined" />
                ipfs: {imageUrlIpfs}
                <div id='nftFormButtonValidation'>
                    <TextField inputRef={fieldPropriete1} id="outlined-basic" label="Propriété1: name" variant="outlined" />
                    <TextField inputRef={fieldPropriete1Description} id="outlined-basic" label="Propriété1: description" variant="outlined" />
                </div>

                <Button type='submit' variant="contained" endIcon={<SendIcon />}>
                    Send
                </Button>
                {tokenUriToVisit &&
                    <div>
                        <p>TokenUri: <a href={tokenUriToVisit}>{tokenUriToVisit}</a></p>
                        <p>Image: <a href={imageUrlUrl}>{imageUrlUrl}</a></p>
                    </div>
                }
            </form>
        </div>
    );
}

export default NftForm;