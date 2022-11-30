import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Pictures(props) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="fit-contain"
                image="questionPic2.png"
                alt="green iguana"
            />
            <CardContent style={{textAlign:'center'}}>
                <Typography gutterBottom variant="h5" component="div">
                    NFT picture
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This picture will be link into the metadata of the NFT
                </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    );
}

export default Pictures;