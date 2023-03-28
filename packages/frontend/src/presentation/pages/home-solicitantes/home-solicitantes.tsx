import { BotaoSolicitar, Header } from '@/presentation/components'
import Styles from './home-solicitantes-styles.scss'

import React from 'react'
import Footer from '@/presentation/components/footer/footer'

const HomeSolicitantes: React.FC = () => {
  return (
    <div>
      <Header />
      <div className={Styles.abrirChamadoLabel}>
        <h1>Abrir chamado</h1>
      </div>
      <div className={Styles.retanguloHomeSolicitantes}>
        <div className={Styles.botoesHomeSolicitantes}>
          <BotaoSolicitar
            isFeature={true}
            description='Clique aqui para abrir uma solicitação para o desenvolvimento de uma nova Feature para o sistema.'
          />
          <BotaoSolicitar
            isFeature={false}
            description='Clique aqui para abrir uma solicitação para o desenvolvimento de uma Hotfix para o sistema.'
          />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default HomeSolicitantes
