import * as React from 'react';
import './Minter.css';
import Pictures from '../Pictures/Pictures';
import { ConnectWallet, useAddress, useDisconnect } from "@thirdweb-dev/react";

export default function Minter() {

    const addressConnected = useAddress();
    const disconnect = useDisconnect();

    return (
        <div id='authentification'>
            {addressConnected ?
                <div>
                    <Pictures />
                    <button id='walletDisconnectButton' onClick={disconnect}>Disconnect</button>
                </div>
                :
                <div>
                    <ConnectWallet />
                    Please connect your Wallet
                </div>
            }
        </div >
    );
}