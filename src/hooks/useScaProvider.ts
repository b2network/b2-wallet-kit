import getValidatorProvider from "../utils/getValidatorProvider"
import { Address, padHex } from "viem"
import { SimpleWeightedECDSAProvider, SmartAccountSigner } from "@b2network/aa-sdk"
import { useEffect, useState } from "react"
import { b2test } from "../utils/chain"

const useScaProvider = (ethAddress?: Address, signer?: SmartAccountSigner) => {
  const [caProvider, setCaProvider] = useState<SimpleWeightedECDSAProvider>()

  useEffect(() => {
    const getProvider = async () => {
      if (signer && ethAddress) {
        const provider = await getValidatorProvider(b2test, signer, {
          guardians: [ethAddress],
          ids: [padHex('0x', { size: 32 })],
          weights: [1],
          threshold: 1,
        })
        setCaProvider(provider)
      }
    }
    getProvider()
  }, [signer, ethAddress])
  return caProvider
}
export {
  useScaProvider
}