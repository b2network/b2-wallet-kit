import { convertBTCConnectorToAccountSigner, convertWalletClientToAccountSigner } from "../utils/signerAdapters"
import { useEffect, useMemo, useState } from "react"
import { useAccount, useConnect, useWalletClient } from "wagmi"
import { Connector } from "../btcWallet/connectors/types"
import { SmartAccountSigner } from "@b2network/aa-sdk"

type UseCaSignerProps = {
  signerType: string,
  btcConnector?: Connector,
}

const useCaSigner = ({
  signerType,
  btcConnector
}: UseCaSignerProps) => {
  const { data: walletClient } = useWalletClient()

  const [signer, setSigner] = useState<SmartAccountSigner>()
  const getSigner = async () => {
    if (signerType === 'eth' && walletClient) {
      setSigner(convertWalletClientToAccountSigner(walletClient))
    }
    if (btcConnector && signerType === 'btc') {
      if(!btcConnector.address)return
      setSigner(convertBTCConnectorToAccountSigner(btcConnector))
    }
  }
  useEffect(() => {
    getSigner()
  }, [signerType])

  return signer
}

export {
  useCaSigner
}