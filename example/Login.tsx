import { Address, parseUnits, toHex } from "viem"
import { useB2Modal } from "../packages"
import { useBtc } from "../packages/btcWallet"
import { useB2Disconnect, useCaSigner, useScaProvider } from "../packages/hooks"
import { useBtcCaSigner } from "../packages/hooks/useBtcCaSigner"
import { useCaAccount } from "../packages/hooks/useCaAccount"
import { useEthSigner } from "../packages/hooks/useEthCaSigner"
import { WalletCollection, WalletTypes } from "../packages/types/types"


const Login = () => {
  const { handleOpenConnectModal, handleSetWalletCollection } = useB2Modal()
  const { address, isConnected,walletType,ethAddress } = useCaAccount()
  const signer = useCaSigner({ signerType: walletType })
  const caProvider = useScaProvider(ethAddress as Address, signer);

  console.log(signer,'signer---1-')
  const { getEthCaSigner } = useEthSigner(WalletTypes.WALLET_OKX_EVM)

  const { getBtcSigner } = useBtcCaSigner('Unisat')

  const { disconnect } = useB2Disconnect()

  const getEvmWalletSigner = async () => {
    const s = await getEthCaSigner()
    console.log(s, 'ssss')
  }

  const getBtcWalletSigner = async () => {
    const s = await getBtcSigner()
    console.log(s, 'bbbbtcSigner')
  }

  const transfer = async() => { 

  }

  return (
    <div style={{ width: '100vw', marginTop: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <div onClick={() => {
        handleOpenConnectModal()
      }}>
        Login1
      </div>
      <div >Transfer</div>
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