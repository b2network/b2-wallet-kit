import { Connector } from "../btcWallet/connectors/types";
type UseCaSignerProps = {
    signerType: string;
    btcConnector?: Connector;
};
declare const useCaSigner: ({ signerType, btcConnector }: UseCaSignerProps) => import("@b2network/aa-sdk-core").SmartAccountSigner | undefined;
export { useCaSigner };
