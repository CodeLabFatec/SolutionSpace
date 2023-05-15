import Styles from "./edicaoEquipe.scss";
import React, { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { updateTeam } from "@/main/api/api";
import { useAlert } from "@/main/services";

const EdicaoEquipe: React.FC = () => {

  const [id, setId] = useState<string>('')
  const [nomeEquipe, setNomeEquipe] = useState("")
  const [descricaoEquipe, setDescricaoEquipe] = useState("")
  const [cadastrarUsuario, setCadastrarUsuario] = useState(false)
  const [cadastrarEquipe, setCadastrarEquipe] = useState(false)
  const [cadastrarGrupo, setCadastrarGrupo] = useState(false)
  const [editarChamado, setEditarChamado] = useState(false)
  const [desarquivarChamado, setDesarquivarChamado] = useState(false)
  const [configuraStatus, setConfiguraStatus] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const alert = useAlert()

  const loadTeam = async () => {
    const team = location.state

    if(!team){
      alert.criarAlerta({
        icon: 'error',
        html: "Ocorreu um erro ao carregar as informações da equipe a ser editada.",
        title: 'Erro'
      })
      navigate('/teams')
      return
    }

    setId(team.team_id)
    setNomeEquipe(team.team_name)
    setDescricaoEquipe(team.description)
    setCadastrarEquipe(team.permissionCreateTeams)
    setCadastrarGrupo(team.permissionCreateGroups)
    setCadastrarUsuario(team.permissionCreateUsers)
    setEditarChamado(team.permissionEditRequests)
    setDesarquivarChamado(team.permissionUnarchiveRequests)
    setConfiguraStatus(team.permissionConfigureStatus)
  }

  useEffect(()=> {
    loadTeam()
  }, [])

  const handleCadatrarUsuario = () => {
    setCadastrarUsuario(!cadastrarUsuario)
  }

  const handleCadatrarEquipe = () => {
    setCadastrarEquipe(!cadastrarEquipe)
  }

  const handleCadatrarGrupo = () => {
    setCadastrarGrupo(!cadastrarGrupo)
  }

  const handleDesarquivarChamado = () => {
    setDesarquivarChamado(!desarquivarChamado)
  }

  const handleEditarChamado = () => {
    setEditarChamado(!editarChamado)
  }
  const handleConfiguraStatus = () => {
    setConfiguraStatus(!configuraStatus)
  }

  const handleVoltar = () => {
    navigate('/teams')
  }


  const handleRequest = async () => {
    try {

      await updateTeam(
        id,
        nomeEquipe,
        descricaoEquipe,
        cadastrarUsuario, 
        cadastrarEquipe, 
        cadastrarGrupo, 
        editarChamado, 
        desarquivarChamado,
        configuraStatus)

      alert.criarAlerta({
        icon: 'success',
        html: 'Equipe alterada com sucesso.',
        confirmAction: () => {
          navigate("/teams");
        }
      })
    } catch (e: any) {
      let errorMessage = e.response.data.message;
      if (
        errorMessage === "All properties are required to edit a team"
      ) {
        errorMessage = "Preencha todas as informações.";
      } else if (errorMessage === "User not found") {
        errorMessage = "Usuário inválido.";
      } else if (errorMessage === "Authorization not found") {
        errorMessage =
          "Você precisa estar autenticado para realizar essa operação.";
      }

      alert.criarAlerta({
        icon: 'error',
        html: errorMessage
      })
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!nomeEquipe || nomeEquipe === '' || nomeEquipe === ' ') {
      alert.criarAlerta({
        html: "Nome da equipe é obrigatório.",
        title: 'Opss...'
      })
      return;
    }

    if (!descricaoEquipe || descricaoEquipe === '' || descricaoEquipe === ' ') {
      alert.criarAlerta({
        html: "Descrição da equipe é obrigatório.",
        title: 'Opss...'
      })
      return;
    }

    alert.criarConfirmacao({
      title: "Aviso",
      html: "Deseja alterar a equipe?",
      confirmAction: () => {
        handleRequest();
      }
    })
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.H1CadastroEquipe}>
        <h1>Edição de equipe</h1>
        <hr />
      </div>
      <form onSubmit={handleSubmit} className={Styles.formEquipe}>
        <div className={Styles.containerFormEquipe}>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            value={nomeEquipe}
            onChange={(e: any) => {
              setNomeEquipe(e.target.value);
            }}
            className={Styles.input}
            id="nome"
            maxLength={40}
          />
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            value={descricaoEquipe}
            onChange={(e: any) => {
              setDescricaoEquipe(e.target.value);
            }}
            className={Styles.input}
            id="descricao"
            maxLength={200}
          />
        </div>
        <div className={Styles.permissionsContainer}>
          <FormGroup id={Styles.teste}>
            <FormControlLabel
              control={<Switch value={cadastrarUsuario} checked={cadastrarUsuario} />}
              onChange={handleCadatrarUsuario}
              label="Poderá cadastrar usuários?"
              labelPlacement="start"
              id={Styles.Switch}
            />
            <FormControlLabel
              control={<Switch value={cadastrarEquipe} checked={cadastrarEquipe}/>}
              onChange={handleCadatrarEquipe}
              label="Poderá cadastrar equipes?"
              labelPlacement="start"
              id={Styles.Switch}
            />
            <FormControlLabel
              control={<Switch value={cadastrarGrupo} checked={cadastrarGrupo} />}
              onChange={handleCadatrarGrupo}
              label="Poderá cadastrar grupos?"
              labelPlacement="start"
              id={Styles.Switch}
            />
            {/* <FormControlLabel
              control={<Switch value={editarChamado} checked={editarChamado}/>}
              onChange={handleEditarChamado}
              label="Poderá editar chamados?"
              labelPlacement="start"
              id={Styles.Switch}
            /> */}
            <FormControlLabel
              control={<Switch  value={desarquivarChamado} checked={desarquivarChamado}/>}
              onChange={handleDesarquivarChamado}
              label="Poderá desarquivar chamados?"
              labelPlacement="start"
              id={Styles.Switch}
            />
            <FormControlLabel
              control={<Switch  value={configuraStatus} checked={configuraStatus} />}
              onChange={handleConfiguraStatus}
              label="Poderá configurar status de chamados?"
              labelPlacement="start"
              id={Styles.Switch}
            />
            
          </FormGroup>
        </div>
        <div className={Styles.botao}>
          <input
            type="submit"
            value="Editar"
            className={Styles.buttonEnviar}
          />
           <input
            type="submit"
            value="Voltar"
            onClick={handleVoltar}
            className={Styles.buttonVoltar}
          />
        </div>
      </form>
    </div>
  );
};
export default EdicaoEquipe;
