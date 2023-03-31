/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header, SelectType } from '@/presentation/components'
import Styles from './alinhamentoEstrategico.scss'

import React, { useContext, useState } from 'react'
import DropZone from '@/presentation/components/dropzone/dropzone'
import Footer from '@/presentation/components/footer/footer'
import Modal from '@/presentation/components/modal/modal'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '@/main/contexts/authcontext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { createStrategicAlignmentRating } from '@/main/api/api'

const MySwal = withReactContent(Swal)

const AlinhamentoEstrategico: React.FC = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [openModal, setOpenModal] = useState(false)
  const [titulo, setTitulo] = useState<string>('')
  const [detalhes, setDetalhes] = useState<string>('')
  const [rating, setRating] = useState<string>('')
  const [targetGroup, setTargetGroup] = useState<string>('')

  const handleRequest = async () => {
    try {
      const response = await createStrategicAlignmentRating(user.user_id, rating, titulo, detalhes, targetGroup)

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
      MySwal.fire('Erro', 'Defina um nível de prioridade.', 'error')
      return
    }

    if (targetGroup == null || targetGroup === '' || targetGroup === ' ') {
      MySwal.fire('Erro', 'É necessário selecionar um grupo.', 'error')
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
            required
            autoFocus
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
            required
          ></textarea>

          <div className={Styles.formWrapper}>
            <form className={Styles.formAnalise} action='' method=''>
              <h3 className={Styles.formTitle}>Nível de prioridade</h3>
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
          <div
            className={Styles.openModal}
            onClick={() => {
              setOpenModal(true)
            }}
          >
            <i className='large material-icons'>assignment_turned_in</i>
          </div>
          <Modal
            isOpen={openModal}
            titulo={'teste'}
            setModalClose={() => {
              setOpenModal(!openModal)
            }}
          >
            <div>a</div>
          </Modal>
        </div>
        <div className={Styles.arquivoBotao}>
          <div className={Styles.dropzoneContainer}>
            <DropZone />
          </div>
          <label htmlFor='grupo' className={Styles.grupo}>
            Grupos
          </label>
          <SelectType onChange={setTargetGroup} />
          <input type='button' onClick={handleSubmit} className={Styles.buttonEnviar} value='Enviar' />
        </div>
      </div>
      <Footer />
    </>
  )
}
export default AlinhamentoEstrategico
