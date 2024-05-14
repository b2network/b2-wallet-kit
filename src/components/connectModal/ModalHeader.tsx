import iconClose from '../../imgs/icon_close.svg'
import styles from './index.module.scss';


const ModalHeader = ({
  handleCloseConnectModal
}: { handleCloseConnectModal: () => void }) => {
  return (
    <div className={styles.header}>
      <div className={styles.tip}>Please connect a wallet</div>
      <img onClick={handleCloseConnectModal} src={iconClose} alt="close" />
    </div>
  )
}

export default ModalHeader