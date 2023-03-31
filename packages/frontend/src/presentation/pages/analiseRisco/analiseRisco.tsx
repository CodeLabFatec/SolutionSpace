/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header } from '@/presentation/components'
import Styles from './analiseRisco.scss'

import React, { useContext, useState } from 'react'
import DropZone from '@/presentation/components/dropzone/dropzone'
import Footer from '@/presentation/components/footer/footer'
import Modal from '@/presentation/components/modal/modal'
import { AuthContext } from '@/main/contexts/authcontext'
import { useNavigate, useLocation } from 'react-router-dom'
import { createRiskAnalysisRating } from '@/main/api/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const AnaliseRisco: React.FC = () => {
  const [openModal, setOpenModal] = useState(false)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [titulo, setTitulo] = useState<string>('')
  const [detalhes, setDetalhes] = useState<string>('')
  const [rating, setRating] = useState<string>('')
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])

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

      const response = await createRiskAnalysisRating(user.user_id, rating, titulo, detalhes, files)

      MySwal.fire({
        title: 'Sucesso',
        html: 'Avaliação feita com sucesso!',
        icon: 'success'
      }).then((r) => {
        navigate('/home')
      })
    } catch (e: any) {
      let errorMessage = e.response.data

      if (errorMessage === 'Missing required informations to create a rating') {
        errorMessage = 'Não foi possível salvar a avaliação, pois faltam informações.'
      } else if (errorMessage === 'User not found') {
        errorMessage = 'Não foi possível salvar a avaliação, pois o usuário não encontrado.'
      } else if (errorMessage === 'There is already a rating for this request from the same team') {
        errorMessage = 'Esse chamado já passou por essa avaliação.'
      } else if (errorMessage === 'Request not found') {
        errorMessage = 'Não foi possível salvar a avaliação, pois o chamado não foi encontrado.'
      } else if (errorMessage === 'Authorization not found') {
        errorMessage = 'Você precisa estar autenticado para realizar essa operação!'
      }

      MySwal.fire({
        title: 'Erro',
        icon: 'error',
        html: errorMessage
      })
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (location.state === null) {
      MySwal.fire('Erro', 'O chamado não foi encontrado.', 'error')
      return
    }

    if (titulo == null || titulo === '' || titulo === ' ') {
      MySwal.fire('Erro', 'Título é obrigatório.', 'error')
      return
    }

    if (detalhes == null || detalhes === '' || detalhes === ' ') {
      MySwal.fire('Erro', 'Detalhes é obrigatório.', 'error')
      return
    }

    if (rating == null || rating === '' || rating === ' ') {
      MySwal.fire('Erro', 'Defina um nível de risco para esse chamado.', 'error')
      return
    }

    MySwal.fire({
      title: 'Aviso',
      html: 'Deseja salvar essa avaliação?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      confirmButtonColor: '#76ba1b',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#ff0000'
    }).then((r) => {
      if (r.isConfirmed) {
        handleRequest()
      }
    })
  }

  return (
    <>
      <Header exibirHome={true} />
      <div className={Styles.H1formularioChamados}>
        <h1>Documento de análise de risco</h1>
        <hr />
      </div>
      <div className={Styles.form}>
        <div className={Styles.tituloDetalhe}>
          <label htmlFor='titulo'>Título</label>
          <input
            value={titulo}
            onChange={(e) => {
              setTitulo(e.target.value)
            }}
            type='text'
            className={Styles.inputTitulo}
            id='titulo'
            required
            autoFocus
            maxLength={60}
          />
          <label htmlFor='detalhes'>Detalhes</label>
          <textarea
            value={detalhes}
            onChange={(e) => {
              setDetalhes(e.target.value)
            }}
            className={Styles.inputDetalhe}
            name=''
            id='detalhes'
            cols={30}
            rows={10}
            required
          ></textarea>
        </div>
        <div className={Styles.arquivoBotao}>
          <div className={Styles.dropzoneContainer}>
            <DropZone uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
          </div>
          <div className={Styles.formWrapper}>
            <form className={Styles.formAvaliacao} action='' method=''>
              <h3 className={Styles.formTitle}>Risco</h3>
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
                <label htmlFor='0' data-debt-amount='Não existe'></label>
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
                <label htmlFor='1' data-debt-amount='Baixo'></label>
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
                <label htmlFor='2' data-debt-amount='Médio'></label>
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
                <label htmlFor='3' data-debt-amount='Alto'></label>
                <div className={Styles.debtAmountPos}></div>
              </div>
            </form>
          </div>
          <input type='button' onClick={handleSubmit} value='Confirmar avaliação' className={Styles.buttonEnviar} />
          {/* <div
            className={Styles.openModal}
            onClick={() => {
              setOpenModal(true)
            }}
          >
            <i className='large material-icons'>assignment_turned_in</i>
          </div>
          <Modal
            isOpen={openModal}
            titulo={''}
            setModalClose={() => {
              setOpenModal(!openModal)
            }}
          >
            <div>a</div>
          </Modal> */}
        </div>
      </div>
      <Footer />
    </>
  )
}
export default AnaliseRisco
