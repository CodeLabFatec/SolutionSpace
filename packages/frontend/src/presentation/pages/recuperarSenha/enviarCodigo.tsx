import React, { useState } from 'react'
import Styles from './enviarCodigo.scss'
import { LogoMenor } from '@/presentation/components'
import { useAlert } from '@/main/services';
import { useNavigate } from 'react-router-dom'
import { enviarEmailRecuperarSenha, getUserByEmail } from '@/main/api/api';

const EnviarCodigo: React.FC = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const alert = useAlert()

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (email == null || email === '' || email === ' ') {

            alert.criarAlerta({
                icon: 'error',
                title: 'Opss...',
                html: 'E-mail inválido.'
            })
            return
        }

        const user = await getUserByEmail(email).catch(error => {
            alert.criarAlerta({
                icon: 'error',
                html: "Email não encontrado. Por favor verifique o email e tente novamente.",
            })
            return
        })

        if (user) {
            const accessCode = await enviarEmailRecuperarSenha(email).catch(error => {
                alert.criarAlerta({
                    icon: 'error',
                    html: "Um erro ocorreu ao tentar enviar o email, por favor verifique o email e tente novamente.",
                })
                return
            });

            if (accessCode) {
                localStorage.setItem("accessCode", accessCode.data.accessCode)
                localStorage.setItem("emailToNewPassword", email)

                alert.criarAlerta({
                    icon: 'success',
                    html: "Um Email com um código para alteração de senha foi enviado para você.",
                    confirmAction: () => {
                        navigate("/recuperarSenha");
                    }
                })
            }
        }
    }

    const backHandler = (e: any) => {
        e.preventDefault();

        navigate('/login')
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
                        <div className={Styles.container_login_form_btn}>
                            <button type='submit' className={Styles.login_form_btn}>
                                Enviar Email
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

export default EnviarCodigo
