import React, { useEffect } from 'react'
import Styles from './info-chamado-styles.scss'
import { type ChamadoType } from '../lista-chamados/lista-chamados'
import { VisualizarChamado } from '@/main/enums/visualizar-chamado'
import { useNavigate } from 'react-router-dom'

const InfoChamado: React.FC<{ chamado: ChamadoType | undefined; visualizacaoChamado: VisualizarChamado }> = (props) => {
  const navigate = useNavigate()

  useEffect(() => {}, [props])

  const handleDownload = (e: any) => {
    e.preventDefault()
    if (props.chamado == null) return

    if (props.chamado.files.length <= 0) return

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    props.chamado.files.forEach(async (file) => {
      await downloadBase64File(file.ext, file.base64, file.file_name)
    })
  }

  const downloadBase64File = async (contentType: string, base64Data: string, fileName: string) => {
    const linkSource = `data:${contentType};base64,${base64Data}`
    const downloadLink = document.createElement('a')
    downloadLink.href = linkSource
    downloadLink.download = fileName
    downloadLink.click()
    downloadLink.remove()
  }

  const conteudo: any = () => {
    if (props.chamado !== undefined) {
      return (
        <>
          <div className={Styles.tituloDetalhe}>
            <label htmlFor='titulo'>Título</label>
            <input
              readOnly={true}
              value={props.chamado.title}
              type='text'
              className={Styles.inputTitulo}
              id='titulo'
              required
              autoFocus
              maxLength={60}
            />
            <label htmlFor='detalhes'>Detalhes</label>
            <textarea
              readOnly={true}
              value={props.chamado.description}
              className={Styles.inputDetalhe}
              id='detalhes'
              cols={30}
              rows={10}
              required
            ></textarea>
          </div>

          <div className={Styles.botoesInfochamado}>
            {props.chamado.files.length > 0 ? (
              <button className={Styles.botaoDownloadArquivo} onClick={handleDownload}>
                Download Arquivos
              </button>
            ) : (
              <></>
            )}

            {props.chamado.requestStep === 'Analise de risco' ? (
              <button
                className={Styles.botaoAvaliar}
                onClick={() => {
                  navigate('/riskAnalysis', { replace: true, state: props.chamado })
                }}
              >
                Avaliar
              </button>
            ) : props.chamado.requestStep === 'Alinhamento estratégico' ? (
              <button
                className={Styles.botaoAvaliar}
                onClick={() => {
                  navigate('/strategicAlignment', { replace: true, state: props.chamado })
                }}
              >
                Avaliar
              </button>
            ) : (
              <p>Esse chamado já foi avaliado!</p>
            )}
          </div>
        </>
      )
    }
    return (
      <div className={Styles.tituloChamado}>
        <p style={{ textAlign: 'center' }}>Selecione um chamado ao lado para visualizar seus detalhes.</p>
      </div>
    )
  }

  return <div className={Styles.infoChamadoWrapper}>{conteudo()}</div>
}

export default InfoChamado
