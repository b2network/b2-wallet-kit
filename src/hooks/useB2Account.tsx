import { useAccounts, useETHProvider } from "@particle-network/btc-connectkit";
import { useMemo } from "react";
import { useB2Modal, useCurrentWallet } from "../context"
import { useAccount } from "wagmi"

const useB2Account = () => {
  const { address, isConnected } = useAccount();
  const { evmAccount } = useETHProvider()
  const { accounts } = useAccounts()
  const isBtcConnected = useMemo(() => accounts[0] ? true : false, [accounts])
  const { currentWallet, chainType } = useCurrentWallet();
  return {
    isConnected: chainType === 'btc' ? isBtcConnected : chainType === 'eth' ? isConnected : false,
    address: chainType === 'btc' ? accounts?.[0] : chainType === 'eth' ? address : '',
    evmAddress: chainType === 'btc' ? evmAccount : chainType === 'eth' ? address : '',
    chainType,
    currentWallet
  }
}

export {
  useB2Account
}