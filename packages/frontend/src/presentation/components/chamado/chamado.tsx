import { TipoChamado } from '@/main/enums/tipo-chamado'
import Styles from './chamado-styles.scss'

import React from 'react'
import { ChamadoType } from '@/main/types'
import moment from 'moment'

const Chamado: React.FC<{ chamado: ChamadoType }> = (props) => {
  const backgroundTipoChamado: any =
    props.chamado.requestType === TipoChamado.FEATURE ? { backgroundColor: '#308497' } : { backgroundColor: '#973030' }

  const backgroundStatusChamado: any =
    props.chamado.status 
      ? { backgroundColor: props.chamado.status.color }   
      : { backgroundColor: '#007bff' }

  return (
    <div className={Styles.chamadoWrapper}>
      <div className={Styles.chamadoTagWrapper}>
        <div className={Styles.chamadoTagInfo} style={backgroundTipoChamado}>
          <p>{props.chamado.requestType.toString()}</p>
        </div>
      </div>
      <div className={Styles.chamadoInfo}>
        <p>{props.chamado.title}</p>
        <p>{moment(props.chamado.created_at).format('DD/MM/YYYY')}</p>
      </div>
      <div className={Styles.chamadoStatusTagWrapper}>
        <div className={Styles.chamadoStatusTagInfo} style={backgroundStatusChamado}>
          <p>{props.chamado.status ? props.chamado.status.status : 'Aberto'}</p>
        </div>
      </div>
    </div>
  )
}

export default Chamado
