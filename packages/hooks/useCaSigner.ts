import { convertBTCConnectorToAccountSigner, convertWalletClientToAccountSigner } from "../utils/signerAdapters"
import { useEffect, useMemo, useState } from "react"
import { WalletClient, useAccount, useConnect, useWalletClient } from "wagmi"
import { Connector } from "../btcWallet/connectors/types"
import { SmartAccountSigner } from "@b2network/aa-sdk"

type UseCaSignerProps = {
  signerType: string,
  btcConnector?: Connector,
  walletClient?: WalletClient | null
}

const useCaSigner = ({
  signerType,
  btcConnector,
  walletClient
}: UseCaSignerProps) => {
  const [signer, setSigner] = useState<SmartAccountSigner>()
  const getEthSigner = async () => {
    if (signerType === 'eth' && walletClient) {
      setSigner(convertWalletClientToAccountSigner(walletClient))
    }
  }
  const getBtcSigner = () => {
    if (btcConnector && signerType === 'btc') {
      if (!btcConnector.address) return
      setSigner(convertBTCConnectorToAccountSigner(btcConnector))
    }
  }
  useEffect(() => {
    getBtcSigner()
  }, [btcConnector, signerType])

  useEffect(() => {
    getEthSigner()
  }, [signerType, walletClient])

  return signer
}

export {
  useCaSigner
}