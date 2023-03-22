import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import { FormularioChamados } from '@/presentation/pages'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/formularioChamados' element={<FormularioChamados />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
