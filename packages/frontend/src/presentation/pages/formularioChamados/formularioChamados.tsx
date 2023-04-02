/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header } from '@/presentation/components'
import Styles from './formularioChamados.scss'
import { createRequest } from '@/main/api/api'
import React, { useState, useContext } from 'react'
import DropZone from '@/presentation/components/dropzone/dropzone'
import Footer from '@/presentation/components/footer/footer'
import { TipoChamado } from '@/main/enums/tipo-chamado'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AuthContext } from '@/main/contexts/authcontext'
import { useNavigate } from 'react-router-dom'

const MySwal = withReactContent(Swal)

const FormularioChamados: React.FC<{ tipoChamado: TipoChamado }> = (props) => {
  const title = props.tipoChamado === TipoChamado.FEATURE ? 'Nova feature' : 'Hotfix'

  const [titulo, setTitulo] = useState<string>('')
  const [detalhes, setDetalhes] = useState<string>('')
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

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

      const response = await createRequest(
        user.user_id,
        titulo,
        detalhes,
        props.tipoChamado === TipoChamado.FEATURE ? 'FEATURE' : 'hotfix',
        files
      )

      MySwal.fire({
        title: 'Sucesso',
        html: 'Chamado aberto com sucesso!',
        icon: 'success'
      }).then((r) => {
        navigate('/home')
      })
    } catch (e: any) {
      let errorMessage = e.response.data

      if (errorMessage === 'Missing required informations to create a request') {
        errorMessage = 'Não foi possível criar o chamado, pois faltam informações.'
      } else if (errorMessage === 'User not found') {
        errorMessage = 'Não foi possível criar o chamado, pois o usuário não encontrado.'
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

    if (titulo == null || titulo === '' || titulo === ' ') {
      MySwal.fire({
        title: 'Erro',
        icon: 'error',
        html: 'O campo de título é obrigatório!'
      })
      return
    }

    if (detalhes == null || detalhes === '' || detalhes === ' ') {
      MySwal.fire({
        title: 'Erro',
        icon: 'error',
        html: 'O campo de detalhes é obrigatório!'
      })
      return
    }

    MySwal.fire({
      title: 'Aviso',
      html: 'Deseja salvar esse chamado?',
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
        <h1>{title}</h1>
        <hr />
      </div>
      <form onSubmit={handleSubmit} className={Styles.form}>
        <div className={Styles.tituloDetalhe}>
          <label htmlFor='titulo'>Título</label>
          <input
            type='text'
            value={titulo}
            onChange={(e: any) => {
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
            value={detalhes}
            onChange={(e: any) => {
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
          <input type='button' value='Cancelar' className={Styles.buttonCancelar} />
          <input type='submit' value='Enviar para o comitê de aprovação' className={Styles.buttonEnviar} />
        </div>
      </form>
      <Footer />
    </>
  )
}
export default FormularioChamados
