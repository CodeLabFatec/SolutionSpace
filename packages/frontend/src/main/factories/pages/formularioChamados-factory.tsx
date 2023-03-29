import { TipoChamado } from '@/main/enums/tipo-chamado'
import { FormularioChamados } from '@/presentation/pages'

import React from 'react'

export const MakeFormularioChamados: React.FC<{ tipoChamado: TipoChamado }> = (props) => {
  return <FormularioChamados tipoChamado={props.tipoChamado} />
}
