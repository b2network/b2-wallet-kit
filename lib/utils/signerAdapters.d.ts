import { Connector as BTCConnector } from '../btcWallet/connectors/types';
import { SmartAccountSigner } from '@b2network/aa-sdk';
import { WalletClient } from 'viem';
export declare const convertWalletClientToAccountSigner: (client: WalletClient | null) => SmartAccountSigner;
export declare const convertBTCConnectorToAccountSigner: (connector: BTCConnector | null) => SmartAccountSigner;
