import { Logo } from '@/presentation/components'
import Styles from './header-styles.scss'

import React, { useContext } from 'react'
import { AuthContext } from '@/main/contexts/authcontext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'

const MySwal = withReactContent(Swal)

const Header: React.FC<{ exibirHome: boolean }> = (props) => {
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)

  const handleRequests = (e: any) => {
    e.preventDefault()

    navigate('/requests')
  }

  const handleHome = (e: any) => {
    e.preventDefault()

    navigate('/home')
  }

  const handleLogout = (e: any) => {
    e.preventDefault()

    MySwal.fire({
      title: 'Aviso',
      html: 'Deseja sair da sua conta?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sair',
      confirmButtonColor: '#76ba1b',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#ff0000'
    }).then((r) => {
      if (r.isConfirmed) {
        logout()
      }
    })
  }

  const exibirHomeButton = () => {
    if (props.exibirHome) {
      return (
        <div onClick={handleHome} className={Styles.formButton}>
          <i className='material-icons' id={Styles.iconHome}>
            home
          </i>
        </div>
      )
    }
    return <div style={{ width: '105px' }}></div>
  }

  return (
    <div className={Styles.nav}>
      {exibirHomeButton()}
      <div className={Styles.logo}>
        <Logo></Logo>
      </div>
      <div className={Styles.userConnected}>
        <p>Bem vindo, {user.name}</p>
        <hr />
      </div>
      <div onClick={handleLogout} className={Styles.logout}>
        <p>Sair</p>
      </div>
      <div onClick={handleRequests} className={Styles.chamados}>
        <p>Meus chamados</p>
      </div>
    </div>
  )
}

export default Header
