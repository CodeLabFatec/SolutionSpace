import React, { useEffect, createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createSession, api } from '../api/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const AuthContext = createContext({} as any)

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user')

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser))
    }

    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await createSession(email, password)
      console.log(response.data)
      const loggedUser = response.data.user
      const token = response.data.token

      console.log(loggedUser)

      localStorage.setItem('user', JSON.stringify(loggedUser))
      localStorage.setItem('token', token)

      api.defaults.headers.Authorization = `Bearer ${token}`

      setUser(loggedUser)

      navigate('/home')

      // verificar pelo equipe (team) do usuário para qual página redirecioná-lo
    } catch (e: any) {
      console.log(e.response.data)
      const responseMessage = e.response.data
      let errorMessage

      if (responseMessage.includes('Email not found')) {
        errorMessage = 'Email ou senha incorreta.'
      } else if (responseMessage.includes('Incorrect password')) {
        errorMessage = 'Email ou senha incorreta.'
      } else {
        errorMessage = responseMessage
      }

      MySwal.fire({
        title: 'Erro',
        icon: 'error',
        html: errorMessage
      })
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    api.defaults.headers.Authorization = null

    setUser(null)

    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
