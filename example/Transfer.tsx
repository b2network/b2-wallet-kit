import { Address, useBalance, useSendTransaction, useWalletClient } from "wagmi"
import { useCaAccount } from "../src";
import { isAddress, parseEther } from "viem";
import { useMemo } from "react";
import { useBtcScaAddress } from "../src/hooks/useBtcScaAddress";

const Transfer = () => {
  const { address, walletType } = useCaAccount()
  const client = useWalletClient()
  const { address: btcSca } = useBtcScaAddress(address)
  const finalAddress = useMemo(() => {
    if (address && isAddress(address)) {
      return address
    }
    if (walletType === 'btc') {
      return btcSca
    }
    return ''
  }, [address, walletType, btcSca])
  const { data } = useBalance({
    address: finalAddress as Address,
    chainId: 1102
  });

  const { sendTransaction, isError, isSuccess } = useSendTransaction()
  const handleTransfer = () => {
    const res = client.data?.sendTransaction({
      to: '0x756A6aa43547fA8cCF02ab417E6c4c4747137346',
      value: parseEther('0.0001')
    })
    console.log(res, 'res')
  }
  console.log(client, 'ccc')
  console.log({ isError, isSuccess })
  return <div>
    <div>balance:{data?.formatted}</div>
    <button onClick={handleTransfer}>Transfer</button>
    <button onClick={() => {
      sendTransaction({
        chainId: 1102,
        to: '0x756A6aa43547fA8cCF02ab417E6c4c4747137346',
        value: parseEther('0.0001')
      })
    }}>Transfer by Hook</button>
  </div>
}

export default Transfer;