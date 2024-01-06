type EthereumProvider = { request(...args: any): Promise<any> }


interface Window {
  b2?: EthereumProvider
  ethereum?: EthereumProvider
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  okxwallet?: EthereumProvider & { bitcoin: any,bitcoinTestnet:any }
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  unisat?: any
  XverseProviders: any
}
