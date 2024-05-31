import type { FC, ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import ConnectModal from '../components/connectModal';
import { BtcConnectorName, ChainType, WalletCollection, WalletTypes } from '../utils/wallet/types';
import { getWalletFromLocal } from '../utils/localstore';
import { useConnector, useAccounts, useBTCProvider } from '@particle-network/btc-connectkit';

type GlobalContextType = {
  openConnectModal: boolean;
  handleCloseConnectModal: () => void;
  handleOpenConnectModal: () => void;
  handleOpenDisconnectModal: () => void;
  handleCloseDisconnectModal: () => void;
  handleSetWalletCollection: (w: WalletCollection) => void
  autoConnect: () => void,
  currentWallet?: WalletTypes,
  setCurrentWallet: (w?: WalletTypes) => void
};
const globalContextDefaultValues: GlobalContextType = {
  openConnectModal: false,
  handleCloseConnectModal: () => { },
  handleOpenConnectModal: () => { },
  handleCloseDisconnectModal: () => { },
  handleOpenDisconnectModal: () => { },
  handleSetWalletCollection: (w: WalletCollection) => { },
  autoConnect: () => { },
  setCurrentWallet: () => { }
};
const B2ModalContext = createContext(globalContextDefaultValues);

export const useB2Modal = () => {
  const context = useContext(B2ModalContext);
  return context
}

export const B2ModalProvider: FC<{ children: ReactNode, isAutoConnect?: boolean, btcNetwork: 'livenet' | 'testnet' }> = ({ children, isAutoConnect = false, btcNetwork = 'livenet' }) => {
  const { connect } = useConnector();
  const { accounts } = useAccounts();
  const [currentWallet, setCurrentWallet] = useState<WalletTypes>()
  const isBtcConnected = useMemo(() => accounts?.length || 0 > 0, [accounts])
  const [openConnectModal, setOpenConnectModal] = useState(false);
  const handleCloseConnectModal = () => setOpenConnectModal(false);
  const handleOpenConnectModal = () => setOpenConnectModal(true);
  const [openDisconnectModal, setOpenDisconnectModal] = useState(false);
  const handleOpenDisconnectModal = () => setOpenDisconnectModal(true)
  const handleCloseDisconnectModal = () => setOpenDisconnectModal(false);
  const [network, setNetwork] = useState<'livenet' | 'testnet'>()

  const { getNetwork, switchNetwork } = useBTCProvider();

  const [walletCollection, setWalletCollection] = useState<WalletCollection>(WalletCollection.ALL)

  const handleSetWalletCollection = (w: WalletCollection) => {
    setWalletCollection(w)
  }

  const autoConnect = async () => {
    const w = getWalletFromLocal()
    if (w === WalletTypes.WALLET_METAMASK || w === WalletTypes.WALLET_OKX_EVM || w === WalletTypes.WALLET_GATE) {
      setCurrentWallet(w)
      return
    }
    if (w === WalletTypes.WALLET_UNISAT && !isBtcConnected) {
      await connect("unisat")
      setCurrentWallet(w)
      return
    }
    if (w === WalletTypes.WALLET_OKX_BTC && !isBtcConnected) {
      await connect("okx")
      setCurrentWallet(w)
      return
    }
  }

  useEffect(() => {
    const getNet = async () => {
      const net = await getNetwork();
      setNetwork(net)
    }
    if (accounts.length > 0) {
      getNet()
    }
  }, [accounts])

  // auto switch to btc livenet
  useEffect(() => {
    if (network && (network !== btcNetwork)) {
      switchNetwork(btcNetwork)
    }
  }, [network, btcNetwork])


  useEffect(() => {
    if (isAutoConnect) {
      autoConnect()
    }
  }, [isAutoConnect])

  const providerValue = {
    openConnectModal,
    handleCloseConnectModal,
    handleOpenConnectModal,
    openDisconnectModal,
    handleCloseDisconnectModal,
    handleOpenDisconnectModal,
    handleSetWalletCollection,
    autoConnect,
    currentWallet,
    setCurrentWallet
  };

  return <B2ModalContext.Provider value={providerValue}>
    <ConnectModal collection={walletCollection} />
    {children}
  </B2ModalContext.Provider>;
};

export const useCurrentWallet = () => {
  const { currentWallet, setCurrentWallet } = useB2Modal();
  const chainType: ChainType | undefined = useMemo(() => {
    if (currentWallet === WalletTypes.WALLET_UNISAT || currentWallet === WalletTypes.WALLET_OKX_BTC) return ChainType.BTC
    if (currentWallet === WalletTypes.WALLET_METAMASK || currentWallet === WalletTypes.WALLET_OKX_EVM || currentWallet === WalletTypes.WALLET_GATE) return ChainType.ETH
    return
  }, [currentWallet])
  return {
    currentWallet,
    setCurrentWallet,
    chainType
  }
}

export const useOpenModal = () => {
  const { handleCloseConnectModal, handleOpenConnectModal } = useB2Modal();
  return {
    handleOpenConnectModal,
    handleCloseConnectModal
  }
}

