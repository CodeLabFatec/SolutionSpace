/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header } from '@/presentation/components'
import Styles from './alinhamentoEstrategico.scss'

import React from 'react'
import DropZone from '@/presentation/components/dropzone/dropzone'
import Footer from '@/presentation/components/footer/footer'
import { MultiSelect } from '@/presentation/components/multipleSelect/multipleSelect'

const AlinhamentoEstrategico: React.FC = () => {
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
        </div>
        <div className={Styles.arquivoBotao}>
          <div className={Styles.dropzoneContainer}>
            <DropZone />
          </div>
          <label htmlFor='equipe'>Equipe</label>
          {/* <input type='text' className={Styles.equipe} id='equipe' required maxLength={60} /> */}
          <MultiSelect />

          <label htmlFor='grupo'>Grupo</label>
          <input type='text' className={Styles.grupo} id='grupo' required maxLength={60} />

          <input type='button' value='Enviar' className={Styles.buttonEnviar} />
        </div>
      </div>
      <Footer />
    </>
  )
}
export default AlinhamentoEstrategico
