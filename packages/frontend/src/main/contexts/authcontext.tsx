import { useEffect, createContext, useState } from 'react'
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
    const recoveredToken = localStorage.getItem('token')

    if (recoveredUser && recoveredToken) {
      setUser(JSON.parse(recoveredUser))
      api.defaults.headers.Authorization = `Bearer ${recoveredToken}`
      api.defaults.headers.common = { Authorization: `Bearer ${recoveredToken}` }
      api.defaults.withCredentials = true
    }

    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await createSession(email, password)
      const loggedUser = response.data.user
      const token = response.data.token

      localStorage.setItem('user', JSON.stringify(loggedUser))
      localStorage.setItem('token', token)

      api.defaults.headers.Authorization = `Bearer ${token}`
      api.defaults.headers.common = { Authorization: `Bearer ${token}` }
      api.defaults.withCredentials = true

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
    api.defaults.headers.common = { Authorization: `` }
    api.defaults.withCredentials = false

    setUser(null)

    navigate('/login')
  }

  return (
    
    <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
