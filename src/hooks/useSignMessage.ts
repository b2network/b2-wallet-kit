import { useBTCProvider } from "@particle-network/btc-connectkit";
import { useWalletClient } from "wagmi"
import { useCurrentWallet } from "../context";
import { ChainType } from "../utils/wallet/types";


const useSignMessage = () => {
  const { chainType } = useCurrentWallet();

  const { data: client } = useWalletClient()
  const { signMessage } = useBTCProvider()

  if (chainType === ChainType.ETH) return client?.signMessage
  if (chainType === ChainType.BTC) return signMessage
  return
}

export {
  useSignMessage
}