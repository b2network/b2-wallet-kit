const UnisatDownload = 'https://unisat.io/download'
const MetamaskDownload = 'https://metamask.io/download/'
const OkxDownLoad = 'https://chromewebstore.google.com/detail/%E6%AC%A7%E6%98%93-web3-%E9%92%B1%E5%8C%85/mcohilncbfahbmgdjkbpemcciiolgcge'
const GateDownLoad = 'https://chromewebstore.google.com/detail/gate-wallet/cpmkedoipcpimgecpmgpldfpohjplkpp'
const FoxDownload = 'https://foxwallet.com/download'
const TokenpocketDownload = 'https://www.tokenpocket.pro/en/download/app'
const XverseDownload = 'https://www.xverse.app/download'
const Coin98Download = 'https://coin98.com/wallet'
const BinanceDownload = 'https://www.binance.com/en/download'
const TomoDownload = 'https://tomo.inc/'
const BybitDownload = 'https://www.bybit.com/en/download/'
const BitgetDownload = 'https://www.bitget.com/zh-CN/download'


export const getDownloadUrlByKey = (wallet: string) => {
  if (wallet?.toLocaleLowerCase().includes('okx')) return OkxDownLoad
  if (wallet?.toLocaleLowerCase().includes('unisat')) return UnisatDownload
  if (wallet?.toLocaleLowerCase().includes('metamask')) return MetamaskDownload
  if (wallet?.toLocaleLowerCase().includes('gate')) return GateDownLoad
  if (wallet?.toLocaleLowerCase().includes('fox')) return FoxDownload
  if (wallet?.toLocaleLowerCase().includes('tokenpocket')) return TokenpocketDownload
  if (wallet?.toLocaleLowerCase().includes('xverse')) return XverseDownload
  if (wallet?.toLocaleLowerCase().includes('coin98')) return Coin98Download
  if (wallet?.toLocaleLowerCase().includes('binance')) return BinanceDownload
  if (wallet?.toLocaleLowerCase().includes('tomo')) return TomoDownload
  if (wallet?.toLocaleLowerCase().includes('bybit')) return BybitDownload
  if (wallet?.toLocaleLowerCase().includes('bitget')) return BitgetDownload
}

export * from './localStorage'