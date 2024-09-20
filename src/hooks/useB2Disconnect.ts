

import { useAccount, useDisconnect } from "wagmi";
import { useCallback } from "react";
import { WalletTypes } from "../utils/wallet/types";
import { clearWalletFromLocal } from "../utils/localStore";
import { useCurrentWallet } from "../context";
import { useConnectModal } from "@particle-network/btc-connectkit";
import { EvmWalletArr } from "../utils/wallet";


const useB2Disconnect = () => {
  const { setCurrentWallet, currentWallet } = useCurrentWallet()
  const { openConnectModal, disconnect: disconnectBtc } = useConnectModal();
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const handleDisconnect = useCallback(() => {
    if (currentWallet && EvmWalletArr.includes(currentWallet) && isConnected) {
      disconnect()
    } else {
      disconnectBtc && disconnectBtc()
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