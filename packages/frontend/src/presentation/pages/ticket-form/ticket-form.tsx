import { Header } from '@/presentation/components'
import InfoChamado from '@/presentation/components/info-chamado/info-chamado'
import ListaChamados, { type ChamadoType } from '@/presentation/components/lista-chamados/lista-chamados'
import Styles from './ticket-form-styles.scss'

import React, { useEffect, useState } from 'react'
import Footer from '@/presentation/components/footer/footer'

const TicketForm: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chamado, setChamado] = useState<ChamadoType>()

  useEffect(() => {}, [])

  return (
    <div>
      <Header />
      <div className={Styles.ticketFormWrapper}>
        <ListaChamados chamadoState={setChamado} />
        <InfoChamado chamado={chamado} />
      </div>
      <Footer />
    </div>
  )
}

export default TicketForm
