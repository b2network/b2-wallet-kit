import { Connector, useAccount, useConnect as useEthConnect } from "wagmi";

import Modal from 'react-modal';
import { useB2Modal, useCurrentWallet } from "../../context";
import { WalletCollection, WalletTypes, InstalledMap } from "../../types/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import iconMetamask from '../../imgs/icon_metamask.png'
import iconOkx from '../../imgs/icon_okx.svg'
import iconGate from '../../imgs/icon_gate.svg'
import iconUnisat from '../../imgs/icon_unisat.svg'
import iconType from '../../imgs/icon_type.svg'
import { saveWalletToLocal } from "../../utils";
import WalletItem from "./WalletItem";
import ModalHeader from "./ModalHeader";
import { useConnectModal, useConnector as useBtcConnector } from '@particle-network/btc-connectkit';
import styles from './index.module.scss';
import { useB2Disconnect } from "../../hooks/useB2Disconnect";


const defaultInstalledMap: Record<WalletTypes, boolean> = {
  metamask: false,
  unisat: false,
  okx_btc: false,
  okx_evm: false,
  gate: false
}

const SubTitle = ({ title }: { title: string }) => {
  return (
    <div className={styles.title}>
      <img src={iconType} alt="icon" />
      <div>
        {title}
      </div>
    </div>
  )
}

const ConnectModal = ({ collection }: { collection: WalletCollection }) => {
  const { connectAsync, connectors, error, isLoading, pendingConnector } =
    useEthConnect();
  const { setCurrentWallet } = useCurrentWallet()
  const { connectors: btcConnectors, connect: connectBtc } = useBtcConnector()
  const { openConnectModal, handleCloseConnectModal } = useB2Modal()
  const { isConnected } = useAccount()
  const [installedMap, setInstalledMap] = useState<InstalledMap>(defaultInstalledMap)
  const { disconnect: disconnectBtc } = useB2Disconnect()
  const showEth = useMemo(() => {
    return collection === WalletCollection.ALL || collection === WalletCollection.ETH
  }, [collection])
  const showBtc = useMemo(() => {
    return collection === WalletCollection.ALL || collection === WalletCollection.BTC
  }, [collection])

  const getImageUrl = (wallet: string) => {
    if (wallet?.toLocaleLowerCase().includes('okx')) return iconOkx
    if (wallet?.toLocaleLowerCase().includes('unisat')) return iconUnisat
    if (wallet?.toLocaleLowerCase().includes('metamask')) return iconMetamask
    if (wallet?.toLocaleLowerCase().includes('gate')) return iconGate
    return ''
  }

  const getInstalled = useCallback((wallet: string) => {
    if (wallet?.toLocaleLowerCase().includes('okx')) return installedMap[WalletTypes.WALLET_OKX_EVM]
    if (wallet?.toLocaleLowerCase().includes('unisat')) return installedMap[WalletTypes.WALLET_UNISAT]
    if (wallet?.toLocaleLowerCase().includes('metamask')) return installedMap[WalletTypes.WALLET_METAMASK]
    if (wallet?.toLocaleLowerCase().includes('gate')) return installedMap[WalletTypes.WALLET_GATE]
    return false

  }, [installedMap])

  const getBtcWalletName = (id: string) => {
    if (id.includes('unisat')) return 'UniSat Wallet'
    if (id.includes('okx')) return 'OKX Wallet'
    return ''
  }

  const handleClickEthWallet = async (c: Connector) => {
    if (!isConnected) {
      const res = await connectAsync({ connector: c })
    }
    let name
    if (c.name?.toLocaleLowerCase().includes('metamask')) {
      name = WalletTypes.WALLET_METAMASK
    }
    if (c.name?.toLocaleLowerCase().includes('gate')) {
      name = WalletTypes.WALLET_GATE
    }

    if (c.name?.toLocaleLowerCase().includes('okx')) name = WalletTypes.WALLET_OKX_EVM
    name && setCurrentWallet(name)
    name && saveWalletToLocal(name)
    handleCloseConnectModal()
  }

  const connectBtcWallet = async (btcWallet: string) => {
    try {
      await disconnectBtc()
      const res = await connectBtc(btcWallet)
      if (btcWallet?.toLocaleLowerCase().includes('okx')) {
        setCurrentWallet(WalletTypes.WALLET_OKX_BTC)
        saveWalletToLocal(WalletTypes.WALLET_OKX_BTC)
      }
      if (btcWallet?.toLocaleLowerCase().includes('unisat')) {
        setCurrentWallet(WalletTypes.WALLET_UNISAT)
        saveWalletToLocal(WalletTypes.WALLET_UNISAT)
      }
      handleCloseConnectModal()
    } catch (error) {
      console.log('connect error for:', btcWallet)
    }
  }

  const getInstalledWallet = () => {
    if (typeof window === 'undefined') return;
    const installed = {
      ...installedMap
    }
    if (window.unisat) installed.unisat = true;
    if (window.ethereum) installed.metamask = true;
    if (window.gatewallet) installed.gate = true;
    if (window.okxwallet) {
      installed.okx_btc = true;
      installed.okx_evm = true
    }
    setInstalledMap(installed)
  }

  useEffect(() => {
    if (openConnectModal) {
      getInstalledWallet()
    }
  }, [openConnectModal])

  return (
    <Modal
      isOpen={openConnectModal}
      onRequestClose={handleCloseConnectModal}
      ariaHideApp={false}
      className={styles.b2WalletModal}
      overlayClassName={styles.overlay}
    >
      <ModalHeader handleCloseConnectModal={handleCloseConnectModal} />
      <div className={styles.content}>
        {
          showEth && <div>
            <SubTitle title="Ethereum Wallet" />
            {
              showEth && connectors.map(c => {
                const installed = getInstalled(c.name)
                return (
                  <div onClick={() => {
                    if (installed) {
                      handleClickEthWallet(c)
                    }
                  }} key={c.name}>
                    <WalletItem installed={installed} walletIcon={getImageUrl(c.name)} walletName={c.name} />
                  </div>
                )
              })
            }
          </div>
        }
        {
          showBtc && <div>
            <SubTitle title="Bitcoin Wallet" />
            {
              btcConnectors.map(c => {
                const installed = getInstalled(c.metadata.id)
                const name = getBtcWalletName(c.metadata.id)
                return (
                  <div key={c.metadata.id}
                    onClick={() => {
                      if (installed) {
                        connectBtcWallet(c.metadata.id)
                      }
                    }}>
                    <WalletItem installed={installed} walletIcon={getImageUrl(c.metadata.id)} walletName={name} />
                  </div>
                )
              })
            }
          </div>
        }
      </div>
    </Modal>
  )
}

export default ConnectModal