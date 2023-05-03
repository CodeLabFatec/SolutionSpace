import { Logo } from '@/presentation/components'
import Styles from './header-styles.scss'

import React, { useContext } from 'react'
import { AuthContext } from '@/main/contexts/authcontext'
import { useAlert } from '@/main/services'

const Header: React.FC = () => {
  const { logout, user } = useContext(AuthContext)
  const alert = useAlert()

  const handleLogout = (e: any) => {
    e.preventDefault()
 
    alert.criarConfirmacao({
      title: "Aviso",
      html: 'Deseja sair?',
      confirmAction: () => {
        logout();
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
