type EthereumProvider = { request(...args: any): Promise<any> }

interface Window {
  ethereum?: WindowProvider
  okxwallet?: WindowProvider & { bitcoin: any, bitcoinTestnet: any }
  unisat?: any
  XverseProviders: any
  BitcoinProvider: BitcoinProvider
}

interface ImportMeta {
  env: Record<string, string | undefined>
}