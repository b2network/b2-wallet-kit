import iconClose from '../../imgs/icon_close.svg'


const ModalHeader = ({
  hanldeCloseConnectModal
}: { hanldeCloseConnectModal:()=>void}) => {
  return (
    <div className="header">
      <div className="tip">Please connect a wallet</div>
      <img onClick={hanldeCloseConnectModal} src={iconClose} alt="close" />
    </div>
  )
}

export default ModalHeader