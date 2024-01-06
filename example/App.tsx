import React from 'react';
import { B2ModalProvider } from '../packages';
import { WagmiConfig, WindowProvider, configureChains, createConfig } from 'wagmi';
import { b2test } from '@b2network/b2-wallet-connector';
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";
import { InjectedConnector } from "@wagmi/core/connectors/injected";
import { B2BtcProvider } from '../packages/btcWallet';
import Login from './Login';

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
        //@ts-ignore
        getProvider: () => {
          //@ts-ignore
          return typeof window !== undefined && window.okxwallet as WindowProvider
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
        <B2ModalProvider>
          <Login />
        </B2ModalProvider>
      </B2BtcProvider>
    </WagmiConfig>
  );
}

export default App;
