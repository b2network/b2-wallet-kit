import { BtcConnectorName, Network } from '../types';
import { AccountsChangedHandler, Connector, ConnectorOptions, DisconnectHandler, NetworkChangedHandler } from './types';
export declare class OkxConnector implements Connector {
    name: BtcConnectorName;
    address?: string;
    publicKey?: string;
    onAccountsChanged?: AccountsChangedHandler;
    onNetworkChanged?: NetworkChangedHandler;
    onDisconnect?: DisconnectHandler;
    constructor(options?: ConnectorOptions);
    getProvider(): any;
    connect(): Promise<{
        address: string;
        publicKey: string;
        network: Network;
    }>;
    disconnect(): void;
    signMessage: (message?: string) => Promise<string>;
    sendBitcoin: (params: any) => Promise<string | {
        txhash: string;
    }>;
}
