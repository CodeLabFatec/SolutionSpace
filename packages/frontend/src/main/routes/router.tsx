
import { MakeLogin, MakeTicketForm } from '@/main/factories/pages'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import { FormularioChamados, HomeSolicitantes } from '@/presentation/pages'
import AlinhamentoEstrategico from '@/presentation/pages/alinhamentoEstrategico/alinhamentoEstrategico'
import AnaliseRisco from '@/presentation/pages/analiseRisco/analiseRisco'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/ticket-form' element={<MakeTicketForm />} />
        <Route path='/login' element={<MakeLogin />} />
        <Route path='/formularioChamados' element={<FormularioChamados />} />
        <Route path='/home' element={<HomeSolicitantes />} />
        <Route path='/alinhamentoEstrategico' element={<AlinhamentoEstrategico />} />
        <Route path='/analiserisco' element={<AnaliseRisco />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
