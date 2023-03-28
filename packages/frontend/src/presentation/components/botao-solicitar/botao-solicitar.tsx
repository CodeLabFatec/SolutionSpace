import { TipoChamado } from '@/main/enums/tipo-chamado'
import Styles from './botao-solicitar-styles.scss'

import React from 'react'

const BotaoSolicitar: React.FC<{ tipoChamado: TipoChamado }> = (props) => {
  const urlCriar: string = props.tipoChamado === TipoChamado.FEATURE ? '/criarFeature' : '/criarHotfix'
  const description: string =
    props.tipoChamado === TipoChamado.FEATURE
      ? 'Clique aqui para abrir uma solicitação para o desenvolvimento de uma nova Feature para o sistema.'
      : 'Clique aqui para abrir uma solicitação para o desenvolvimento de uma Hotfix para o sistema.'
  const title: string = props.tipoChamado.toString()

  return (
    <div className='teste'>
      <div className={Styles.linhas}>
        <h1>{title}</h1>
        <hr />
        <div className={Styles.linha2}></div>
      </div>
      <a href={urlCriar} className={Styles.cardBotaoSolicitar}>
        <div className={Styles.iconeBotaoSolicitar}>
          <i className='large material-icons'>add_circle_outline</i>
        </div>
        <div className={Styles.textBotaoSolicitar}>
          <p>{description}</p>
        </div>
      </a>
    </div>
  )
}

export default BotaoSolicitar
