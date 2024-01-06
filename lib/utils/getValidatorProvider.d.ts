import { SimpleWeightedECDSAProvider, SmartAccountSigner } from '@b2network/aa-sdk';
import { Address, Hex } from 'viem';
interface ValidatorProviderParams {
    guardians: Address[];
    ids: Hex[];
    weights: number[];
    threshold: number;
}
declare const getValidatorProvider: (chain: any, signer: SmartAccountSigner, { guardians, ids, weights, threshold }: ValidatorProviderParams) => Promise<SimpleWeightedECDSAProvider>;
export default getValidatorProvider;
