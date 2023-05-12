import { SelectType, Dropzone } from '@/presentation/components'
import Styles from './alinhamentoEstrategico.scss'

import React, { useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '@/main/contexts/authcontext'
import { createStrategicAlignmentRating, getAllGroups } from '@/main/api/api'
import { useAlert } from '@/main/services'

const AlinhamentoEstrategico: React.FC = () => {

  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const alert = useAlert()

  const [titulo, setTitulo] = useState<string>('')
  const [detalhes, setDetalhes] = useState<string>('')
  const [rating, setRating] = useState<string>('')
  const [targetGroup, setTargetGroup] = useState<string>('')
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [grupos] = useState<any[]>([])

  const loadGrupos = async () => {
    try {
      const response = await getAllGroups()
      response.data.map((item: any) => {
        grupos.push({ label: item.group_name, value: item.group_id })
      })
    } catch(e) {
      alert.criarAlerta({
        html: 'Ocorreu um erro ao carregar os grupos.',
        title: 'Erro',
        icon: 'error'
      })
    }
  }

  useEffect(() => {
    loadGrupos()
  }, [])

  const handleRequest = async () => {
    try {
      const files: any[] = []
      if (uploadedFiles.length > 0) {
        uploadedFiles.forEach((file) => {
          files.push({
            file_name: file.name,
            base64: file.base64,
            ext: file.type
          })
        })
      }

      await createStrategicAlignmentRating(
        location.state.request_id,
        user.user_id,
        rating,
        titulo,
        detalhes,
        targetGroup,
        files
      )

      alert.criarAlerta({
        icon: 'success',
        html: "Avaliação feita com sucesso!",
        confirmAction: () => {
          navigate("/home");
        }
      })
    } catch (e: any) {
      console.log(e)

      let errorMessage = e.response.data

      if (errorMessage === 'Missing required informations to create a rating') {
        errorMessage = "Preencha todas as informações.";
      } else if (errorMessage === 'User not found') {
        errorMessage = "Usuário inválido.";
      } else if (errorMessage === 'There is already a rating for this request from the same team') {
        errorMessage = 'Chamado já avaliado.'
      } else if (errorMessage === 'Request not found') {
        errorMessage = 'Chamado não encontrado.'
      } else if (errorMessage === 'Authorization not found') {
        errorMessage = 'Você precisa estar autenticado para realizar essa operação.'
      }

      alert.criarAlerta({
        icon: 'error',
        html: errorMessage
      })
      
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (location.state === null) {
      alert.criarAlerta({
        html: "Chamado não encontrado.",
        title: 'Erro',
        icon: 'error'
      })
      return
    }

    if (titulo == null || titulo === '' || titulo === ' ') {
      alert.criarAlerta({
        html: "Título é obrigatório.",
        title: 'Opss...'
      })
      return
    }

    if (detalhes == null || detalhes === '' || detalhes === ' ') {
      alert.criarAlerta({
        html: "Detalhes é obrigatório.",
        title: 'Opss...'
      })
      return
    }

    if (rating == null || rating === '' || rating === ' ') {
      alert.criarAlerta({
        html: "Defina um nível de impacto.",
        title: 'Opss...'
      })
      return
    }

    if (targetGroup == null || targetGroup === '' || targetGroup === ' ') {
      alert.criarAlerta({
        html: "Selecione um grupo.",
        title: 'Opss...'
      })
      return
    }

    alert.criarConfirmacao({
      title: "Aviso",
      html: 'Deseja salvar avaliação?',
      confirmAction: () => {
        handleRequest();
      }
    })
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.H1formularioChamados}>
        <h1>Alinhamento estratégico</h1>
        <hr />
      </div>
      <div className={Styles.form}>
        <div className={Styles.tituloDetalhe}>
          <label htmlFor='titulo'>Título</label>
          <input
            type='text'
            value={titulo}
            onChange={(e) => {
              setTitulo(e.target.value)
            }}
            className={Styles.inputTitulo}
            id='titulo'
            maxLength={60}
          />
          <label htmlFor='detalhes'>Detalhes</label>
          <textarea
            className={Styles.inputDetalhe}
            value={detalhes}
            onChange={(e) => {
              setDetalhes(e.target.value)
            }}
            id='detalhes'
            cols={30}
            rows={10}
          ></textarea>

          <div className={Styles.formWrapper}>
            <form className={Styles.formAnalise} action='' method=''>
              <h3 className={Styles.formTitle}>Nível de impacto</h3>
              <hr />
              <div className={Styles.debtAmountSlider}>
                <input
                  type='radio'
                  onChange={(e) => {
                    setRating(e.target.value)
                  }}
                  name='debt-amount'
                  id='0'
                  value='0'
                  required
                />
                <label htmlFor='0' data-debt-amount='0'></label>
                <input
                  type='radio'
                  onChange={(e) => {
                    setRating(e.target.value)
                  }}
                  name='debt-amount'
                  id='1'
                  value='1'
                  required
                />
                <label htmlFor='1' data-debt-amount='1'></label>
                <input
                  type='radio'
                  onChange={(e) => {
                    setRating(e.target.value)
                  }}
                  name='debt-amount'
                  id='2'
                  value='2'
                  required
                />
                <label htmlFor='2' data-debt-amount='2'></label>
                <input
                  type='radio'
                  onChange={(e) => {
                    setRating(e.target.value)
                  }}
                  name='debt-amount'
                  id='3'
                  value='3'
                  required
                />
                <label htmlFor='3' data-debt-amount='3'></label>
                <div className={Styles.debtAmountPos}></div>
              </div>
            </form>
          </div>
        </div>
        <div className={Styles.arquivoBotao}>
          <div className={Styles.dropzoneContainer}>
            <Dropzone uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
          </div>
          <label htmlFor='grupo' className={Styles.grupo}>
            Grupos
          </label>
          <div style={{ marginLeft: '25px' }}>
            <SelectType width="685px" onChange={setTargetGroup} options={grupos} />
          </div>
          <input type='button' onClick={handleSubmit} className={Styles.buttonEnviar} value='Enviar' />
        </div>
      </div>
    </div>
  )
}
export default AlinhamentoEstrategico
