import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import { BtcConnectorName, Network } from './types'
import { Connector, ConnectorOptions } from './connectors/types'
import { ec as EC } from 'elliptic';
import { keccak256 } from "viem";
import { getAddress } from "viem/utils";
import { WalletTypes } from '../types/types'

type Action =
  | { type: 'on connect'; connectorName: BtcConnectorName }
  | { type: 'connect failed' }
  | { type: 'connected'; connectorName: BtcConnectorName; address: string; publicKey: string; network: Network }
  | { type: 'account changed'; address: string; publicKey: string }
  | { type: 'network changed'; network: Network }
  | { type: 'disconnected' }
  | { type: 'walletType changed'; currentWallet: WalletTypes | undefined }

type Dispatch = (action: Action) => void

export type SendBtcParams = {
  from?: string,
  to: string,
  amount: string
}
interface State {
  isConnecting: boolean
  isConnected: boolean
  address?: string
  publicKey?: string
  connectorName?: BtcConnectorName
  network?: Network
  currentWallet?: WalletTypes,
  connectors: Connector[]
}

type B2BtcProviderProps = { children: React.ReactNode, connectors: Connector[] }

const BtcContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

const btcReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'on connect': {
      return {
        ...state,
        isConnecting: true,
        connectorName: action.connectorName,
      }
    }

    case 'connect failed': {
      return {
        ...state,
        isConnecting: false,
        connectorName: undefined,
      }
    }

    case 'connected': {
      return {
        ...state,
        isConnecting: false,
        isConnected: true,
        connectorName: action.connectorName,
        address: action.address,
        publicKey: action.publicKey,
        network: action.network,
      }
    }

    case 'disconnected': {
      return {
        ...state,
        isConnecting: false,
        isConnected: false,
        connectorName: undefined,
        address: undefined,
        publicKey: undefined,
        network: undefined,
      }
    }

    case 'account changed': {
      return { ...state, address: action.address, publicKey: action.publicKey }
    }

    case 'network changed': {
      return { ...state, network: action.network }
    }

    case 'walletType changed': {
      return {
        ...state,
        currentWallet: action.currentWallet
      }
    }


    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}

export const B2BtcProvider = ({ children, connectors }: B2BtcProviderProps) => {
  const [state, dispatch] = useReducer(btcReducer, {
    connectors,
    isConnecting: false,
    isConnected: false,
    connectorName: undefined,
    address: undefined,
    publicKey: undefined,
    network: undefined,
  })
  const defultListeners = {
    onAccountsChanged: (address: string, publicKey: string) => {
      dispatch({
        type: 'account changed',
        address,
        publicKey,
      })
    },
    onNetworkChanged: (network: Network) => {
      dispatch({
        type: 'network changed',
        network,
      })
    },
    onDisconnect: () => {
      dispatch({ type: 'disconnected' })
    },
  }
  // initListeners

  useEffect(() => {
    connectors.forEach((conector) => conector.initListeners(defultListeners))
  }, [connectors])


  return <BtcContext.Provider value={{ state, dispatch }}>{children}</BtcContext.Provider>
}

const useBtcContext = () => {
  const ctx = useContext(BtcContext)
  if (ctx === undefined) {
    throw new Error('useBtc must be used within a B2BtcProvider')
  }

  return ctx
}

export const useBtc = () => {
  const ctx = useBtcContext()
  const {
    publicKey,
    connectorName,
    address,
    connectors
  } = ctx.state

  const ConnectorMap: Record<BtcConnectorName, Connector> = useMemo(
    () => {
      let obj: any = {};
      connectors.forEach(v => obj[v.name] = v)
      return obj
    },
    [connectors],
  )
    
  const connector = useMemo(() => {
    if (ctx.state.connectorName) {
      const c = connectors.find(v => v.name === connectorName)
      if (c) {
        c.address = address;
        c.publicKey = publicKey
      }
      return c
    }
  }, [ConnectorMap, connectorName, address])

  const disconnect = useCallback(() => {
    ctx.dispatch({ type: 'disconnected' })
    connector?.disconnect()
  }, [connector, ctx])

  const connect = useCallback(
    async (connectorName: BtcConnectorName) => {
      try {
        if (ctx.state.isConnected) {
          disconnect()
        }
        // TODO: avoid dispatch if is connected
        ctx.dispatch({
          type: 'on connect',
          connectorName,
        })
        const { address, publicKey, network } = await ConnectorMap[connectorName].connect()
        ctx.dispatch({
          type: 'connected',
          connectorName,
          address,
          publicKey,
          network,
        })
        return true
      } catch (error) {
        ctx.dispatch({ type: 'connect failed' })
        throw error
      }
    },
    [ConnectorMap, ctx, disconnect],
  )

  const setCurrentWallet = useCallback((w: WalletTypes | undefined) => {
    ctx.dispatch({
      type: 'walletType changed',
      currentWallet: w
    })
  }, [ctx])

  const provider = useMemo(() => {
    return connector?.getProvider()
  }, [connector])

  const signMessage = useCallback(
    async (message?: string) => {
      return connector?.signMessage(message)
    },
    [connector],
  )
  const sendBitcoin = useCallback(
    async (params: SendBtcParams) => {
      return connector?.sendBitcoin(params)
    },
    [connector],
  )

  const ethAddress = useMemo(() => {
    if (!publicKey) {
      return
    }
    const ec = new EC('secp256k1')
    const key = ec.keyFromPublic(publicKey, 'hex')
    const uncompressed = key.getPublic().encode('hex', false).slice(2);
    const address = keccak256(Buffer.from(uncompressed, 'hex')).slice(66 - 40);
    return getAddress(`0x${address}`)
  }, [publicKey])

  return { ...ctx.state, ethAddress, connect, disconnect, connector, signMessage, provider, sendBitcoin, setCurrentWallet, ConnectorMap }
}

export const useCurrentWallet = () => {
  const ctx = useBtcContext()
  const setCurrentWallet = useCallback((w: WalletTypes | undefined) => {
    ctx.dispatch({
      type: 'walletType changed',
      currentWallet: w
    })
  }, [ctx])
  return {
    currentWallet: ctx.state.currentWallet,
    setCurrentWallet
  }
}
