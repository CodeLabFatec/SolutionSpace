import { Header, InfoChamado, ListaChamados } from '@/presentation/components'
import Styles from './chamados-styles.scss'

import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/main/contexts/authcontext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ChamadoType } from '@/presentation/components/lista-chamados/lista-chamados'

const MySwal = withReactContent(Swal)

const Chamados: React.FC = () => {
  const { user } = useContext(AuthContext)
  const [chamado, setChamado] = useState<ChamadoType>()

  useEffect(() => {}, [])

  return (
    <>
      <Header exibirHome={true} />
      <div className={Styles.chamadosWrapper}>
        <ListaChamados chamadoState={setChamado} />
        <InfoChamado chamado={chamado} />
      </div>
    </>
  )
}

export default Chamados
