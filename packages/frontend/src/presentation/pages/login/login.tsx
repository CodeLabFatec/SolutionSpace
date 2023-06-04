import React, { useState, useContext } from 'react'
import Styles from './login.scss'
import { LogoMenor } from '@/presentation/components'
import { AuthContext } from '@/main/contexts/authcontext'
import { useAlert } from '@/main/services';
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {

  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const alert = useAlert()

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (email == null || email === '' || email === ' ' || password == null || password === '' || password === ' ') {

      alert.criarAlerta({
        title: 'Opss...',
        html: 'E-mail ou senha inválidos.'
      })
      return
    }


    login(email, password)
  }

  const passwordRecoveryHandler = (e: any) => {
    e.preventDefault();

    navigate('/enviarCodigo')
  };

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
              <span className={Styles.focus_input} data-placeholder='Endereço de e-mail'></span>
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
            <div>
              <button onClick={passwordRecoveryHandler} className={Styles.recovery_password_form_btn}>
                Esqueci minha senha
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
