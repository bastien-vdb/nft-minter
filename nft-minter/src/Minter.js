import * as React from 'react';
import Pictures from './Pictures/Pictures';

export default function Minter() {
    return (
        <div style={{display:'flex'}}>
            <div style={{backgroundColor:'white', width:'100%'}}>
                <Pictures/>
            </div>
        </div>
    );
}