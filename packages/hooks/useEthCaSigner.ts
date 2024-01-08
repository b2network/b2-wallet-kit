import { convertBTCConnectorToAccountSigner, convertWalletClientToAccountSigner } from "../utils/signerAdapters"
import { useEffect, useMemo } from "react"
import { useAccount, useConnect, useWalletClient } from "wagmi"
import { Connector } from "../btcWallet/connectors/types"
import { WalletTypes } from "../types/types"


const useEthSigner = (wallet: WalletTypes) => {
  const { data: walletClient } = useWalletClient();
  const injected = useMemo(() => {
    if (wallet === WalletTypes.WALLET_METAMASK) return window.ethereum
    if (wallet === WalletTypes.WALLET_OKX_EVM) return window.okxwallet
  }, [wallet])

  const connect = async () => {
    const res = await injected?.request({ method: 'eth_requestAccounts' });
    return res;
  }

  const getEthCaSigner = async () => {
    const accounts = await connect()
    if (walletClient) {
      return convertWalletClientToAccountSigner(walletClient)
    }
  }
  return {
    getEthCaSigner
  }
}



export {
  useEthSigner
};