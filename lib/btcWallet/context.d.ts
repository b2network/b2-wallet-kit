import React from 'react';
import { BtcConnectorName, Network } from './types';
import { Connector } from './connectors/types';
import { WalletTypes } from '../types/types';
export type SendBtcParams = {
    from?: string;
    to: string;
    amount: string;
};
type B2BtcProviderProps = {
    children: React.ReactNode;
};
export declare const B2BtcProvider: ({ children }: B2BtcProviderProps) => import("react/jsx-runtime").JSX.Element;
export declare const useBtc: () => {
    ethAddress: `0x${string}` | undefined;
    connect: (connectorName: BtcConnectorName) => Promise<boolean>;
    disconnect: () => void;
    connector: Connector | undefined;
    signMessage: (message?: string) => Promise<string | undefined>;
    provider: any;
    sendBitcoin: (params: SendBtcParams) => Promise<string | {
        txhash: string;
    } | undefined>;
    setCurrentWallet: (w: WalletTypes | undefined) => void;
    isConnecting: boolean;
    isConnected: boolean;
    address?: string | undefined;
    publicKey?: string | undefined;
    connectorName?: BtcConnectorName | undefined;
    network?: Network | undefined;
    currentWallet?: WalletTypes | undefined;
};
export {};
