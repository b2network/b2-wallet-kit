

import { convertBTCConnectorToAccountSigner } from "../utils/signerAdapters"
import { BtcConnectorName, useBtc } from "../btcWallet"


const useBtcCaSigner = (btcSingerType: BtcConnectorName) => {
  const { ConnectorMap } = useBtc()

  const connector = ConnectorMap[btcSingerType]

  const getBtcSigner = async () => {
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