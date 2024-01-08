import { convertBTCConnectorToAccountSigner, convertWalletClientToAccountSigner } from "../utils/signerAdapters"
import {  useWalletClient } from "wagmi"
import { Connector } from "../btcWallet/connectors/types"
import { WalletTypes } from "../types/types"


const useEthCaSigner = () => {
  const { data: walletClient } = useWalletClient();
  const connect = async (wallet: WalletTypes) => {
    let injected
    if (wallet === WalletTypes.WALLET_METAMASK) injected = window.ethereum
    if (wallet === WalletTypes.WALLET_OKX_EVM) injected = window.okxwallet
    const res = await injected?.request({ method: 'eth_requestAccounts' });
    return res;
  }
  const getEthCaSigner = async (wallet: WalletTypes) => {
    const accounts = await connect(wallet)
    if (walletClient) {
      return convertWalletClientToAccountSigner(walletClient)
    }
  }
  return {
    getEthCaSigner
  }
}



export {
  useEthCaSigner
};