## B2WalletKit

#### install

```
npm i @b2network/b2-wallet-kit
```

or

```
yarn add @b2network/b2-wallet-kit
```

#### usage

B2ModalProvider must be wrapped in ConnectProvider from particle and wagmi provider

```
import { B2ModalProvider, b2TestHabitat } from "b2-wallet-kit";
import {
  ConnectProvider,
  OKXConnector,
  UnisatConnector,
} from '@particle-network/btc-connectkit';

  <WagmiConfig config={wagmiConfig}>
      <ConnectProvider
        options={{
          projectId: PROJECT_ID, // -
          clientKey: CLIENT_KEY, // Retrieved from https://dashboard.particle.network
          appId: APP_ID, // -
          aaOptions: {
            accountContracts: {
              BTC: [
                {
                  chainIds: [1123],
                  version: '2.0.0',
                },
              ],
            },
          },
          walletOptions: {
            visible: true,
          }
        }}
        connectors={[new UnisatConnector()]}
      >
        <B2ModalProvider isAutoConnect={true}>
          {mounted && children}
        </B2ModalProvider>
      </ConnectProvider>
    </WagmiConfig>

```
