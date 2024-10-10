
import { WalletMetadata } from '@particle-network/btc-connectkit/dist/connector/base';
import { InjectedConnector } from '@particle-network/btc-connectkit';

export class TomoConnector extends InjectedConnector {
  readonly metadata: WalletMetadata = {
    id: 'tomo',
    name: 'Tomo Wallet',
    icon: 'https://b2-static.bsquared.network/wallet/tomo.png',
    downloadUrl: 'https://www.okx.com/download',
  };
  constructor() {
    super('tomo_btc');
  }
}