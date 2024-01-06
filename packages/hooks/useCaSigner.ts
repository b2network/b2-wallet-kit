import { convertBTCConnectorToAccountSigner, convertWalletClientToAccountSigner } from "../utils/signerAdapters"
import { Connector } from "../btcWallet/connectors/types"
import { useMemo } from "react"
import { useWalletClient } from "wagmi"


const useCaSigner = (signerType: string, connector?: Connector) => {
  const { data: walletClient } = useWalletClient()

  const signer = useMemo(() => {
    if (signerType === 'eth' && walletClient) {
      return convertWalletClientToAccountSigner(walletClient)
    }
    if (connector && signerType === 'btc') {
      return convertBTCConnectorToAccountSigner(connector)
    }
  }, [signerType, connector?.name, walletClient])

  return signer
}

export {
  useCaSigner
};