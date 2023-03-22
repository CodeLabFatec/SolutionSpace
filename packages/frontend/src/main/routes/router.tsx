import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import { FormularioChamados, HomeSolicitantes } from '@/presentation/pages'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/formularioChamados' element={<FormularioChamados />} />
        <Route path='home' element={<HomeSolicitantes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
