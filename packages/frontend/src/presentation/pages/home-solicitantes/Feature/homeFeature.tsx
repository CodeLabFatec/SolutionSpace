import { BotaoSolicitar } from '@/presentation/components'
import Styles from './homeFeature.scss'

import React from 'react'
import { TipoChamado } from '@/main/enums/tipo-chamado'

const HomeFeature: React.FC = () => {
  return (
    <div className={Styles.container}> 
      <div className={Styles.abrirChamadoLabel}>
        <h1>Abrir chamado</h1>
      </div>
      <div className={Styles.retanguloHomeSolicitantes}>
        <div className={Styles.botoesHomeFeature}>
          <BotaoSolicitar tipoChamado={TipoChamado.FEATURE} />
        </div>
      </div>
    </div>
  )
}

export default HomeFeature
