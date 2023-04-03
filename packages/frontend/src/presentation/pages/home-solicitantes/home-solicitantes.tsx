import { BotaoSolicitar, Header } from '@/presentation/components'
import Styles from './home-solicitantes-styles.scss'

import React from 'react'
import Footer from '@/presentation/components/footer/footer'
import { TipoChamado } from '@/main/enums/tipo-chamado'

const HomeSolicitantes: React.FC = () => {
  return (
    <div>
      <Header exibirHome={false} />
      <div className={Styles.abrirChamadoLabel}>
        <h1>Abrir chamado</h1>
      </div>
      <div className={Styles.retanguloHomeSolicitantes}>
        <div className={Styles.botoesHomeSolicitantes}>
          <BotaoSolicitar tipoChamado={TipoChamado.FEATURE} />
          <BotaoSolicitar tipoChamado={TipoChamado.HOTFIX} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HomeSolicitantes
