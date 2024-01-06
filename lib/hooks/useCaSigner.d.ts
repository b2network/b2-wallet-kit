import { Connector } from "../btcWallet/connectors/types";
declare const useCaSigner: (signerType: string, connector?: Connector) => import("@b2network/aa-sdk-core").SmartAccountSigner | undefined;
export { useCaSigner };
