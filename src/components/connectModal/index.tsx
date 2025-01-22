import { Connector, useAccount, useConnect as useEthConnect } from "wagmi";

import Modal from 'react-modal';
import { useB2Modal, useCurrentWallet } from "../../context";
import { WalletCollection, WalletTypes, InstalledMap } from "../../utils/wallet/types";
import { useCallback, useEffect, useMemo, useState } from "react";

import iconType from '../../imgs/icon_type.svg'
import { saveWalletToLocal } from "../../utils";
import WalletItem from "./WalletItem";
import ModalHeader from "./ModalHeader";
import { useConnector as useBtcConnector } from '@particle-network/btc-connectkit';
import styles from './index.module.scss';
import { useB2Disconnect } from "../../hooks/useB2Disconnect";
import { btcWalletNameTransformer, checkWalletInstall, defaultInstalledMap, evmWalletNameTransformer, getBtcWalletName, } from "../../utils/wallet";
import { getWalletIconByName } from "../../utils/wallet/getWalletIconByName";


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



  const getInstalled = useCallback((wallet: string, walletType: 'evm' | 'btc') => {
    if (walletType === 'evm') {
      const name = evmWalletNameTransformer(wallet)
      if (name) return installedMap[name]
    }
    if (walletType === 'btc') {
      const name = btcWalletNameTransformer(wallet)
      if (name) return installedMap[name]
    }
    return false

  }, [installedMap])



  const handleClickEthWallet = async (c: Connector) => {
    if (!isConnected) {
      const res = await connectAsync({ connector: c })
    }
    let name = evmWalletNameTransformer(c.name)
    console.log(name, 'evm clicked')
    name && setCurrentWallet(name)
    name && saveWalletToLocal(name)
    handleCloseConnectModal()
  }

  const connectBtcWallet = async (btcWallet: string) => {
    try {
      await disconnectBtc()
      const res = await connectBtc(btcWallet)
      const name = btcWalletNameTransformer(btcWallet)
      console.log(name, 'btc clicked')
      name && setCurrentWallet(name)
      name && saveWalletToLocal(name)
      handleCloseConnectModal()
    } catch (error) {
      console.log('connect error for:', btcWallet)
    }
  }

  const getInstalledWallet = () => {
    if (typeof window === 'undefined') return;
    const o = {
      ...installedMap
    }
    const installed = checkWalletInstall(o)
    setInstalledMap(installed)
  }

  useEffect(() => {
    if (openConnectModal) {
      getInstalledWallet()
    }
  }, [openConnectModal])

  const evmWalletNameFormat = (name: string) => {
    if (name.toLowerCase().includes('binance')) return 'Binance Wallet'
    return name
  }


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
            <div className={styles.row}>
              {
                showEth && connectors.map(c => {
                  const installed = getInstalled(c.name, 'evm')
                  return (
                    <div
                      className={styles.rowItem}
                      onClick={() => {
                        if (installed) {
                          handleClickEthWallet(c)
                        }
                      }} key={c.name}>
                      <WalletItem installed={installed} walletIcon={getWalletIconByName(c.name) || c.icon} walletName={evmWalletNameFormat(c.name)} />
                    </div>
                  )
                })
              }
            </div>
          </div>
        }
        {
          showBtc && <div>
            <SubTitle title="Bitcoin Wallet" />
            <div className={styles.row}>
              {
                btcConnectors.map(c => {
                  const installed = getInstalled(c.metadata.id, 'btc')
                  const name = getBtcWalletName(c.metadata.id)
                  return (
                    <div key={c.metadata.id}
                      className={styles.rowItem}
                      onClick={() => {
                        if (installed) {
                          connectBtcWallet(c.metadata.id)
                        }
                      }}>
                      <WalletItem installed={installed} walletIcon={getWalletIconByName(c.metadata.id)} walletName={name} />
                    </div>
                  )
                })
              }
            </div>

          </div>
        }
      </div>
      <div className={styles.privacy}>
        <span>By logging in I agree to the </span>
        <a className={styles.link} href="https://www.bsquared.network/terms-of-service">Terms of Service</a> <span> and</span> <a className={styles.link} href="https://www.bsquared.network/privacy-policy">Privacy Policy</a>
      </div>
    </Modal>
  )
}

export default ConnectModal