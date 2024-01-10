

import { convertBTCConnectorToAccountSigner } from "../utils/signerAdapters"
import { BtcConnectorName, useBtc } from "../btcWallet"

const useBtcCaSigner = () => {
  const { ConnectorMap } = useBtc()
  const getBtcSigner = async (btcSingerType: BtcConnectorName) => {
    const connector = ConnectorMap[btcSingerType]
    const res = await connector.connect();
    connector.address = res.address;
    connector.publicKey = res.publicKey;
    return convertBTCConnectorToAccountSigner(connector)
  }
  return {
    getBtcSigner
  }
}

export {
  useBtcCaSigner
};