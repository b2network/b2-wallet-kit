import { Chain, ChainFormatters, defineChain } from 'viem'

export const b2test = defineChain<Chain, ChainFormatters | undefined>({
  id: 1002,
  name: 'b2-test',
  network: 'b2-test',
  nativeCurrency: {
    decimals: 18,
    name: 'Bitcoin',
    symbol: 'BTC',
  },
  blockExplorers: {
    default: {
      name: 'bsquared testnet',
      url: 'https://testnet.bsquared.network/'
    }
  },
  rpcUrls: {
    default: {
      http: ['https://zkevm-rpc.bsquared.network'],
    },
    public: {
      http: ['https://zkevm-rpc.bsquared.network'],
    },
  },
})
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

