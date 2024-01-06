import { Connector, useAccount, useConnect } from "wagmi";
import { BtcConnectorName, useBtc } from "../btcWallet";
import Modal from 'react-modal';
import { useB2Modal } from "./context";
import { WalletCollection, WalletTypes } from "../types/types";
import { useMemo } from "react";
import logo from '../imgs/logo.svg'
import iconMetamask from '../imgs/icon_metamask.png'
import iconOkx from '../imgs/icon_okx.svg'
import iconUnisat from '../imgs/icon_unisat.svg'
import './styles/index.less';
import { saveWalletToLocal } from "../utils/localstore";

const BTCWallets = [
  {
    key: 'Unisat',
    name: 'UniSat Wallet'
  },
  {
    key: 'OKX',
    name: 'OKX Wallet'
  },
  // {
  //   key: 'Xverse',
  //   logo: '/assets/xverse.svg'
  // },
]

const WalletModal = ({ collection }: { collection: WalletCollection }) => {
  const { connectAsync, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { connect: connectBtc, setCurrentWallet } = useBtc()
  const { openConnectModal, hanldeCloseConnectModal } = useB2Modal()
  const { isConnected } = useAccount()
  const showEth = useMemo(() => {
    return collection === WalletCollection.ALL || collection === WalletCollection.ETH
  }, [collection])
  const showBtc = useMemo(() => {
    return collection === WalletCollection.ALL || collection === WalletCollection.BTC
  }, [collection])

  const getImageUrl = (wallet: string) => {
    if (wallet.toLocaleLowerCase().includes('okx')) return iconOkx
    if (wallet.toLocaleLowerCase().includes('unisat')) return iconUnisat
    if (wallet.toLocaleLowerCase().includes('metamask')) return iconMetamask
    return ''
  }

  const handleClickEthWallet = async (c: Connector) => {
    console.log(c.name,'nnnname----',isConnected)
    if (!isConnected) {
      await connectAsync({ connector: c })
    }
    let name
    if (c.name.toLocaleLowerCase().includes('metamask')) {
      name = WalletTypes.WALLET_METAMASK
    }
    if (c.name.toLocaleLowerCase().includes('okx')) name = WalletTypes.WALLET_OKX_EVM
    setCurrentWallet(name)
    name && saveWalletToLocal(name)
    hanldeCloseConnectModal()
  }

  const connectBtcWallet = async (btcWallet: BtcConnectorName) => {
    const res = await connectBtc(btcWallet)
    if (btcWallet === 'OKX') {
      setCurrentWallet(WalletTypes.WALLET_OKX_BTC)
      saveWalletToLocal(WalletTypes.WALLET_OKX_BTC)
    }
    if (btcWallet === 'Unisat') {
      setCurrentWallet(WalletTypes.WALLET_UNISAT)
      saveWalletToLocal(WalletTypes.WALLET_UNISAT)
    }
    res && hanldeCloseConnectModal()
  }

  return (
    <Modal
      isOpen={openConnectModal}
      onRequestClose={hanldeCloseConnectModal}
      ariaHideApp={false}
      className="b2WalletModal"
      overlayClassName="overlay"
    >
      <div>
        <img className="b2logo" src={logo} alt="logo" />
      </div>
      <div className="tip">Please connect a wallet address</div>
      {
        showEth && <div>
          <div className="title">
            Ethereum Wallet
          </div>
          {
            showEth && connectors.map(c => {
              return (
                <div key={c.id}
                  className="walletItem"
                  onClick={() => {
                    handleClickEthWallet(c)
                  }}>
                  <img src={getImageUrl(c.name)} alt="logo" />
                  <div>{c.name}</div>
                </div>
              )
            })
          }
        </div>
      }
      {
        showBtc && <div>
          <div className="title">
            Bitcoin Wallet
          </div>
          {
            BTCWallets.map(c => {
              return (
                <div key={c.key}
                  className="walletItem"
                  onClick={() => connectBtcWallet(c.key as BtcConnectorName)}>
                  <img src={getImageUrl(c.key)} alt="logo" />
                  <div>{c.name}</div>
                </div>
              )
            })
          }
        </div>
      }
    </Modal>
  )
}

export {
  WalletModal
};
export * from './context'
