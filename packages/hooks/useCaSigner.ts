import { convertBTCConnectorToAccountSigner, convertWalletClientToAccountSigner } from "../utils/signerAdapters"
import { useMemo } from "react"
import { useAccount, useConnect, useWalletClient } from "wagmi"
import { Connector } from "../btcWallet/connectors/types"

type UseCaSignerProps = {
  signerType: string,
  btcConnector?: Connector,
}

const useCaSigner = ({
  signerType,
  btcConnector
}: UseCaSignerProps) => {
  const { data: walletClient } = useWalletClient()
  const signer = useMemo(() => {
    if (signerType === 'eth' && walletClient) {
      return convertWalletClientToAccountSigner(walletClient)
    }
    if (btcConnector && signerType === 'btc') {
      return convertBTCConnectorToAccountSigner(btcConnector)
    }
  }, [signerType, btcConnector?.name, walletClient])

  return signer
}

export {
  useCaSigner
};