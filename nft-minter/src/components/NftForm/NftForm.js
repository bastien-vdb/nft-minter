import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import './NftForm.css';
import { sendNftToPinata } from '../../hooks/useNftForm';
import { useContractWrite, useAddress, useSDK } from '@thirdweb-dev/react';
import abi from '../../SmartContractABI.json';

function NftForm({ imageUrlIpfs, pictureUrl, imageUrlUrl }) {

    const [contrat, setContrat] = useState(null);

    const sdk = useSDK();


    const addressConnected = useAddress();

    const { mutateAsync: mintTo } = useContractWrite(contrat, "mintTo");

    useEffect(() => {

        getMonContrat();
        console.log(contrat)
    }, [contrat])

    const getMonContrat = async () => {
        const contract = await sdk.getContractFromAbi("0xC2817C822957e322B9296621E0d7d7a57C10f7d2", abi);
        setContrat(contract);
    }



    const fieldName = useRef(null);
    const fieldDescription = useRef(null);
    const fieldPropriete1 = useRef(null);
    const fieldPropriete1Description = useRef(null);
    const fieldPropriete2 = useRef(null);
    const fieldPropriete2Description = useRef(null);

    const [tx, setTx] = useState(null);
    const [tokenUriToVisit, setTokenUriToVisit] = useState(null);
    const [error, setError] = useState(null);

    const handleSend = async (e) => {

        e.preventDefault();

        //make metadata
        const metadata = {
            name: fieldName.current.value,
            image: imageUrlIpfs,
            description: fieldDescription.current.value,
            date: Date.now(),
            attributes: [
                {
                    trait_type: fieldPropriete1.current.value,
                    value: fieldPropriete1Description.current.value
                },
                {
                    trait_type: fieldPropriete2.current.value,
                    value: fieldPropriete2Description.current.value
                },
            ]
        }

        const { uriToVisit, uriToMint, error } = await sendNftToPinata(metadata);
        setTokenUriToVisit(uriToVisit);
        setError(error);

        //connection to the Smart contract here
        getMint(uriToMint);
    }

    const getMint = async (uriToMint) => {
        console.log(contrat);
        await mintTo([addressConnected, uriToMint])
            .then(response => {
                console.log(response);
                setTx(response);
            })
            .catch(err => console.log(err));
    }

    return (
        <div id='NftFormContainer'>
            <form onSubmit={handleSend}>
                <img src={pictureUrl} alt='nft picture' />
                <TextField inputRef={fieldName} id="outlined-basic" label="Name" variant="outlined" />
                <TextField inputRef={fieldDescription} id="outlined-basic" label="Description" variant="outlined" />
                ipfs: {imageUrlIpfs}
                <div className='nftFormButtonValidation'>
                    <TextField inputRef={fieldPropriete1} id="outlined-basic" label="Propriété1: name" variant="outlined" />
                    <TextField inputRef={fieldPropriete1Description} id="outlined-basic" label="Propriété1: description" variant="outlined" />
                </div>
                <div className='nftFormButtonValidation'>
                    <TextField inputRef={fieldPropriete2} id="outlined-basic" label="Propriété2: name" variant="outlined" />
                    <TextField inputRef={fieldPropriete2Description} id="outlined-basic" label="Propriété2: description" variant="outlined" />
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
                {tx && tx.receipt.transactionHash}
                {error && error}
            </form>
        </div>
    );
}

export default NftForm;