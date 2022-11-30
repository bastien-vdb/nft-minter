import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import NftForm from '../NftForm/NftForm';
import './Pictures.css';

function Pictures() {

    const [hidePictureUpload, setHidePictureUpload] = useState(false);

    const [imageUrlIpfs, setImageUrlIpfs] = useState(''); //ipfs url be added to a json file and send to Pinata
    const [pictureUrl, setPictureUrl] = useState(null); //To show on our website
    const [picture, setPicture] = useState(null); //File to be sent to Pinata

    const handleSendPictureToIpfs = async () => {
        const formData = new FormData();
        formData.append('file', picture);

        try {
            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                    'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
                    'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
                    "Content-Type": "multipart/form-data"
                },
            });

            const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
            setImageUrlIpfs(ImgHash);
            setHidePictureUpload(true);
        }
        catch (error) {
            console.log('Erreur lors de l upload');
            console.log(error);
        }
    }

    const uploadNftPicture = (e) => {
        const file = e.target?.files[0];
        setPictureUrl(URL.createObjectURL(file));
        setPicture(file);
    }

    return (
        <>
            <div id='pictureContainer' style={{display: hidePictureUpload && 'none'}}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="fit-contain"
                        image={pictureUrl ? pictureUrl : "questionPic2.png"}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {picture?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            This picture will be link into the metadata of the NFT
                        </Typography>
                    </CardContent>

                    <div id='pictureButtonValidation'>
                        <p id='formatPictureMessage'>Upload a picture (Format: png/jpg/jpeg)</p>
                        <Button variant="contained" component="label">
                            Upload
                            <input onChange={uploadNftPicture} hidden accept="image/*" multiple type="file" />
                        </Button>
                    </div>
                </Card>

                {picture &&

                    <div>
                        <Button onClick={handleSendPictureToIpfs} variant="outlined" endIcon={<SendIcon />}>
                            Send the NFT on IPFS
                        </Button>
                    </div>
                }
            </div>

            {imageUrlIpfs && <NftForm imageUrlIpfs={imageUrlIpfs} pictureUrl={pictureUrl} />}
        </>
    );
}

export default Pictures;