import { useEffect, useState } from "react"
import { AA_REGISTRY_URL } from "../utils";
import { isAddress } from "viem";


const useBtcScaAddress = (address?: string) => {
  const [sca, setScaAddress] = useState('');

  const getScaAddress = async () => {
    if (!address || isAddress(address)) return;
    const url = `${AA_REGISTRY_URL}/${address}`
    const response = await fetch(url);
    const data = await response.json();
    setScaAddress(data.result)
  }

  useEffect(() => {
    if (address) {
      getScaAddress()
    }
  }, [address])
  return {
    address: sca
  }
}
export default {
  useBtcScaAddress
}