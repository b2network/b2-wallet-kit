import { ec as EC } from 'elliptic'
import { Address, getAddress, keccak256 } from 'viem'

export default function ecPubKeyToETHAddress(
  publicKey: string | undefined | null,
): Address | null {
  if (!publicKey) {
    return null
  }
  const ec = new EC('secp256k1')
  const key = ec.keyFromPublic(publicKey, 'hex')
  const uncompressed = key.getPublic().encode('hex', false).slice(2)
  const address = keccak256(Buffer.from(uncompressed, 'hex')).slice(66 - 40)
  return getAddress(`0x${address}`)
}
