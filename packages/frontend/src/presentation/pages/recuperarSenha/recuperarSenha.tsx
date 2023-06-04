import React, { useState } from 'react'
import Styles from './recuperarSenha.scss'
import { LogoMenor } from '@/presentation/components'
import { useAlert } from '@/main/services';
import { useNavigate } from 'react-router-dom'
import { updateUserByEmail } from '@/main/api/api';

const RecuperarSenha: React.FC = () => {

    const navigate = useNavigate()

    const [codigo, setCodigo] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const alert = useAlert()

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const accessCode = localStorage.getItem("accessCode") || ""

        const email = localStorage.getItem("emailToNewPassword") || ""

        if (codigo == null ||
            codigo === '' ||
            codigo === ' ' ||
            password == null ||
            password === '' ||
            password === ' ' ||
            passwordConfirm == null ||
            passwordConfirm === '' ||
            passwordConfirm === ' ') {

            alert.criarAlerta({
                icon: 'error',
                title: 'Opss...',
                html: 'Código ou senhas inválidos.'
            })
            return
        }

        if (password !== passwordConfirm) {
            alert.criarAlerta({
                icon: 'error',
                title: 'Opss...',
                html: 'As senhas não conferem. Por favor verifique as senhas e tente novamente.'
            })
            return
        }

        if (codigo !== accessCode) {
            alert.criarAlerta({
                icon: 'error',
                title: 'Opss...',
                html: 'O código não confere. Por favor verifique o código recebido por email e tente novamente.'
            })
            return
        }
        const updatedPassword = await updateUserByEmail(email, password).catch(error => {
            alert.criarAlerta({
                icon: 'error',
                title: 'Opss...',
                html: 'Ocorreu um erro durante a alteração da senha. Por favor tente novamente.'
            })
            return
        })

        if (updatedPassword) {
            alert.criarAlerta({
                icon: 'success',
                html: "Sua nova senha foi cadastrada com sucesso.",
                confirmAction: () => {
                    navigate("/login");
                }
            })
        }
    }

    const backHandler = (e: any) => {
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
                                type='text'
                                value={codigo}
                                onChange={(e) => {
                                    setCodigo(e.target.value)
                                }}
                            />
                            <span className={Styles.focus_input} data-placeholder='Código recebido por email'></span>
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
                            <span className={Styles.focus_input} data-placeholder='Nova senha'></span>
                        </div>
                        <div className={Styles.wrap_input}>
                            <input
                                className={Styles.input}
                                type='password'
                                value={passwordConfirm}
                                onChange={(e) => {
                                    setPasswordConfirm(e.target.value)
                                }}
                            />
                            <span className={Styles.focus_input} data-placeholder='Confirme a nova senha'></span>
                        </div>

                        <div className={Styles.container_login_form_btn}>
                            <button type='submit' className={Styles.login_form_btn}>
                                Confirmar
                            </button>
                        </div>
                        <div>
                            <button onClick={backHandler} className={Styles.send_email_back_form_btn}>
                                Voltar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RecuperarSenha
