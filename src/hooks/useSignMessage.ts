import { useBTCProvider } from "@particle-network/btc-connectkit";
import { useCurrentWallet } from "src/context";
import { ChainType } from "src/types/types";
import { useWalletClient } from "wagmi"


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