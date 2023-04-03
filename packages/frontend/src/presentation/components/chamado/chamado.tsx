/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { TipoChamado } from '@/main/enums/tipo-chamado'
import Styles from './chamado-styles.scss'

import React from 'react'
import { type ChamadoType } from '../lista-chamados/lista-chamados'

const Chamado: React.FC<{ chamado: ChamadoType }> = (props) => {
  const backgroundTipoChamado: any =
    props.chamado.requestType === TipoChamado.FEATURE ? { backgroundColor: '#308497' } : { backgroundColor: '#973030' }

  const backgroundStatusChamado: any =
    props.chamado.status === 'Aberto'
      ? { backgroundColor: '#007bff' }
      : props.chamado.status === 'Aguardando análise'
      ? { backgroundColor: '#ffb300' }
      : props.chamado.status === 'Aprovado'
      ? { backgroundColor: '#28a745' }
      : { backgroundColor: '#6c757d' }

  const date = new Date(props.chamado.created_at)

  function adicionaZero(numero: number): any {
    if (numero <= 9) return '0' + numero
    else return numero
  }

  const formatedDate =
    adicionaZero(date.getDate()) + '/' + adicionaZero(date.getMonth() + 1) + '/' + date.getFullYear().toString()

  return (
    <div className={Styles.chamadoWrapper}>
      <div className={Styles.chamadoTagWrapper}>
        <div className={Styles.chamadoTagInfo} style={backgroundTipoChamado}>
          <p>{props.chamado.requestType.toString()}</p>
        </div>
      </div>
      <div className={Styles.chamadoInfo}>
        <p>{props.chamado.title}</p>
        <p>{formatedDate}</p>
      </div>
      <div className={Styles.chamadoStatusTagWrapper}>
        <div className={Styles.chamadoStatusTagInfo} style={backgroundStatusChamado}>
          <p>{props.chamado.status}</p>
        </div>
      </div>
    </div>
  )
}

export default Chamado
