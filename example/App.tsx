import React from 'react';
import { B2ModalProvider } from '../src';
import { WagmiConfig, WindowProvider, configureChains, createConfig } from 'wagmi';
// import { b2test } from '@b2network/b2-wallet-connector';
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";
import { InjectedConnector } from "@wagmi/core/connectors/injected";
import { B2BtcProvider } from '../src/btcWallet';
import Login from './Example';
import { b2test } from '../src/utils/chain';

const { chains, publicClient } = configureChains(
  [b2test],
  [publicProvider()]
);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new InjectedConnector({
      chains,
      options: {
        name: 'OKX Wallet',
        getProvider: () => {
          if (typeof window !== "undefined") { 
            return window.okxwallet as WindowProvider
          }
        }
      }
    })
  ],
  publicClient,
});

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <B2BtcProvider>
        <B2ModalProvider isAutoConnect={true}>
          <Login />
        </B2ModalProvider>
      </B2BtcProvider>
    </WagmiConfig>
  );
}

export default App;
