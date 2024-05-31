export enum BtcConnectorName {
  Unisat = 'Unisat',
  OKX = 'OKX',
  Tomo = 'Tomo'
}
export type Network = 'livenet' | 'testnet'

export type InstalledMap = Record<WalletTypes, boolean>
export enum WalletCollection {
  BTC = 'btc',
  ETH = 'eth',
  ALL = 'all'
}

export enum WalletTypes {
  WALLET_METAMASK = 'metamask',
  WALLET_UNISAT = 'unisat',
  WALLET_OKX_EVM = 'okx_evm',
  WALLET_OKX_BTC = 'okx_btc',
  WALLET_GATE = 'gate',
  WALLET_TOMO_EVM = 'tomo_evm',
  WALLET_TOMO_BTC = 'tomo_btc',
  WALLET_BYBIT_EVM = 'bybit_evm'
}

export enum ChainType {
  ETH = 'eth',
  BTC = 'btc'
}