

import { useAccount, useDisconnect } from "wagmi";
import { useCallback } from "react";
import { WalletTypes } from "../types/types";
import { clearWalletFromLocal } from "../utils/localstore";
import { useCurrentWallet } from "../context";
import { useConnectModal } from "@particle-network/btc-connectkit";


const useB2Disconnect = () => {
  const { setCurrentWallet, currentWallet } = useCurrentWallet()
  const { openConnectModal, disconnect: disconnectBtc } = useConnectModal();
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const handleDisconnect = useCallback(() => {
    if ((currentWallet === WalletTypes.WALLET_METAMASK || currentWallet === WalletTypes.WALLET_OKX_EVM) && isConnected) {
      disconnect()
    } else {
      disconnectBtc()
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