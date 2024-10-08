import { isMobile } from 'react-device-detect';
import { getDownloadUrlByKey } from '../../utils/index';
import styles from './index.module.scss';

type Iprops = {
  walletIcon: any,
  walletName: string,
  installed: boolean
}



const WalletItem = ({ walletIcon, walletName, installed }: Iprops) => {
  return (
    <div
      className={styles.walletItem} style={{
        cursor: installed ? 'pointer' : 'not-allowed'
      }}>
      <div className={styles.left} style={{
        opacity: installed ? '1' : '0.4',
      }}>
        <img className={styles.walletLogo} src={walletIcon} alt="logo" />
        <div>{walletName}</div>
      </div>
      <div className={styles.right}>
        {
          !installed && !isMobile && <div className={styles.install} onClick={() => {
            const url = getDownloadUrlByKey(walletName)
            url && window.open(url)
          }}>Install</div>
        }
      </div>
    </div>
  )
}

export default WalletItem;