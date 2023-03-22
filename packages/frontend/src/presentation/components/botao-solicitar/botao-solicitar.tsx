import Styles from './botao-solicitar-styles.scss'

import React from 'react'

const BotaoSolicitar: React.FC<{ description: string; isFeature: boolean }> = (props) => {
  const urlCriar: string = props.isFeature ? '/criarFeature' : '/criarHotfix'
  const title: string = props.isFeature ? 'Nova Feature' : 'Hotfix'

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
          <p>{props.description}</p>
        </div>
      </a>
    </div>
  )
}

export default BotaoSolicitar
