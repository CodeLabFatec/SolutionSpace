/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header } from '@/presentation/components'
import Styles from './analiseRisco.scss'

import React from 'react'
import DropZone from '@/presentation/components/dropzone/dropzone'
import Footer from '@/presentation/components/footer/footer'

const AnaliseRisco: React.FC = () => {
  return (
    <>
      <Header exibirHome={true} />
      <div className={Styles.H1formularioChamados}>
        <h1>Documento de análise de risco</h1>
        <hr />
      </div>
      <div className={Styles.form}>
        <div className={Styles.tituloDetalhe}>
          <label htmlFor='titulo'>Título</label>
          <input type='text' className={Styles.inputTitulo} id='titulo' required autoFocus maxLength={60} />
          <label htmlFor='detalhes'>Detalhes</label>
          <textarea className={Styles.inputDetalhe} name='' id='detalhes' cols={30} rows={10} required></textarea>
        </div>
        <div className={Styles.arquivoBotao}>
          <div className={Styles.dropzoneContainer}>
            <DropZone />
          </div>
          <div className={Styles.formWrapper}>
            <form action='' method=''>
              <h3 className={Styles.formTitle}>Risco</h3>
              <hr />
              <div className={Styles.debtAmountSlider}>
                <input type='radio' name='debt-amount' id='0' value='0' required />
                <label htmlFor='0' data-debt-amount='Não existe'></label>
                <input type='radio' name='debt-amount' id='1' value='1' required />
                <label htmlFor='1' data-debt-amount='Baixo'></label>
                <input type='radio' name='debt-amount' id='2' value='2' required />
                <label htmlFor='2' data-debt-amount='Médio'></label>
                <input type='radio' name='debt-amount' id='3' value='3' required />
                <label htmlFor='3' data-debt-amount='Alto'></label>
                <div className={Styles.debtAmountPos}></div>
              </div>
            </form>
          </div>
          <input type='button' value='Confirmar avaliação' className={Styles.buttonEnviar} />
        </div>
      </div>
      <Footer />
    </>
  )
}
export default AnaliseRisco
