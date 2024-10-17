import { concatHex } from "viem";
import { WalletTypes } from "./wallet/types";
import { BtcWalletArr } from "./wallet";

enum ConnectorTypeCode {
  eth = '0x00',
  btc = '0x01'
}

enum WalletTypeCode {
  metamask = '0x01',
  okx_eth = '0x02',
  unisat = '0x03',
  okx_btc = '0x04'
}


export const signedMsgAdapter = (sig: string, w: WalletTypes) => {
  const { chainTypeCode, walletCode } = getWalletCode(w)
  if (chainTypeCode === ConnectorTypeCode.eth) {
    return concatHex(['0x00', sig as `0x${string}`, walletCode])
  } else {
    const vrsSigBuff = Buffer.from(sig, 'base64')
    const v = vrsSigBuff[0] - 0x1f < 0 ? vrsSigBuff[0] - 0x1b : vrsSigBuff[0] - 0x1f
    const rsvSigBuff = Buffer.concat([
      Buffer.from(vrsSigBuff.subarray(1)),
      Buffer.from([
        v
      ]),
    ])
    return concatHex([`0x01`, `0x${rsvSigBuff.toString('hex')}`, walletCode])
  }
}

const getWalletCode = (w: WalletTypes) => {
  let chainTypeCode: `0x${string}` = '0x';
  let walletCode: `0x${string}` = '0x';
  if (BtcWalletArr.includes(w)) {
    chainTypeCode = ConnectorTypeCode.btc
    walletCode = WalletTypeCode.unisat
  } else {
    chainTypeCode = ConnectorTypeCode.eth
    walletCode = WalletTypeCode.metamask
  }

  return {
    chainTypeCode,
    walletCode
  }
}