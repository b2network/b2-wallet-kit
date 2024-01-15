import { convertBTCConnectorToAccountSigner, convertWalletClientToAccountSigner } from "../utils/signerAdapters"
import { useCallback, useEffect, useMemo, useState } from "react"
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
  
  const getEthSigner = useCallback(async () => {
    if (signerType === 'eth' && walletClient) {
      setSigner(convertWalletClientToAccountSigner(walletClient))
    }
  }, [signerType, walletClient])
  const getBtcSigner = useCallback(() => {
    if (btcConnector && signerType === 'btc') {
      if (!btcConnector.address) return
      setSigner(convertBTCConnectorToAccountSigner(btcConnector))
    }
  }, [signerType, btcConnector])
  useEffect(() => {
    if (!signerType) {
      setSigner(undefined)
    }
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