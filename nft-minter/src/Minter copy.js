import * as React from 'react';
import NftForm from './NftForm';

export default function Minter() {
    return (
        <div style={{display:'flex'}}>
            <div style={{backgroundColor:'white', width:'100%'}}>
                <NftForm/>
            </div>
        </div>
    );
}