/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/prop-types */
import Styles from './modal.scss'

const Modal: React.FC<{ isOpen: boolean; titulo: string; children: any; setModalClose: any }> = (props) => {
  if (props.isOpen) {
    return (
      <div className={Styles.background}>
        <div className={Styles.modal}>
          <div className={Styles.modalTitulo}>{props.titulo}</div>
          <div className={Styles.close} onClick={props.setModalClose}>
            <i className='material-icons'>close</i>
          </div>
          <hr />
          <div className={Styles.conteudo}>{props.children}</div>
        </div>
      </div>
    )
  } else return null
}

export default Modal
