

import { convertBTCConnectorToAccountSigner } from "../utils/signerAdapters"
import { BtcConnectorName, useBtc } from "../btcWallet"

const useBtcCaSigner = () => {
  const { ConnectorMap } = useBtc()
  const getBtcSigner = async (btcSingerType: BtcConnectorName) => {
    const connector = ConnectorMap[btcSingerType]
    await connector && connector.connect()
    return convertBTCConnectorToAccountSigner(connector)
  }
  return {
    getBtcSigner
  }
}

export {
  useBtcCaSigner
};