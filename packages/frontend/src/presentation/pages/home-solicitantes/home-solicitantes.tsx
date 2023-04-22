import { BotaoSolicitar } from '@/presentation/components'
import Styles from './home-solicitantes-styles.scss'

import React, { useContext } from 'react'
import { TipoChamado } from '@/main/enums'
import { AuthContext } from '@/main/contexts/authcontext'

const Home: React.FC = () => {

  const { user } = useContext(AuthContext)

  const BotaoUnicoHotfix = () => {
    if(user.group.canRequestHotfix && !user.group.canRequestFeatures){
      return (
        <div className={Styles.botoesHomeHotfix}>
          <BotaoSolicitar tipoChamado={TipoChamado.HOTFIX} />
        </div>
      )
    }
    return <></>
  }

  const BotaoUnicoFeature = () => {
    if(!user.group.canRequestHotfix && user.group.canRequestFeatures){
      return (
        <div className={Styles.botoesHomeHotfix}>
          <BotaoSolicitar tipoChamado={TipoChamado.FEATURE} />
        </div>
      )
    }
    return <></>
  }

  const BotaoGeral = () => {
    if(user.group.canRequestHotfix && user.group.canRequestFeatures){
      return (
        <div className={Styles.botoesHomeSolicitantes}>
          <BotaoSolicitar tipoChamado={TipoChamado.FEATURE} />
          <BotaoSolicitar tipoChamado={TipoChamado.HOTFIX} />
        </div>
      )
    }
    return <></>
  }

  return (
    <div className={Styles.container}> 
      {user.group.canRequestHotfix || user.group.canRequestFeatures ? (
        <>
          <div className={Styles.abrirChamadoLabel}>
            <h1>Abrir chamado</h1>
          </div>
          <div className={Styles.retanguloHomeSolicitantes}>
            <BotaoUnicoHotfix />
            <BotaoUnicoFeature />
            <BotaoGeral />
          </div>
        </>
      ) :
      <>
        <div className={Styles.abrirChamadoLabel}>
          <h1>Abrir chamado</h1>
          </div>
      </>}
    </div>
  )
}

export default Home
