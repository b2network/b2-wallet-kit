import { concatHex } from "viem";
import { WalletTypes } from "../types/types";

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
  if (w === WalletTypes.WALLET_METAMASK) {
    chainTypeCode = ConnectorTypeCode.eth
    walletCode = WalletTypeCode.metamask
  }
  if (w === WalletTypes.WALLET_OKX_EVM) {
    chainTypeCode = ConnectorTypeCode.eth
    walletCode = WalletTypeCode.okx_eth
  }
  if (w === WalletTypes.WALLET_UNISAT) {
    chainTypeCode = ConnectorTypeCode.btc
    walletCode = WalletTypeCode.unisat
  }
  if (w === WalletTypes.WALLET_OKX_BTC) {
    chainTypeCode = ConnectorTypeCode.btc
    walletCode = WalletTypeCode.okx_btc
  }
  return {
    chainTypeCode,
    walletCode
  }
}