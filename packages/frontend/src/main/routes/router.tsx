import { MakeTicketForm } from '@/main/factories/pages'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import { HomeSolicitantes } from '@/presentation/pages'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/ticket-form' element={<MakeTicketForm />} />
        <Route path='home' element={<HomeSolicitantes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
