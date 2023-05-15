import Styles from './historicoAvaliacao.scss'

import React, { useEffect, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import EastIcon from '@mui/icons-material/East';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import FolderIcon from '@mui/icons-material/Folder';
import { useLocation } from 'react-router-dom';
import { useAlert, useDownload } from '@/main/services';
import { getRatingsByRequest } from '@/main/api/api';
import moment from 'moment';

const HistoricoAvaliacao: React.FC = () => {

  const location = useLocation()
  const download = useDownload()
  const alert = useAlert()
  let chamado = location.state
  const [avaliacoes,setAvaliacoes] = useState([] as any[])

  useEffect(()=> {
    if(location.state == null){
      alert.criarAlerta({
        icon: 'error',
        html: 'Nenhum chamado encontrado para listar as avaliações.'
      })
      return
    }

    loadAvaliacoes()
  }, [])

  const loadAvaliacoes = async () => {
    const ratings = await getRatingsByRequest(location.state.request_id)
    setAvaliacoes(ratings.data);
    console.log(ratings.data)
  }

  const handleDownload = (e: any, rating: any) => {
    e.preventDefault();

    if (rating.files.length <= 0) return;

    rating.files.forEach(async (file: any) => {
      await download.download(file.ext, file.base64, file.file_name);
    });
  };

  const ExibirAvaliacoes = () => {
    if(avaliacoes.length === 0){
      return <AvaliacaoDefault />
    }

    return (
    <>
      {avaliacoes.map((item: any, index: number) => {
        chamado = item.request
        const isLastElement = avaliacoes.length == (index + 1)

        if(item.requestStep === 'Analise de risco'){
          return (
            <React.Fragment key={item.rating_id}>
              {chamado.requestStep === 'Analise de risco' ? 
                chamado.arquived ?
                <>               
                  <div className={Styles.cardIcon}>
                    <FolderIcon className={Styles.icon} />
                    <p>Arquivado na análise de risco</p>
                  </div>
                  {isLastElement ? 
                  <></> : <div>
                    <EastIcon className={Styles.arrowIcon} />
                  </div>}
                </>
                :
                <>
                  <div className={Styles.cardIcon}>
                    <QuestionMarkIcon className={Styles.icon} />
                    <p>Aguardando análise de risco</p>
                  </div>
                  <div>
                    <EastIcon className={Styles.arrowIcon} />
                  </div>
                </>
                :
                <>
                  <div className={Styles.cardIcon}>
                    <CheckIcon className={Styles.icon} />
                    <p>Aprovado na análise de risco</p>
                  </div>
                  <div>
                    <EastIcon className={Styles.arrowIcon} />
                  </div>
                </>
              }
            </React.Fragment>
          )
        }

        return (
          <>
            <div key={item.rating_id} className={Styles.cardIcon}>
              {chamado.approved ? 
              <>
                <CheckIcon className={Styles.icon} />
                <p>Aprovado no alinhamento estratégico</p>
              </> 
              : 
              chamado.arquived ?
              <>
                <FolderIcon className={Styles.icon} />
                <p>Arquivado no alinhamento estratégico</p>
              </> 
              :
              <>
                <QuestionMarkIcon className={Styles.icon} />
                <p>Aguardando alinhamento estratégico</p>
              </>}
            </div>
            {isLastElement ? 
              <></> : <div>
                <EastIcon className={Styles.arrowIcon} />
              </div>}
          </>
        )
      })}
    </>)
  }

  const AvaliacaoDefault = () => {
    if(chamado.requestStep === 'Analise de risco'){
      return (
        <>
          <div className={Styles.cardIcon}>
            <QuestionMarkIcon className={Styles.icon} />
            <p>Aguardando análise de risco</p>
          </div>
          <div>
            <EastIcon className={Styles.arrowIcon} />
          </div>
        </>
      )
    }
    return (
      <div className={Styles.cardIcon}>
        <QuestionMarkIcon className={Styles.icon} />
        <p>Aguardando alinhamento estratégico</p>
      </div>
    )
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.titleHistory}>
        <h1>{chamado.title}</h1>
        <hr />
      </div>
      <div className={Styles.relatorioAvaliacao}>

        <ExibirAvaliacoes />

      </div>

      {avaliacoes.map(item => (
        <div key={item.rating_id} className={Styles.avaliacoes}>
          <div className={Styles.infos}>
            <p>Etapa: {item.requestStep}</p>
            <p>Avaliada em: {moment(item.created_at).format('DD/MM/YYYY HH:mm')}</p>
            <p>Usuário: {item.user.name}</p>
            <p>Nota: {item.rating}</p>
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
                    value={item.title}
                    className={Styles.inputTitulo}
                    id="titulo"
                    maxLength={40}
                    disabled
                  />
                  <label htmlFor="detalhes">Detalhes</label>
                  <textarea
                    value={item.description}
                    className={Styles.inputDetalhe}
                    name=""
                    id="detalhes"
                    cols={30}
                    rows={10}
                    disabled
                  ></textarea>
                  {item.files.length > 0 ? (
                    <button
                      className={Styles.botaoDownloadArquivo}
                      onClick={(e) => handleDownload(e, item)}
                    >
                      <i className="material-icons">file_download</i>
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>
      ))}

  
    </div>
  )
}

export default HistoricoAvaliacao
