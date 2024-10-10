
import { WalletMetadata } from '@particle-network/btc-connectkit/dist/connector/base';
import { InjectedConnector } from '@particle-network/btc-connectkit';

export class FoxConnector extends InjectedConnector {
  readonly metadata: WalletMetadata = {
    id: 'fox',
    name: 'Fox Wallet',
    icon: 'https://b2-static.bsquared.network/wallet/icon_fox.png',
    downloadUrl: 'https://foxwallet.com/download',
  };
  constructor() {
    super('foxwallet.bitcoin');
  }
}