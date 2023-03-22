import { Header } from '@/presentation/components'
import './ticket-form-styles.css'

import React from 'react'
import DropZone from '@/presentation/components/dropzone/dropzone'

const TicketForm: React.FC = () => {
  return (
    <div>
      <Header />
      <div>TicketForm Page</div>
      <DropZone />
    </div>
  )
}

export default TicketForm
