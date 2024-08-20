import { Chain, ChainFormatters, defineChain } from 'viem'

export const b2TestHaven = defineChain({
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
export const b2TestHabitat = defineChain({
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
export const b2Testnet = defineChain({
  id: 1123,
  name: 'B2-Testnet',
  network: 'B2 Testnet ',
  nativeCurrency: {
    decimals: 18,
    name: 'Bitcoin',
    symbol: 'BTC',
  },
  blockExplorers: {
    default: {
      name: 'B2-Testnet',
      url: 'https://testnet-explorer.bsquared.network'
    }
  },
  rpcUrls: {
    default: {
      http: ['https://b2-testnet.alt.technology'],
    },
    public: {
      http: ['https://b2-testnet.alt.technology'],
    },
  },
})
export const b2Network = defineChain({
  id: 223,
  name: 'B2Network',
  network: 'B2Network',
  nativeCurrency: {
    decimals: 18,
    name: 'Bitcoin',
    symbol: 'BTC',
  },
  blockExplorers: {
    default: {
      name: 'B2Network',
      url: 'https://explorer.bsquared.network/'
    }
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.bsquared.network/'],
    },
    public: {
      http: ['https://rpc.bsquared.network/'],
    },
  },
})