/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header } from '@/presentation/components'
import Styles from './alinhamentoEstrategico.scss'

import React, { useState } from 'react'
import DropZone from '@/presentation/components/dropzone/dropzone'
import Footer from '@/presentation/components/footer/footer'
import { SelectType } from '@/presentation/components/SelectType/SelectType'
import Modal from '@/presentation/components/modal/modal'

const AlinhamentoEstrategico: React.FC = () => {
  const [openModal, setOpenModal] = useState(false)
  const [title, setTitle] = useState('Título')

  return (
    <>
      <Header />
      <div className={Styles.H1formularioChamados}>
        <h1>Alinhamento estratégico</h1>
        <hr />
      </div>
      <div className={Styles.form}>
        <div className={Styles.tituloDetalhe}>
          <label htmlFor='titulo'>Título</label>
          <input type='text' className={Styles.inputTitulo} id='titulo' required autoFocus maxLength={60} />
          <label htmlFor='detalhes'>Detalhes</label>
          <textarea className={Styles.inputDetalhe} name='' id='detalhes' cols={30} rows={10} required></textarea>

          <div className={Styles.formWrapper}>
            <form className={Styles.formAnalise} action='' method=''>
              <h3 className={Styles.formTitle}>Nível de prioridade</h3>
              <hr />
              <div className={Styles.debtAmountSlider}>
                <input type='radio' name='debt-amount' id='0' value='0' required />
                <label htmlFor='0' data-debt-amount='0'></label>
                <input type='radio' name='debt-amount' id='1' value='1' required />
                <label htmlFor='1' data-debt-amount='1'></label>
                <input type='radio' name='debt-amount' id='2' value='2' required />
                <label htmlFor='2' data-debt-amount='2'></label>
                <input type='radio' name='debt-amount' id='3' value='3' required />
                <label htmlFor='3' data-debt-amount='3'></label>
                <div className={Styles.debtAmountPos}></div>
              </div>
            </form>
          </div>
          <div
            className={Styles.openModal}
            onClick={() => {
              setOpenModal(true)
            }}
          >
            <i className='large material-icons'>assignment_turned_in</i>
          </div>
          <Modal
            isOpen={openModal}
            titulo={title}
            setModalClose={() => {
              setOpenModal(!openModal)
            }}
          >
            <div>a</div>
          </Modal>
        </div>
        <div className={Styles.arquivoBotao}>
          <div className={Styles.dropzoneContainer}>
            <DropZone />
          </div>
          <label htmlFor='grupo' className={Styles.grupo}>
            Grupos
          </label>
          <SelectType />
          <input type='button' value='Enviar' className={Styles.buttonEnviar} />
        </div>
      </div>
      <Footer />
    </>
  )
}
export default AlinhamentoEstrategico
