import { WalletTypes } from "./types";
import iconMetamask from '../../imgs/icon_metamask.png'
import iconOkx from '../../imgs/icon_okx.svg'
import iconGate from '../../imgs/icon_gate.svg'
import iconTomo from '../../imgs/tomo.png'
import iconUnisat from '../../imgs/icon_unisat.svg'
import iconBybit from '../../imgs/bybit.png'

export type InstalledObj = Record<WalletTypes, boolean>
export type EvmConnectorName = 'gate' | 'metamask' | 'bybit' | 'okx'

export const defaultInstalledMap: InstalledObj = {
  metamask: false,
  unisat: false,
  okx_btc: false,
  okx_evm: false,
  gate: false,
  tomo_evm: false,
  tomo_btc: false,
  bybit_evm: false
}


export const walletNameRecord: Record<EvmConnectorName, WalletTypes> = {
  gate: WalletTypes.WALLET_OKX_EVM,
  metamask: WalletTypes.WALLET_METAMASK,
  bybit: WalletTypes.WALLET_BYBIT_EVM,
  okx: WalletTypes.WALLET_OKX_EVM
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
  if (wallet?.toLocaleLowerCase().includes('tomo')) {
    name = WalletTypes.WALLET_TOMO_BTC
  }
  return name
}

export const checkWalletInstall = (i: InstalledObj): InstalledObj => {
  const installed = {
    ...i
  }
  if (window.unisat) installed.unisat = true;
  if (window.ethereum) installed.metamask = true;
  if (window.gatewallet) installed.gate = true;
  if (window.okxwallet) {
    installed.okx_btc = true;
    installed.okx_evm = true
  }
  if (window.bybitWallet) {
    installed.bybit_evm = true
  }
  if (window.tomo_evm) {
    installed.tomo_btc = true;
    installed.tomo_evm = true
  }
  return installed
}
export const getBtcWalletName = (wallet: string) => {
  if (wallet.toLowerCase().includes('unisat')) return 'UniSat Wallet'
  if (wallet.toLowerCase().includes('okx')) return 'OKX Wallet'
  if (wallet.toLocaleLowerCase().includes('tomo')) return 'Tomo Wallet'
  return ''
}
export const WalletIconConf = [
  {
    name: 'metamask', icon: iconMetamask,
  }, {
    name: 'okx', icon: iconOkx,
  }, {
    name: 'unisat', icon: iconUnisat,
  }, {
    name: 'tomo', icon: iconTomo,
  },
  {
    name: 'bybit', icon: iconBybit
  },
  {
    name: 'gate', icon: iconGate
  }
]