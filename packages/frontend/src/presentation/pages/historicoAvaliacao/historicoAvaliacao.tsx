import { BotaoSolicitar } from '@/presentation/components'
import Styles from './historicoAvaliacao.scss'

import React, { useContext } from 'react'
import { TipoChamado } from '@/main/enums'
import { AuthContext } from '@/main/contexts/authcontext'
import CheckIcon from '@mui/icons-material/Check';
import EastIcon from '@mui/icons-material/East';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import FolderIcon from '@mui/icons-material/Folder';

const HistoricoAvaliacao: React.FC = () => {

  const { user } = useContext(AuthContext)

  return (
    <div className={Styles.container}>
      <div className={Styles.titleHistory}>
        <h1>titulo</h1>
        <hr />
      </div>
      <div className={Styles.relatorioAvaliacao}>
        <div className={Styles.cardIcon}>
          <CheckIcon className={Styles.icon} />
          <p>Aguardando alinhamento estratégico</p>
        </div>
        <div>
          <EastIcon className={Styles.arrowIcon} />
        </div>
        <div className={Styles.cardIcon}>
          <QuestionMarkIcon className={Styles.icon} />
          <p>Aguardando análise de risco</p>
        </div>
      </div>

      <div className={Styles.avaliacoes}>
        <div className={Styles.infos}>
          <p>Etapa: Aguardando alinhamento estratégico</p>
          <p>Avaliada em: 08/05/2023</p>
          <p>Usuário: Vitoria</p>
          <p>Nota: 2</p>
        </div>
        <div className={Styles.formAvaliado}>
          <div className={Styles.tituloDetalhe}>
            <label className={Styles.divCollapse}>
              <h4>Mais informações</h4>
              <input type="checkbox" />
              <div id={Styles.col3Content} className={Styles.collapse}>
                <label htmlFor="titulo">Título</label>
                <input
                  type="text"
                  // value={titulo}
                  // onChange={(e: any) => {
                  //   setTitulo(e.target.value);
                  // }}
                  className={Styles.inputTitulo}
                  id="titulo"
                  maxLength={40}
                  disabled
                />
                <label htmlFor="detalhes">Detalhes</label>
                <textarea
                  // value={detalhes}
                  // onChange={(e: any) => {
                  //   setDetalhes(e.target.value);
                  // }}
                  className={Styles.inputDetalhe}
                  name=""
                  id="detalhes"
                  cols={30}
                  rows={10}
                  disabled
                ></textarea>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Demonstração caso tenha alguma ainda não avaliada que não seja dps de Fechado*/}

      <div className={Styles.avaliacoes}>
        <div className={Styles.infos}>
          <p>Etapa: Aguardando análise de risco</p>
        </div>
      </div>


    </div>
  )
}

export default HistoricoAvaliacao
