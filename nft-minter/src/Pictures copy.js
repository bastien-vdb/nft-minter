import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function Pictures({picture, pictureUrl}) {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="fit-contain"
                image={pictureUrl? pictureUrl : "questionPic2.png"}
                alt="green iguana"
            />
            <CardContent style={{textAlign:'center'}}>
                <Typography gutterBottom variant="h5" component="div">
                    {picture?.name}
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