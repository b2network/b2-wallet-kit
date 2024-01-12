import type { FC, ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { WalletModal } from '.';
import { WalletCollection, WalletTypes } from '../types/types';
import { getWalletFromLocal } from '../utils/localstore';
import { BtcConnectorName, useBtc } from '../btcWallet';

type GlobalContextType = {
  openConnectModal: boolean;
  hanldeCloseConnectModal: () => void;
  handleOpenConnectModal: () => void;
  handleOpenDisconnectModal: () => void;
  handleCloseDisconnectModal: () => void;
  handleSetWalletCollection: (w: WalletCollection) => void
  autoConnect: () => void
};

const globalContextDefaultValues: GlobalContextType = {
  openConnectModal: false,
  hanldeCloseConnectModal: () => { },
  handleOpenConnectModal: () => { },
  handleCloseDisconnectModal: () => { },
  handleOpenDisconnectModal: () => { },
  handleSetWalletCollection: (w: WalletCollection) => { },
  autoConnect: () => { },
};

const B2ModalContext = createContext(globalContextDefaultValues);

export const useB2Modal = () => useContext(B2ModalContext);

export const B2ModalProvider: FC<{ children: ReactNode, isAutoConnect?: boolean }> = ({ children, isAutoConnect = false }) => {
  const { connect, isConnected, setCurrentWallet } = useBtc()
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
    if (w === WalletTypes.WALLET_UNISAT && !isConnected) {
      await connect(BtcConnectorName.Unisat)
      setCurrentWallet(w)
      return
    }
    if (w === WalletTypes.WALLET_OKX_BTC && !isConnected) {
      await connect(BtcConnectorName.OKX)
      setCurrentWallet(w)
      return
    }
  }

  useEffect(() => { 
    if (isAutoConnect) { 
      autoConnect()
    }
  },[isAutoConnect])

  const providerValue = {
    openConnectModal,
    hanldeCloseConnectModal,
    handleOpenConnectModal,
    openDisconnectModal,
    handleCloseDisconnectModal,
    handleOpenDisconnectModal,
    handleSetWalletCollection,
    autoConnect
  };

  return <B2ModalContext.Provider value={providerValue}>
    <WalletModal collection={walletCollection} />
    {children}
  </B2ModalContext.Provider>;
};
