import { WalletTypes } from "./types";
import { isMobile } from 'react-device-detect'

export type InstalledObj = Record<WalletTypes, boolean>
export type EvmConnectorName = 'gate' | 'metamask' | 'bybit' | 'okx' | 'fox' | 'tokenpocket' | 'bitget' | 'binance' | 'tomo' | 'coin98'

export const BtcWalletArr = [
  WalletTypes.WALLET_OKX_BTC,
  WalletTypes.WALLET_TOMO_BTC,
  WalletTypes.WALLET_UNISAT,
  WalletTypes.WALLET_BYBIT_BTC,
  WalletTypes.WALLET_COIN98_BTC,
  WalletTypes.WALLET_FOX_BTC,
  WalletTypes.WALLET_BITGET_BTC,
  WalletTypes.WALLET_BINANCE_BTC,
  WalletTypes.WALLET_XVERSE,
  WalletTypes.WALLET_GATE_BTC
]
export const EvmWalletArr = [
  WalletTypes.WALLET_GATE,
  WalletTypes.WALLET_METAMASK,
  WalletTypes.WALLET_BYBIT_EVM,
  WalletTypes.WALLET_OKX_EVM,
  WalletTypes.WALLET_TOMO_EVM,
  WalletTypes.WALLET_COIN98_EVM,
  WalletTypes.WALLET_FOX_EVM,
  WalletTypes.WALLET_BITGET_EVM,
  WalletTypes.WALLET_TOKENPOCKET,
  WalletTypes.WALLET_BINANCE_EVM
]
export const defaultInstalledMap: InstalledObj = {
  metamask: false,
  unisat: false,
  okx_btc: false,
  okx_evm: false,
  gate: false,
  gate_btc: false,
  tomo_evm: false,
  tomo_btc: false,
  bybit_evm: false,
  bybit_btc: false,
  coin98_btc: false,
  coin98_evm: false,
  fox_btc: false,
  fox_evm: false,
  tokenpocket: false,
  bitget_evm: false,
  bitget_btc: false,
  binance_evm: false,
  binance_btc: false,
  xverse: false
}

export const evmWalletNameTransformer = (wallet: string): WalletTypes | undefined => {
  let name
  if (wallet?.toLocaleLowerCase().includes('metamask')) {
    name = WalletTypes.WALLET_METAMASK
  }
  if (wallet?.toLocaleLowerCase().includes('gate')) {
    name = WalletTypes.WALLET_GATE
  }
  if (wallet?.toLocaleLowerCase().includes('okx')) {
    name = WalletTypes.WALLET_OKX_EVM
  }
  if (wallet?.toLocaleLowerCase().includes('bybit')) {
    name = WalletTypes.WALLET_BYBIT_EVM
  }
  if (wallet?.toLocaleLowerCase().includes('tomo')) {
    name = WalletTypes.WALLET_TOMO_EVM
  }
  if (wallet?.toLocaleLowerCase().includes('coin98')) {
    name = WalletTypes.WALLET_COIN98_EVM
  }
  if (wallet?.toLocaleLowerCase().includes('fox')) {
    name = WalletTypes.WALLET_FOX_EVM
  }
  if (wallet?.toLocaleLowerCase().includes('bitget')) {
    name = WalletTypes.WALLET_BITGET_EVM
  }
  if (wallet?.toLocaleLowerCase().includes('tokenpocket')) {
    name = WalletTypes.WALLET_TOKENPOCKET
  }
  if (wallet?.toLocaleLowerCase().includes('binance')) {
    name = WalletTypes.WALLET_BINANCE_EVM
  }
  return name
}

export const btcWalletNameTransformer = (wallet: string): WalletTypes | undefined => {
  let name
  if (wallet?.toLocaleLowerCase().includes('unisat')) {
    name = WalletTypes.WALLET_UNISAT
  }
  if (wallet?.toLocaleLowerCase().includes('okx')) {
    name = WalletTypes.WALLET_OKX_BTC
  }
  if (wallet?.toLocaleLowerCase().includes('gate')) {
    name = WalletTypes.WALLET_GATE_BTC
  }
  if (wallet?.toLocaleLowerCase().includes('tomo')) {
    name = WalletTypes.WALLET_TOMO_BTC
  }
  if (wallet?.toLocaleLowerCase().includes('bybit')) {
    name = WalletTypes.WALLET_BYBIT_BTC
  }
  if (wallet?.toLocaleLowerCase().includes('coin98')) {
    name = WalletTypes.WALLET_COIN98_BTC
  }
  if (wallet?.toLocaleLowerCase().includes('fox')) {
    name = WalletTypes.WALLET_FOX_BTC
  }
  if (wallet?.toLocaleLowerCase().includes('xverse')) {
    name = WalletTypes.WALLET_XVERSE
  } if (wallet?.toLocaleLowerCase().includes('bitget')) {
    name = WalletTypes.WALLET_BITGET_BTC
  } if (wallet?.toLocaleLowerCase().includes('binance')) {
    name = WalletTypes.WALLET_BINANCE_BTC
  }
  return name
}

export const checkWalletInstall = (i: InstalledObj): InstalledObj => {
  const installed = {
    ...i
  }
  if (window.unisat) installed.unisat = true;
  if (window.ethereum) installed.metamask = true;
  if (window.gatewallet) {
    installed.gate = true;
    installed.gate_btc = true;
  }
  if (window.okxwallet) {
    installed.okx_btc = true;
    installed.okx_evm = true
  }
  if (window.bybitWallet) {
    installed.bybit_evm = true
    installed.bybit_btc = true
  }
  if (window.tomo_evm) {
    installed.tomo_btc = true;
    installed.tomo_evm = true
  }
  if (window.coin98) {
    installed.coin98_btc = true
    installed.coin98_evm = true
  }
  if (window.foxwallet) {
    installed.fox_btc = true
    installed.fox_evm = true
  }
  if (!isMobile) {
    installed.binance_evm = true
  }
  if (isMobile && window?.ethereum?.isBinance) {
    installed.binance_evm = true
  }
  if (window?.binancew3w?.bitcoin) {
    installed.binance_btc = true
  }
  if (window.bitkeep) {
    installed.bitget_btc = true;
    installed.bitget_evm = true;
  }
  if (window.tokenpocket) {
    installed.tokenpocket = true;
  }
  if (window.XverseProviders) {
    installed.xverse = true
  }
  return installed
}
export const getBtcWalletName = (wallet: string) => {
  if (wallet.toLowerCase().includes('unisat')) return 'UniSat Wallet'
  if (wallet.toLowerCase().includes('okx')) return 'OKX Wallet'
  if (wallet.toLocaleLowerCase().includes('tomo')) return 'Tomo Wallet'
  if (wallet.toLocaleLowerCase().includes('bybit')) return 'Bybit Wallet'
  if (wallet.toLocaleLowerCase().includes('coin98')) return 'Coin98 Wallet'
  if (wallet.toLocaleLowerCase().includes('fox')) return 'Fox Wallet'
  if (wallet.toLocaleLowerCase().includes('bitget')) return 'Bitget Wallet'
  if (wallet.toLocaleLowerCase().includes('xverse')) return 'Xverse Wallet'
  if (wallet.toLocaleLowerCase().includes('binance')) return 'Binance Wallet'
  if (wallet.toLocaleLowerCase().includes('gate')) return 'Gate Wallet'
  return ''
}

