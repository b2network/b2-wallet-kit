import { Address } from "viem";
import { SimpleWeightedECDSAProvider, SmartAccountSigner } from "@b2network/aa-sdk";
declare const useScaProvider: (ethAddress?: Address, signer?: SmartAccountSigner) => SimpleWeightedECDSAProvider | undefined;
export { useScaProvider };
