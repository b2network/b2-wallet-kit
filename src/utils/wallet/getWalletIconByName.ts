export const getWalletIconByName = (name: string) => {
  if (name.toLowerCase().includes('metamask')) return 'https://b2-static.bsquared.network/wallet/metamask.png';
  if (name.toLowerCase().includes('okx')) return 'https://b2-static.bsquared.network/wallet/okx.png'
  if (name.toLowerCase().includes('unisat')) return 'https://b2-static.bsquared.network/wallet/unisat.png'
  if (name.toLowerCase().includes('tomo')) return 'https://b2-static.bsquared.network/wallet/tomo.png'
  if (name.toLowerCase().includes('bybit')) return 'https://b2-static.bsquared.network/wallet/bybit.png'
  if (name.toLowerCase().includes('coin98')) return 'https://b2-static.bsquared.network/wallet/icon_coin98.svg'
  if (name.toLowerCase().includes('fox')) return 'https://b2-static.bsquared.network/wallet/icon_fox.png'
  if (name.toLowerCase().includes('binance')) return 'https://b2-static.bsquared.network/wallet/icon_binance.svg'
  if (name.toLowerCase().includes('tokenpocket')) return 'https://b2-static.bsquared.network/wallet/tokenpocket.svg'
  if (name.toLowerCase().includes('gate')) return 'https://b2-static.bsquared.network/wallet/icon_gate.svg'
  if (name.toLowerCase().includes('bitget')) return 'https://b2-static.bsquared.network/wallet/bitget_wallet.png'
  if (name.toLowerCase().includes('xverse')) return 'https://b2-static.bsquared.network/wallet/xverse.png'
  return ''
}