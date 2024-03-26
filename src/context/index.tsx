import type { FC, ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import ConnectModal from '../components/connectModal';
import { BtcConnectorName, WalletCollection, WalletTypes } from '../types/types';
import { getWalletFromLocal } from '../utils/localstore';
import { useConnector, useAccounts } from '@particle-network/btc-connectkit';

type GlobalContextType = {
  openConnectModal: boolean;
  hanldeCloseConnectModal: () => void;
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
  hanldeCloseConnectModal: () => { },
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

export const B2ModalProvider: FC<{ children: ReactNode, isAutoConnect?: boolean }> = ({ children, isAutoConnect = false }) => {
  const { connect } = useConnector();
  const { accounts } = useAccounts();
  const [currentWallet, setCurrentWallet] = useState<WalletTypes>()
  const isBtcConnected = useMemo(() => accounts.length > 0, [accounts])
  const [openConnectModal, setOpenConnectModal] = useState(false);
  const hanldeCloseConnectModal = () => setOpenConnectModal(false);
  const handleOpenConnectModal = () => setOpenConnectModal(true);
  const [openDisconnectModal, setOpenDisconnectModal] = useState(false);
  const handleOpenDisconnectModal = () => setOpenDisconnectModal(true)
  const handleCloseDisconnectModal = () => setOpenDisconnectModal(false)

  const [walletCollection, setWalletCollection] = useState<WalletCollection>(WalletCollection.ALL)

  const handleSetWalletCollection = (w: WalletCollection) => {
    setWalletCollection(w)
  }

  const autoConnect = async () => {
    const w = getWalletFromLocal()
    if (w === WalletTypes.WALLET_METAMASK || w === WalletTypes.WALLET_OKX_EVM) {
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
    if (isAutoConnect) {
      autoConnect()
    }
  }, [isAutoConnect])

  const providerValue = {
    openConnectModal,
    hanldeCloseConnectModal,
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
  const walletType: 'btc' | 'eth' | '' = useMemo(() => {
    if (currentWallet === WalletTypes.WALLET_UNISAT || currentWallet === WalletTypes.WALLET_OKX_BTC) return 'btc'
    if (currentWallet === WalletTypes.WALLET_METAMASK || currentWallet === WalletTypes.WALLET_OKX_EVM) return 'eth'
    return ''
  }, [currentWallet])
  return {
    currentWallet,
    setCurrentWallet,
    walletType
  }
}

export const useOpenModal = () => {
  const { hanldeCloseConnectModal, handleOpenConnectModal } = useB2Modal();
  return {
    handleOpenConnectModal,
    hanldeCloseConnectModal
  }
}

