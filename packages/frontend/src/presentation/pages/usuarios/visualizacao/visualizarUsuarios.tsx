import Styles from './visualizarUsuarios.scss'
import React, { useState, useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import { updateUser, getAllTeams, getGroupsByTeam } from '@/main/api/api'
import Select from 'react-select'
import { useAlert } from '@/main/services'

const VisualizarUsuario: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const alert = useAlert()

  const [id, setId] = useState<string>('')
  const [nome, setNome] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [senha, setSenha] = useState<string>('')
  const [confirmacaoSenha, setConfirmacaoSenha] = useState<string>('')
  const [genero, setGenero] = useState<any>()
  const [equipe, setEquipe] = useState<any>()
  const [grupo, setGrupo] = useState<any>()
  const [equipes] = useState<any[]>([])
  const [grupos] = useState<any[]>([])

  const generos = [
    { value: 'male', label: 'Masculino' },
    { value: 'female', label: 'Feminino' },
    { value: 'others', label: 'Outros' }
  ]

  const loadEquipes = async () => {
    try {
      const response = await getAllTeams()
      response.data.map((item: any) => {
        equipes.push({ label: item.team_name, value: item.team_id })
      })
    } catch(e) {
      alert.criarAlerta({
        icon: 'error',
        html: 'Ocorreu um erro ao carregar as equipes.',
        title: 'Erro'
      })
    }
  }

  const loadUser = async () => {
    const user = location.state

    if(!user){
      alert.criarAlerta({
        icon: 'error',
        html: 'Ocorreu um erro ao carregar as informações do usuário a ser editado.',
        title: 'Erro'
      })
      navigate('/users')
      return
    }

    setId(user.user_id)
    setNome(user.name)
    setEmail(user.email)
    if (user.gender === 'female') {
      setGenero({ value: 'female', label: 'Feminino' })
    } else if (user.gender === 'male') {
      setGenero({ value: 'male', label: 'Masculino' })
    }else if (user.gender === 'others'){
      setGenero({ value: 'others', label: 'Outros' })
    }
    setSenha(user.password)
    setConfirmacaoSenha(user.password)
    setEquipe({ value: user.team.team_id, label: user.team.team_name })

    try{
      const response = await getGroupsByTeam(user.team.team_id)

      if(response && response.data){
        response.data.map((item: any) => {
          grupos.push({ label: item.group_name, value: item.group_id })
          if(user.group && user.group.group_id === item.group_id){
            setTimeout(()=> {setGrupo({ label: user.group.group_name, value: user.group.group_id })}, 100)
          }
        })
      }

    } catch(e) {
      alert.criarAlerta({
        icon: 'error',
        html: 'Ocorreu um erro ao carregar os grupos.',
        title: 'Erro'
      })   
    }

    setGrupo(user.group?.group_id)
  }

  useEffect(()=> {
    loadEquipes()
    loadUser()
  }, [])

  return (
    <div className={Styles.container}>
      <div className={Styles.usuarioForm}>
        <div className={Styles.titleCadastroUsuarios}>
          <h1>Visualizar usuário</h1>
          <hr />
        </div>
        <form className={Styles.formCadastroUsuarios}>
          <div className={Styles.inputGroup}>
            <div style={ { width: '50%' } }>
              <label htmlFor='nome'>Nome</label>
              <input
                type='text'
                value={nome}
                className={Styles.inputText}
                maxLength={60}
                disabled={true}
              />
            </div>
            <div style={ { width: '50% !important' } }>
              <label htmlFor='nome'>Gênero</label>
              <Select
              isDisabled={true}
                isSearchable={true}
                value={genero}
                options={generos}
                styles={selectStyles}
                placeholder={'Selecione...'}
              />         
              </div>
          </div>
          <div className={Styles.inputGroup}>
            <div style={ { width: '1150px' } }>
              <label htmlFor='nome'>Email</label>
              <input
                type='text'
                value={email}
                disabled={true}
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
                disabled={true}
                className={Styles.inputText}
                maxLength={60}
              />
            </div>
            <div style={ { width: '50%' } }>
              <label htmlFor='nome'>Confirmação de Senha</label>
              <input
                type='password'
                value={confirmacaoSenha}
                disabled={true}
                className={Styles.inputText}
                maxLength={60}
              />
            </div>
          </div>
          <div className={Styles.inputGroup}>
            <div style={ { width: '50% !important' } }>
              <label htmlFor='nome'>Equipe</label>
              <Select
                isSearchable={true}
                isDisabled={true}
                value={equipe}
                options={equipes}
                styles={selectStyles}
                placeholder={'Selecione...'}
              />
            </div>
            <div style={ equipe === '' || equipe == null ? { width: '50% !important', marginLeft: '50px', display: 'none' } : { width: '50% !important', marginLeft: '50px' } }>
              <label htmlFor='nome'>Grupo</label>
              <Select
                isSearchable={true}
                isDisabled={true}
                value={grupo}
                options={grupos}
                styles={selectStyles}
                placeholder={'Selecione...'}
              />
            </div>
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


export default VisualizarUsuario
