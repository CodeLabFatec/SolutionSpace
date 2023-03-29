import React, { useState, useContext, useEffect } from 'react'
import Styles from './login.scss'
import LogoMenor from '@/presentation/components/logomenor/logomenor'
import { AuthContext } from '@/main/contexts/authcontext'

const Login: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { authenticated, login } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()

    login(email, password)
  }

  return (
    <div className={Styles.imagem}>
      <div className={Styles.container_login}>
        <div className={Styles.wrap_login}>
          <form className={Styles.login_form} onSubmit={handleSubmit}>
            <LogoMenor className={Styles.logomenor} />
            <span className={Styles.login_form_title}>Ionic Health™</span>
            <div className={Styles.wrap_input}>
              <input
                className={Styles.input}
                type='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              <span className={Styles.focus_input} data-placeholder='Endereço de email'></span>
            </div>
            <div className={Styles.wrap_input}>
              <input
                className={Styles.input}
                type='password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <span className={Styles.focus_input} data-placeholder='Sua senha'></span>
            </div>

            <div className={Styles.container_login_form_btn}>
              <button type='submit' className={Styles.login_form_btn}>
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
