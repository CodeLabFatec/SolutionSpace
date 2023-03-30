import { TipoChamado } from '@/main/enums/tipo-chamado'
import Styles from './chamado-styles.scss'

import React from 'react'
import { type ChamadoType } from '../lista-chamados/lista-chamados'

const Chamado: React.FC<{ chamado: ChamadoType }> = (props) => {
  const backgroundTipoChamado: any =
    props.chamado.type === TipoChamado.FEATURE ? { backgroundColor: '#308497' } : { backgroundColor: '#973030' }

  return (
    <div className={Styles.chamadoWrapper}>
      <div className={Styles.chamadoTagWrapper}>
        <div className={Styles.chamadoTagInfo} style={backgroundTipoChamado}>
          <p>{props.chamado.type.toString()}</p>
        </div>
      </div>
      <div className={Styles.chamadoInfo}>
        <p>{props.chamado.title}</p>
        <p>{props.chamado.date}</p>
      </div>
      <div className={Styles.chamadoStatusTagWrapper}>
        <div className={Styles.chamadoStatusTagInfo}>
          <p>{props.chamado.step}</p>
        </div>
      </div>
    </div>
  )
}

export default Chamado
