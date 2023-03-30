/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Styles from './lista-chamados.scss'

import React, { useEffect, useState } from 'react'
import Chamado from '@/presentation/components/chamado/chamado'
import { TipoChamado } from '@/main/enums/tipo-chamado'
import { VisualizarChamado } from '@/main/enums/visualizar-chamado'

export type ChamadoType = {
  id: string
  title: string
  description: string
  status: number
  type: TipoChamado
  date: string
  step: string
}

const ListaChamados: React.FC<{ chamadoState: any; visualizacaoChamado: VisualizarChamado }> = (props) => {
  const [chamados, setChamados] = useState<ChamadoType[]>([])
  const [chamadosFiltrados, setChamadosFiltrados] = useState<ChamadoType[]>([])

  useEffect(() => {
    const teste: ChamadoType[] = []
    teste.push({
      id: '111',
      title: 'CLB/01: Homepage',
      description: 'Desenvolver a homepage da aplicação',
      status: 0,
      type: TipoChamado.FEATURE,
      date: '27/03/23',
      step: 'Aguardando análise'
    })
    teste.push({
      id: '112',
      title: 'CLB/02: Página de login',
      description: 'Desenvolver a página de login da aplicação',
      status: 0,
      type: TipoChamado.FEATURE,
      date: '26/03/23',
      step: 'Análise de Risco'
    })
    teste.push({
      id: '113',
      title: 'FIX/01: Título página',
      description: 'Corrigir o título da aplicação',
      status: 0,
      type: TipoChamado.HOTFIX,
      date: '25/03/23',
      step: 'Alinhamento Estratégico'
    })
    teste.push({
      id: '114',
      title: 'FIX/01: Título página',
      description: 'Corrigir o título da aplicação',
      status: 0,
      type: TipoChamado.HOTFIX,
      date: '25/03/23',
      step: 'Alinhamento Estratégico'
    })
    teste.push({
      id: '115',
      title: 'FIX/01: Título página',
      description: 'Corrigir o título da aplicação',
      status: 0,
      type: TipoChamado.HOTFIX,
      date: '25/03/23',
      step: 'Descartado'
    })
    teste.push({
      id: '116',
      title: 'FIX/01: Título página',
      description: 'Corrigir o título da aplicação',
      status: 0,
      type: TipoChamado.HOTFIX,
      date: '25/03/23',
      step: 'Descartado'
    })

    setChamados(teste)
    setChamadosFiltrados(teste)
  }, [props])

  const changeFilter: any = (event: any) => {
    const filter = event.target.value
    if (filter !== undefined && filter !== null) {
      if (filter.toLowerCase() === 'feature' || filter.toLowerCase() === 'nova feature') {
        const filteredList = chamados.filter((x) => x.type === TipoChamado.FEATURE)
        setChamadosFiltrados(filteredList)
      } else if (filter.toLowerCase() === 'hotfix') {
        const filteredList = chamados.filter((x) => x.type === TipoChamado.HOTFIX)
        setChamadosFiltrados(filteredList)
      } else {
        const filteredList = chamados.filter((x) => x.title.includes(filter) || filter.includes(x.title))
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
            key={item.id}
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
