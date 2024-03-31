import { Chain, ChainFormatters, defineChain } from 'viem'

export const b2TestHaven = defineChain<Chain, ChainFormatters | undefined>({
  id: 1102,
  name: 'B2-Haven',
  network: 'B2-Haven',
  nativeCurrency: {
    decimals: 18,
    name: 'Bitcoin',
    symbol: 'BTC',
  },
  blockExplorers: {
    default: {
      name: 'B2-Haven',
      url: 'https://haven-explorer.bsquared.network'
    }
  },
  rpcUrls: {
    default: {
      http: ['https://haven-rpc.bsquared.network/'],
    },
    public: {
      http: ['https://haven-rpc.bsquared.network'],
    },
  },
})
export const b2TestHabitat = defineChain<Chain, ChainFormatters | undefined>({
  id: 1123,
  name: 'B2-Habitat',
  network: 'Habitat Testnet ',
  nativeCurrency: {
    decimals: 18,
    name: 'Bitcoin',
    symbol: 'BTC',
  },
  blockExplorers: {
    default: {
      name: 'B2-Haven',
      url: 'https://habitat-explorer.bsquared.network'
    }
  },
  rpcUrls: {
    default: {
      http: ['https://habitat-public-rpc.bsquared.network'],
    },
    public: {
      http: ['https://habitat-public-rpc.bsquared.network'],
    },
  },
})