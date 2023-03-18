/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from 'react-router-dom'
import './formularioChamados.css'

export const formularioChamados = (): JSX.Element => {
  const history = useNavigate()

  const handleLogout = (): void => {
    history('./')
  }

  const handleGoBack = (): void => {
    history('./')
  }

  return <></>
}
