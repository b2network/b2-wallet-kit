import { convertBTCConnectorToAccountSigner, convertWalletClientToAccountSigner } from "../utils/signerAdapters"
import { WalletTypes } from "../types/types"
import { b2test } from "@b2network/b2-wallet-connector"
import { Address, createWalletClient, custom } from "viem"


const useEthCaSigner = () => {
  let injected:any
  const connect = async (wallet: WalletTypes) => {
    if (wallet === WalletTypes.WALLET_METAMASK) injected = window.ethereum
    if (wallet === WalletTypes.WALLET_OKX_EVM) injected = window.okxwallet
    const res = await injected?.request({ method: 'eth_requestAccounts' });
    return res as Address[];
  }
  const getEthCaSigner = async (wallet: WalletTypes) => {
    const accounts = await connect(wallet)
    const client = createWalletClient({
      //@ts-ignore
      chain: b2test,
      account: accounts[0],
      transport: custom(injected)
    })
    if (client) {
      return convertWalletClientToAccountSigner(client)
    }
  }
  return {
    getEthCaSigner
  }
}



export {
  useEthCaSigner
};