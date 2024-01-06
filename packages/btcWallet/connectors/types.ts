import { promises } from 'dns'
import { BtcConnectorName, Network } from '../types'

export type AccountsChangedHandler = (address: string, publicKey: string) => void
export type NetworkChangedHandler = (network: Network) => void
export type DisconnectHandler = () => void

export interface ConnectorOptions {
  onAccountsChanged?: AccountsChangedHandler
  onNetworkChanged?: NetworkChangedHandler
  onDisconnect?: DisconnectHandler
}

export interface Connection {
  address: string
  publicKey: string
  network: Network
}

export interface Connector {
  name: BtcConnectorName
  address?: string,
  publicKey?: string,
  getProvider(): any
  connect(options?: ConnectorOptions): Promise<Connection>
  disconnect(): void
  signMessage: (message?: string) => Promise<string>
  sendBitcoin: (params: any) => Promise<string | {txhash:string}>
}
