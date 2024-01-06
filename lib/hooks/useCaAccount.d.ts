declare const useCaAccount: () => {
    address: string | undefined;
    isConnected: boolean;
    walletType: string;
    ethAddress: string | undefined;
};
export { useCaAccount };
