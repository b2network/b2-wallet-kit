import iconArrow from '../../imgs/icon_arrow.svg'
import { getDownloadUrlByKey } from '../../utils'

type Iprops = {
  walletIcon: any,
  walletName: string,
  installed: boolean
}



const WalletItem = ({ walletIcon, walletName, installed }: Iprops) => {
  return (
    <div
      className="walletItem" style={{
        cursor: installed ? 'pointer' : 'not-allowed'
      }}>
      <div className='left' style={{
        opacity: installed ? '1' : '0.4',
      }}>
        <img className="walletLogo" src={walletIcon} alt="logo" />
        <div>{walletName}</div>
      </div>
      <div className='right'>
        {
          !installed && <div className='install' onClick={() => {
            const url = getDownloadUrlByKey(walletName)
            url && window.open(url)
          }}>Install</div>
        }
        <img className="arrow" src={iconArrow} alt="icon" />
      </div>
    </div>
  )
}

export default WalletItem;