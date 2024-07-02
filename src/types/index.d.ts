declare global {
  interface Window {
    ethereum: any,
    okxwallet: any,
    gatewallet: any,
    coin98: any,
    unisat: {
      requestAccounts: () => Promise<string[]>;
      getPublicKey: () => Promise<string>;
      signMessage: (msg: string, type?: string) => Promise<string>;
    };
    BitcoinProvider: any;
  }
}
interface Window {
  ethereum: any,
  okxwallet: any,
  gatewallet: any,
  bybitWallet: any,
  tomo_evm: any,
  tomo_btc: any,
  coin98: any,
  unisat: {
    requestAccounts: () => Promise<string[]>;
    getPublicKey: () => Promise<string>;
    signMessage: (msg: string, type?: string) => Promise<string>;
  };
  BitcoinProvider: any;
}
declare module '*.svg' {
  const dataUrl: string;
  export default dataUrl;
}

declare module '*.png' {
  const dataUrl: string;
  export default dataUrl;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}