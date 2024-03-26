import { useAccounts, useETHProvider } from "@particle-network/btc-connectkit";
import { useMemo } from "react";
import { useB2Modal, useCurrentWallet } from "../context"
import { useAccount } from "wagmi"

const useB2Account = () => {
  const { address, isConnected } = useAccount();
  const { evmAccount } = useETHProvider()
  const { accounts } = useAccounts()
  const isBtcConnected = useMemo(() => accounts[0] ? true : false, [accounts])
  const { currentWallet, walletType } = useCurrentWallet();
  return {
    isConnected: walletType === 'btc' ? isBtcConnected : walletType === 'eth' ? isConnected : false,
    address: walletType === 'btc' ? accounts?.[0] : walletType === 'eth' ? address : '',
    evmAddress: walletType === 'btc' ? evmAccount : walletType === 'eth' ? address : '',
    walletType,
    currentWallet
  }
}

export {
  useB2Account
}