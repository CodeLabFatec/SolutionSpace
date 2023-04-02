import { Header, InfoChamado, ListaChamados } from '@/presentation/components'
import Styles from './chamados-styles.scss'

import React, { useEffect, useState } from 'react'
import { ChamadoType } from '@/presentation/components/lista-chamados/lista-chamados'
import { VisualizarChamado } from '@/main/enums/visualizar-chamado'

const Chamados: React.FC<{ visualizacaoChamado: VisualizarChamado }> = (props) => {
  const [chamado, setChamado] = useState<ChamadoType>()

  useEffect(() => {
    setChamado(undefined)
  }, [props])

  return (
    <>
      <Header exibirHome={true} />
      <div className={Styles.chamadosWrapper}>
        <ListaChamados chamadoState={setChamado} visualizacaoChamado={props.visualizacaoChamado} />
        <InfoChamado chamado={chamado} visualizacaoChamado={props.visualizacaoChamado} />
      </div>
    </>
  )
}

export default Chamados
