import { BotaoSolicitar } from '@/presentation/components'
import Styles from './homeHotfix.scss'

import React from 'react'
import Footer from '@/presentation/components/footer/footer'
import { TipoChamado } from '@/main/enums/tipo-chamado'

const HomeHotfix: React.FC = () => {
  return (
    <div className={Styles.container}> 
      <div className={Styles.abrirChamadoLabel}>
        <h1>Abrir chamado</h1>
      </div>
      <div className={Styles.retanguloHomeSolicitantes}>
        <div className={Styles.botoesHomeHotfix}>
          <BotaoSolicitar tipoChamado={TipoChamado.HOTFIX} />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default HomeHotfix
