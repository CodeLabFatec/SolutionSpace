import { Logo } from '@/presentation/components'
import Styles from './header-styles.scss'

import React, { useContext } from 'react'
import { AuthContext } from '@/main/contexts/authcontext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Header: React.FC = () => {
  const { logout, user} = useContext(AuthContext)

  const handleLogout = (e: any) => {
    e.preventDefault()
 

    MySwal.fire({
      title: 'Aviso',
      html: 'Deseja sair?',
      focusConfirm: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#A9A9A9',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#4FB4BC',
      width: '350px',
      background:'#FAF0E6',
      color: '#000',
      reverseButtons: true
    }).then((r) => {
      if (r.isConfirmed) {
        logout()
      }
    })
  }

  return (
    <div className={Styles.nav}>
      <div className={Styles.logo}>
        <Logo></Logo>
      </div>
      <div className={Styles.userConnected}>
        <p>Bem vindo, {user.name} </p>
        <hr />
      </div>
      <div onClick={handleLogout} className={Styles.logout}>
        <i id={Styles.logout} className="material-icons">exit_to_app</i>
      </div>
    </div>
  )
}

export default Header
