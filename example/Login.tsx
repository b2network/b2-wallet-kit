import { useB2Modal } from "../packages"
import { useBtc } from "../packages/btcWallet"
import { useB2Disconnect } from "../packages/hooks"
import { useCaAccount } from "../packages/hooks/useCaAccount"
import { WalletCollection } from "../packages/types/types"


const Login = () => {
  const { handleOpenConnectModal, handleSetWalletCollection } = useB2Modal()
  const { address, isConnected } = useCaAccount()
  const { disconnect } = useB2Disconnect()
  return (
    <>
      <div onClick={() => {
        handleOpenConnectModal()
      }}>
        Login1
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

    </>
  )
}

export default Login