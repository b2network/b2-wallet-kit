
import { WalletMetadata } from '@particle-network/btc-connectkit/dist/connector/base';
import { InjectedConnector } from '@particle-network/btc-connectkit';

export class Coin98Connector extends InjectedConnector {
  readonly metadata: WalletMetadata = {
    id: 'coin98',
    name: 'Coin98 Wallet',
    icon: 'https://b2-static.bsquared.network/wallet/icon_coin98.svg',
    downloadUrl: 'https://coin98.com/wallet',
  };
  constructor() {
    super('coin98.bitcoin');
  }
}