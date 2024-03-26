import { WalletTypes } from "../types/types"

const KEY_WALLET = 'currentWallet'

export const saveWalletToLocal = (w: WalletTypes) => {
  try {
    localStorage.setItem(KEY_WALLET, w)
  } catch (error) {
    console.log(error, 'error')
  }
}

export const getWalletFromLocal = () => {
  return localStorage.getItem(KEY_WALLET) || undefined
}
export const clearWalletFromLocal = () => {
  localStorage.removeItem(KEY_WALLET)
  return
}
