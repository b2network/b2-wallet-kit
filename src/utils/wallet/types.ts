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
  WALLET_BYBIT_EVM = 'bybit_evm',
  WALLET_BYBIT_BTC = 'bybit_btc',
  WALLET_COIN98_BTC = 'coin98_btc',
  WALLET_COIN98_EVM = 'coin98_evm',
  WALLET_FOX_BTC = 'fox_btc',
  WALLET_FOX_EVM = 'fox_evm',
  WALLET_BITGET_EVM = 'bitget_evm',
  WALLET_BITGET_BTC = 'bitget_btc',
  WALLET_XVERSE = 'xverse',
  WALLET_TOKENPOCKET = 'tokenpocket',
  WALLET_BINANCE_EVM = 'binance_evm',
  WALLET_BINANCE_BTC = 'binance_btc'
}

export enum ChainType {
  ETH = 'eth',
  BTC = 'btc'
}