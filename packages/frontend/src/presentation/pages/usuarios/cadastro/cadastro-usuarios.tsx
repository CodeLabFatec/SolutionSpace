/* eslint-disable @typescript-eslint/no-unused-vars */
import { SelectType } from '@/presentation/components'
import Styles from './cadastro-usuarios-styles.scss'
import React, { useState, useEffect } from 'react'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'
import { createUser, getAllTeams, getGroupsByTeam } from '@/main/api/api'
import Select from 'react-select'

const MySwal = withReactContent(Swal)

const CadastroUsuarios: React.FC = () => {

  const [nome, setNome] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [senha, setSenha] = useState<string>('')
  const [confirmacaoSenha, setConfirmacaoSenha] = useState<string>('')
  const [genero, setGenero] = useState<string>()
  const [equipe, setEquipe] = useState<string>()
  const [grupo, setGrupo] = useState<any>()
  const [equipes, setEquipes] = useState<any[]>([])
  const [grupos, setGrupos] = useState<any[]>([])

  const navigate = useNavigate()

  const generos = [
    { value: 'male', label: 'Masculino' },
    { value: 'female', label: 'Feminino' },
    { value: 'others', label: 'Outro' }
  ]

  const loadEquipes = async () => {
    try {
      const response = await getAllTeams()
      response.data.map((item: any) => {
        equipes.push({ label: item.team_name, value: item.team_id })
      })
    } catch(e) {
      Swal.fire('Erro', 'Ocorreu um erro ao carregar as equipes.', 'error')
    }
  }

  useEffect(()=> {
    loadEquipes()
  }, [])

  const handleRequest = async () => {
    if(!genero) return
    if(!equipe) return
    if(!grupo) return
    try {

      await createUser(
        nome,
        email,
        senha,
        genero,
        equipe,
        grupo.value
      )

      MySwal.fire({
        title: 'Sucesso',
        html: 'Usuário criado com sucesso!',
        icon: 'success'
      }).then((r) => {
        navigate('/users')
      })
    } catch (e: any) {
      let errorMessage = e.response.data.message

      if (errorMessage === 'All properties are required to create an User') {
        errorMessage = 'Não foi possível criar o usuário, pois faltam informações.'
      } else if (errorMessage === 'Internal Server Error - Email already exists'){
        errorMessage = 'Não foi possível criar o usuário, pois esse email já está sendo utilizado.'
      } else if (errorMessage === 'Team not found') {
        errorMessage = 'Não foi possível criar o usuário, pois a equipe informada não foi encontrada.'
      } else if (errorMessage === 'Group not found') {
        errorMessage = 'Não foi possível criar o usuário, pois o grupo informado não foi encontrado.'
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

    if (nome == null || nome === '' || nome === ' ') {
      MySwal.fire({
        title: 'Erro',
        icon: 'error',
        html: 'Nome é obrigatório.'
      })
      return
    }

    if (email == null || email === '' || email === ' ') {
      MySwal.fire({
        title: 'Erro',
        icon: 'error',
        html: 'Email é obrigatório.'
      })
      return
    }

    if (senha == null || senha === '' || senha === ' ') {
      MySwal.fire({
        title: 'Erro',
        icon: 'error',
        html: 'Senha é obrigatória.'
      })
      return
    }

    if (senha !== confirmacaoSenha) {
      MySwal.fire({
        title: 'Erro',
        icon: 'error',
        html: 'Senha e confirmação de senha devem ser iguais.'
      })
      return
    }

    if (genero == null || genero === '' || genero === ' ') {
      MySwal.fire({
        title: 'Erro',
        icon: 'error',
        html: 'Gênero é obrigatório.'
      })
      return
    }

    if (equipe == null || equipe === '' || equipe === ' ') {
      MySwal.fire({
        title: 'Erro',
        icon: 'error',
        html: 'Equipe é obrigatório.'
      })
      return
    }

    if (grupo == null || grupo.value === '' || grupo.value === ' ') {
      MySwal.fire({
        title: 'Erro',
        icon: 'error',
        html: 'Grupo é obrigatório.'
      })
      return
    }

    MySwal.fire({
      title: 'Aviso',
      html: 'Deseja salvar esse usuário?',
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

  const handleEquipeChange = async (value: any) => {
    if(equipe === value) return
    setGrupo(null)
    grupos.splice(0, grupos.length)
    setEquipe(value)

    try{
      const response = await getGroupsByTeam(value)

      if(response && response.data){
        response.data.map((item: any) => {
          grupos.push({ label: item.group_name, value: item.group_id })
        })
      }

    } catch(e) {
      Swal.fire('Erro', 'Ocorreu um erro ao carregar os grupos.', 'error')
    }
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.usuarioForm}>
        
      <div className={Styles.titleCadastroUsuarios}>
        <h1>Cadastro de usuário</h1>
        <hr />
      </div>
      <form onSubmit={handleSubmit} className={Styles.formCadastroUsuarios}>
        <div className={Styles.inputGroup}>
          <div style={ { width: '50%' } }>
            <label htmlFor='nome'>Nome</label>
            <input
              type='text'
              value={nome}
              onChange={(e: any) => {
                setNome(e.target.value)
              }}
              className={Styles.inputText}
              maxLength={60}
            />
          </div>
          <div style={ { width: '50% !important' } }>
            <label htmlFor='nome'>Gênero</label>
            <SelectType onChange={setGenero} options={generos} />
          </div>
        </div>
        <div className={Styles.inputGroup}>
          <div style={ { width: '1150px' } }>
            <label htmlFor='nome'>Email</label>
            <input
              type='text'
              value={email}
              onChange={(e: any) => {
                setEmail(e.target.value)
              }}
              style={ { width: '100%' } }
              className={Styles.inputText}
              maxLength={60}
            />
          </div>
        </div>
        <div className={Styles.inputGroup}>
          <div style={ { width: '50%' } }>
            <label htmlFor='nome'>Senha</label>
            <input
              type='password'
              value={senha}
              onChange={(e: any) => {
                setSenha(e.target.value)
              }}
              className={Styles.inputText}
              maxLength={60}
            />
          </div>
          <div style={ { width: '50%' } }>
            <label htmlFor='nome'>Confirmação de Senha</label>
            <input
              type='password'
              value={confirmacaoSenha}
              onChange={(e: any) => {
                setConfirmacaoSenha(e.target.value)
              }}
              className={Styles.inputText}
              maxLength={60}
            />
          </div>
        </div>
        <div className={Styles.inputGroup}>
          <div style={ { width: '50% !important' } }>
            <label htmlFor='nome'>Equipe</label>
            <SelectType onChange={handleEquipeChange} options={equipes} />
          </div>
          <div style={ equipe === '' || equipe == null ? { width: '50% !important', marginLeft: '50px', display: 'none' } : { width: '50% !important', marginLeft: '50px' } }>
            <label htmlFor='nome'>Grupo</label>
            <Select
              isSearchable={true}
              onChange={(e: any) => {
                setGrupo(e)
              }}
              value={grupo}
              options={grupos}
              styles={selectStyles}
              placeholder={'Selecione...'}
            />
          </div>
        </div>
        <div className={Styles.buttonWrapper}>
          <input type='button' value='Cancelar' className={Styles.buttonCancelar} />
          <input type='submit' value='Enviar para o comitê de aprovação' className={Styles.buttonEnviar} />
        </div>
      </form>
      </div>
    </div>
  )
}

const selectStyles = {
  menuList: (styles: any) => ({
    ...styles,
    background: '#333333',
    color: '#FFF'
  }),
  option: (styles: any) => ({
    ...styles,
    backgroundColor: '#333333',
    zIndex: 1
  }),
  menu: (base: any) => ({
    ...base,
    marginLeft: '0',
    width: '550px',
    zIndex: 100
  }),
  control: (styles: any) => ({
    ...styles,
    width: '550px',
    backgroundColor: '#333333',
    border: 'none',
    borderRadius: '4px',
    boxShadow: 'none',
    margin: '7px 0 17px 0'
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: '#FFF'
  })
}


export default CadastroUsuarios