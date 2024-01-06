import { SendBtcParams } from '..'
import { ConnectorNotFoundError } from '../errors'
import { BtcConnectorName, Network } from '../types'
import { AccountsChangedHandler, Connector, ConnectorOptions, DisconnectHandler, NetworkChangedHandler } from './types'

export class UnisatConnector implements Connector {
  name: BtcConnectorName
  address?: string
  publicKey?: string;
  onAccountsChanged?: AccountsChangedHandler
  onNetworkChanged?: NetworkChangedHandler
  onDisconnect?: DisconnectHandler

  constructor(options?: ConnectorOptions) {
    this.name = 'Unisat'
    this.onAccountsChanged = options?.onAccountsChanged
    this.onNetworkChanged = options?.onNetworkChanged
    this.onDisconnect = options?.onDisconnect
  }

  getProvider() {
    if (typeof window === 'undefined') return
    if (typeof window.unisat === 'undefined') {
      throw new ConnectorNotFoundError()
    }

    return window.unisat
  }

  async connect() {
    try {
      const provider = this.getProvider()

      if (provider.on) {
        provider.on('accountsChanged', async (accounts: string[]) => {
          if (!!accounts && accounts.length > 0) {
            const publicKey: string = await provider.getPublicKey()
            this.onAccountsChanged && this.onAccountsChanged(accounts[0], publicKey)
          } else {
            provider.removeAllListeners()
            this.onDisconnect && this.onDisconnect()
          }
        })
        provider.on('networkChanged', (network: Network) => {
          this.onNetworkChanged && this.onNetworkChanged(network)
        })
      }

      const accounts: string[] = await provider.requestAccounts()
      await provider.switchNetwork('testnet')
      const publicKey: string = await provider.getPublicKey()
      const network: Network = await provider.getNetwork()
      this.address = accounts[0]
      this.publicKey = publicKey
      return { address: accounts[0], publicKey, network }
    } catch (error) {
      console.log('connnector error: ', error)
      throw error
    }
  }

  // Unisat does not provide a disconnect method at this time
  disconnect(): void { }

  signMessage: (message?: string) => Promise<string> = (message) => {
    const provider = this.getProvider()
    return provider.signMessage(message) as Promise<string>
  }
  sendBitcoin: (params: any) => Promise<string> = (params: SendBtcParams) => {
    const provider = this.getProvider();
    return provider.sendBitcoin(params.to, Number(params.amount))
  }
}
