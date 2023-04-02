import { VisualizarChamado } from '@/main/enums/visualizar-chamado'
import { Chamados } from '@/presentation/pages'

import React from 'react'

export const MakeChamados: React.FC<{ visualizacaoChamados: VisualizarChamado }> = (props) => {
  return <Chamados visualizacaoChamado={props.visualizacaoChamados} />
}
