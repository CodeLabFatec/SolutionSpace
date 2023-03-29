import { MakeLogin, MakeTicketForm } from '@/main/factories/pages'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React, { useContext } from 'react'
import { FormularioChamados, HomeSolicitantes } from '@/presentation/pages'
import AlinhamentoEstrategico from '@/presentation/pages/alinhamentoEstrategico/alinhamentoEstrategico'
import AnaliseRisco from '@/presentation/pages/analiseRisco/analiseRisco'
import { AuthProvider, AuthContext } from '../contexts/authcontext'

const Router: React.FC = () => {
  const Private = ({ children }: any) => {
    const { authenticated, loading } = useContext(AuthContext)

    if (loading) {
      return <div className='loading'>Carregando...</div>
    }

    if (!authenticated) {
      return <Navigate to='/login' />
    }

    return children
  }

  const Origin = ({ children }: any) => {
    const { authenticated, loading } = useContext(AuthContext)

    if (loading) {
      return <div className='loading'>Carregando...</div>
    }

    if (!authenticated) {
      return <Navigate to='/login' />
    }

    // Verificar o team do user para redirecioná-lo à página correta.
    return children
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            index
            element={
              <Origin>
                <Navigate to='/home' />
              </Origin>
            }
          ></Route>
          <Route path='/ticket-form' element={<MakeTicketForm />} />
          <Route path='/login' element={<MakeLogin />} />
          <Route
            path='/formularioChamados'
            element={
              <Private>
                <FormularioChamados />
              </Private>
            }
          />
          <Route
            path='/home'
            element={
              <Private>
                <HomeSolicitantes />
              </Private>
            }
          />
          <Route
            path='/alinhamentoEstrategico'
            element={
              <Private>
                <AlinhamentoEstrategico />
              </Private>
            }
          />
          <Route
            path='/analiserisco'
            element={
              <Private>
                <AnaliseRisco />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Router
