/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header } from '@/presentation/components'
import Styles from './formularioChamados.scss'

import React from 'react'

export const FormularioChamados: React.FC = () => {
  return (
    <>
      <Header />
      <div className={Styles.H1formularioChamados}>
        <h1>Nova feature</h1>
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
          {/*   <label htmlFor="selecaoArquivo" className={Styles.selecionarArquivo}>
            <i className="materialicons">image</i>
            <span className={Styles.picture__image}></span>
          </label>
          <input
            type="file"
            name="files"
            accept=".png"
            multiple
            id="selecaoArquivo"
            capture="environment"
          /> */}

          <input type='button' value='Cancelar' />
          <input type='button' value='Enviar para o comitê de aprovação' />
        </div>
      </div>
    </>
  )
}
