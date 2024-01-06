import {
  SimpleWeightedECDSAProvider,
  SmartAccountSigner,
} from '@b2network/aa-sdk'
import { Address, Chain, Hex, hexToBigInt, keccak256 } from 'viem'
import {
  BUNDLER_RPC_URL,
  ENTRYPOINT_ADDRESS,
  KERNEL_FACTORY_ADDRESS,
  KERNEL_IMPL_ADDRESS,
  PM_BASE_URL,
  SW_VALIDATOR_ADDRESS,
} from './index'

interface ValidatorProviderParams {
  guardians: Address[]
  ids: Hex[]
  weights: number[]
  threshold: number
}

const getValidatorProvider = async (
  chain: any,
  signer: SmartAccountSigner,
  { guardians, ids, weights, threshold }: ValidatorProviderParams,
) => {
  const ownerHash = keccak256(
    Buffer.from((await signer.getAddress()).toLowerCase(), 'utf-8'),
  )
  return SimpleWeightedECDSAProvider.init({
    selectedSigner: signer,
    projectId: '0',
    guardians,
    ids,
    weights,
    threshold,
    opts: {
      providerConfig: {
        chain,
        rpcUrl: BUNDLER_RPC_URL,
        entryPointAddress: ENTRYPOINT_ADDRESS,
        opts: {
          txRetryMulitplier: 1,
          txRetryIntervalMs: 3000,
          txMaxRetries: 20,
        },
      },
      accountConfig: {
        entryPointAddress: ENTRYPOINT_ADDRESS,
        factoryAddress: KERNEL_FACTORY_ADDRESS,
        implAddress: KERNEL_IMPL_ADDRESS,
        index: hexToBigInt(ownerHash),
      },
      validatorConfig: {
        entryPointAddress: ENTRYPOINT_ADDRESS,
        validatorAddress: SW_VALIDATOR_ADDRESS,
      },
      paymasterConfig: {
        policy: 'VERIFYING_PAYMASTER',
        baseURL: PM_BASE_URL,
      },
    },
  })
}
export default getValidatorProvider;