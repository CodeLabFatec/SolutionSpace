/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from 'react-router-dom';
import './formularioChamados.css';


export const formularioChamados = () => {
    const history = useNavigate();

    const handleLogout = () => {
        history('./');
    }

    const handleGoBack = () => {
        history('./');
    }

    return (
        <>
        
        </>
    )
}