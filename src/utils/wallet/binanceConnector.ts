
import { WalletMetadata } from '@particle-network/btc-connectkit/dist/connector/base';
import { InjectedConnector } from '@particle-network/btc-connectkit';

export class BinanceConnector extends InjectedConnector {
  readonly metadata: WalletMetadata = {
    id: 'binance',
    name: 'Binance Wallet',
    icon: 'https://b2-static.bsquared.network/wallet/icon_binance.svg',
    downloadUrl: 'https://www.binance.com/en/download',
  };
  constructor() {
    super('binancew3w.bitcoin');
  }
}