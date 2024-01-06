import { useAccount } from "wagmi"
import { useMemo } from "react"
import { useBtc } from "../btcWallet"
import { WalletTypes } from "../types/types"

const useCaAccount = () => {
  const { address, isConnected } = useAccount()
  const { address: btcAddress, isConnected: isBtcConnect, ethAddress, currentWallet } = useBtc()
  const walletType = useMemo(() => {
    if (currentWallet === WalletTypes.WALLET_UNISAT || currentWallet === WalletTypes.WALLET_OKX_BTC) return 'btc'
    if (currentWallet === WalletTypes.WALLET_METAMASK || currentWallet === WalletTypes.WALLET_OKX_EVM) return 'eth'
    return ''
  }, [currentWallet])
  return {
    address: walletType === 'btc' ? btcAddress : walletType === 'eth' ? address : '',
    isConnected: walletType === 'btc' ? isBtcConnect : walletType === 'eth' ? isConnected : false,
    walletType,
    ethAddress: walletType === 'btc' ? ethAddress : walletType === 'eth' ? address : '',
  }
}
export { useCaAccount };