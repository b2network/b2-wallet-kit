import iconClose from '../../imgs/icon_close.svg'
import styles from './index.module.scss';


const ModalHeader = ({
  hanldeCloseConnectModal
}: { hanldeCloseConnectModal: () => void }) => {
  return (
    <div className={styles.header}>
      <div className={styles.tip}>Please connect a wallet</div>
      <img onClick={hanldeCloseConnectModal} src={iconClose} alt="close" />
    </div>
  )
}

export default ModalHeader