import React, { useState } from 'react'
import Styles from './login.scss'
import LogoMenor from '@/presentation/components/logomenor/logomenor'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className={Styles.container}>
      <div className={Styles.container_login}>
        <div className={Styles.wrap_login}>
          <form className={Styles.login_form}>
            <LogoMenor className={Styles.logomenor} />
            <span className={Styles.login_form_title}>Ionic Health™</span>
            <span className={Styles.login_form_title}></span>
            <div className={Styles.wrap_input}>
              <input className={Styles.input} type='email' value={email} onChange={(e) => { setEmail(e.target.value); }} />
              <span className={Styles.focus_input} data-placeholder='Endereço de email'></span>
            </div>
            <div className={Styles.wrap_input}>
              <input
                className={Styles.input}
                type='password'
                value={password}
                onChange={(e) => { setPassword(e.target.value); }}
              />
              <span className={Styles.focus_input} data-placeholder='Sua senha'></span>
            </div>

            <div className={Styles.container_login_form_btn}>
              <button className={Styles.login_form_btn}>Entrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
