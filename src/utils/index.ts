const UnisatDownd = 'https://unisat.io/download'
const MetamaskDownload = 'https://support.metamask.io/hc/en-us/articles/360015489531-Getting-started-with-MetaMask'
const OkxDownLoad = 'https://chromewebstore.google.com/detail/%E6%AC%A7%E6%98%93-web3-%E9%92%B1%E5%8C%85/mcohilncbfahbmgdjkbpemcciiolgcge'
export const getDownloadUrlByKey = (wallet: string) => {
  if (wallet?.toLocaleLowerCase().includes('okx')) return OkxDownLoad
  if (wallet?.toLocaleLowerCase().includes('unisat')) return UnisatDownd
  if (wallet?.toLocaleLowerCase().includes('metamask')) return MetamaskDownload
  return ''
}

export * from './localstore'