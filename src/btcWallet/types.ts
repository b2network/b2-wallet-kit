import { WalletTypes } from "../types/types"

export enum BtcConnectorName {
  Unisat = 'Unisat',
  OKX = 'OKX',
  Xverse = 'Xverse'
  //  'Unisat' | 'OKX' | 'Xverse'
}
export type Network = 'livenet' | 'testnet'

export type InstalledMap  = Record<WalletTypes, boolean> 