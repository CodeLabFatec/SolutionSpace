/* eslint-disable react/jsx-no-undef */
import { Logo } from '../Logo';
import './header.css';

export const Header = () => {
    return (
        <>
            <div className="nav">
                <div className='formButton'>
                    <i className="material-icons" id='iconHome'>home</i>
                </div>
                <div className='logo'>
                    <Logo></Logo>
                </div>
                <div className='userConnected'>
                    <p>Bem vindo, User</p>
                    <hr />
                </div>
                <div className='logout'>
                    <p>Sair</p>
                </div>
                <div className='chamados'>
                    <p>Meus chamados</p>
                </div>
            </div>
        </>
    )
}