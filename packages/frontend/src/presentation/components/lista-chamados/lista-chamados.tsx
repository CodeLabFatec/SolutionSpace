/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Styles from './lista-chamados.scss'

import React, { useContext, useEffect, useState } from 'react'
import Chamado from '@/presentation/components/chamado/chamado'
import { TipoChamado } from '@/main/enums/tipo-chamado'
import { VisualizarChamado } from '@/main/enums/visualizar-chamado'
import { getAllRequests, getAllRequestsByUser } from '@/main/api/api'
import { AuthContext } from '@/main/contexts/authcontext'
import { ChamadoType } from '@/main/types'

const ListaChamados: React.FC<{ chamadoState: any; visualizacaoChamado: VisualizarChamado }> = (props) => {
  const [chamados, setChamados] = useState<ChamadoType[]>([])
  const [chamadosFiltrados, setChamadosFiltrados] = useState<ChamadoType[]>([])
  const { user } = useContext(AuthContext)

  const loadChamados = async () => {
    try {
      if (props.visualizacaoChamado === VisualizarChamado.MEUS_CHAMADOS) {
        const response = await getAllRequestsByUser(user.user_id)

        setChamados(response.data)
        setChamadosFiltrados(response.data)
      } else if (props.visualizacaoChamado === VisualizarChamado.TODOS_CHAMADOS) {
        const response = await getAllRequests()

        setChamados(response.data)
        setChamadosFiltrados(response.data)
      }
    } catch (e: any) {
      console.log(e.response.data.message)
    }
  }

  useEffect(() => {
    loadChamados()
  }, [props])

  const changeFilter: any = (event: any) => {
    const filter = event.target.value.toLowerCase()
    if (filter !== undefined && filter !== null) {
      if (filter.toLowerCase() === 'feature' || filter.toLowerCase() === 'nova feature') {
        const filteredList = chamados.filter((x) => x.requestType === TipoChamado.FEATURE)
        setChamadosFiltrados(filteredList)
      } else if (filter.toLowerCase() === 'hotfix') {
        const filteredList = chamados.filter((x) => x.requestType === TipoChamado.HOTFIX)
        setChamadosFiltrados(filteredList)
      } else {
        const filteredList = chamados.filter(
          (x) => x.title.toLowerCase().includes(filter) || filter.includes(x.title.toLowerCase())
        )
        setChamadosFiltrados(filteredList)
      }
    }
  }

  return (
    <div className={Styles.listaChamadosWrapper}>
      <div className={Styles.listaChamadosHeader}>
        <div className={Styles.listaChamadosHeaderSwitch}>
          <i className='large material-icons'>dehaze</i>
        </div>
      </div>
      <div className={Styles.listaChamadosPack}>
        <div className={Styles.listaChamadosFiltro}>
          <input onChange={changeFilter} type='text' />
          <div className={Styles.listaChamadosFiltroIcon}>
            <i className='large material-icons'>filter_list</i>
          </div>
        </div>
        {chamadosFiltrados.map((item) => (
          // eslint-disable-next-line react/jsx-key
          <div
            key={item.request_id}
            onClick={() => {
              props.chamadoState(item)
            }}
          >
            <Chamado chamado={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListaChamados
