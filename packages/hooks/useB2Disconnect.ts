

import { useAccount, useDisconnect } from "wagmi";
import { useBtc } from "../btcWallet"
import { useCallback } from "react";
import { WalletTypes } from "../types/types";
import { clearWalletFromLocal } from "../utils/localstore";


const useB2Disconnect = () => {
  const { setCurrentWallet, currentWallet } = useBtc();
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const handleDisconnect = useCallback(() => {
    if ((currentWallet === WalletTypes.WALLET_METAMASK || currentWallet === WalletTypes.WALLET_OKX_EVM) && isConnected) {
      disconnect()
    }
    setCurrentWallet(undefined)
    clearWalletFromLocal()
  }, [currentWallet])
  return {
    disconnect: handleDisconnect
  }
}
export {
  useB2Disconnect
}