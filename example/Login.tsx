import { useB2Modal } from "../packages"
import { useBtc } from "../packages/btcWallet"
import { useB2Disconnect, useCaSigner } from "../packages/hooks"
import { useBtcCaSigner } from "../packages/hooks/useBtcCaSigner"
import { useCaAccount } from "../packages/hooks/useCaAccount"
import { useEthCaSigner } from "../packages/hooks/useEthCaSigner"
import { WalletCollection, WalletTypes } from "../packages/types/types"


const Login = () => {
  const { handleOpenConnectModal, handleSetWalletCollection } = useB2Modal()
  const { address, isConnected, walletType } = useCaAccount()
  const signer = useCaSigner({ signerType: walletType })

  const { getBtcSigner } = useBtcCaSigner()
  const { getEthCaSigner } = useEthCaSigner()
  const { disconnect } = useB2Disconnect()

  const getEvmWalletSigner = async () => {
    const s = await getEthCaSigner(WalletTypes.WALLET_METAMASK)
    const acc = await s?.getAddress()
    s?.signMessage('hello').then(console.log)
  }

  const getBtcWalletSigner = async () => {
    const s = await getBtcSigner('Unisat')
    console.log(s, 'bbbbtcSigner', s.getAddress())
  }


  return (
    <div style={{ width: '100vw', marginTop: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <div onClick={() => {
        handleOpenConnectModal()
      }}>
        Login1
      </div>
      <div onClick={getEvmWalletSigner}>get Eth Signer</div>

      <div onClick={getBtcWalletSigner}>
        get Btc Signer
      </div>

      <div onClick={() => {
        handleSetWalletCollection(WalletCollection.ETH)
      }}>only Eth</div>     <div onClick={() => {
        handleSetWalletCollection(WalletCollection.BTC)
      }}>btc</div>     <div onClick={() => {
        handleSetWalletCollection(WalletCollection.ALL)
      }}>all</div>
      <div>{address || ''}</div>
      <div>{isConnected.toString()}</div>
      <div onClick={() => {
        disconnect()
      }}>Disconnect</div>

    </div>
  )
}

export default Login