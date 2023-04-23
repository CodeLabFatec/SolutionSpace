import Styles from "./edicaoEquipe.scss";
import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useLocation, useNavigate } from "react-router-dom";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { updateTeam } from "@/main/api/api";


const MySwal = withReactContent(Swal)

const EdicaoEquipe: React.FC = () => {

  const [id, setId] = useState<string>('')
  const [nomeEquipe, setNomeEquipe] = useState("")
  const [descricaoEquipe, setDescricaoEquipe] = useState("")
  const [cadastrarUsuario, setCadastrarUsuario] = useState(false)
  const [cadastrarEquipe, setCadastrarEquipe] = useState(false)
  const [cadastrarGrupo, setCadastrarGrupo] = useState(false)
  const [editarChamado, setEditarChamado] = useState(false)
  const [desarquivarChamado, setDesarquivarChamado] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const loadTeam = async () => {
    const team = location.state

    if(!team){
      MySwal.fire({
        title: "Erro",
        html: "Ocorreu um erro ao carregar as informações da equipe a ser editada.",
        width: "350px",
        background: "#FAF0E6",
        color: "#000",
        confirmButtonColor: "#4FB4BC",
      });
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
        desarquivarChamado)

      MySwal.fire({
        html: "Equipe alterada com sucesso.",
        icon: "success",
        width: "350px",
        background: "#FAF0E6",
        color: "#000",
        confirmButtonColor: "#4FB4BC",
      }).then((r) => {
        navigate("/teams");
      });
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

      MySwal.fire({
        icon: "error",
        html: errorMessage,
        width: "350px",
        background: "#FAF0E6",
        color: "#000",
        confirmButtonColor: "#4FB4BC",
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!nomeEquipe || nomeEquipe === '' || nomeEquipe === ' ') {
      MySwal.fire({
        title: "Opss...",
        html: "Nome da equipe é obrigatório.",
        width: "350px",
        background: "#FAF0E6",
        color: "#000",
        confirmButtonColor: '#4FB4BC'
      });
      return;
    }

    if (!descricaoEquipe || descricaoEquipe === '' || descricaoEquipe === ' ') {
      MySwal.fire({
        title: "Opss...",
        html: "Descrição da equipe é obrigatório.",
        width: "350px",
        background: "#FAF0E6",
        color: "#000",
        confirmButtonColor: '#4FB4BC'
      });
      return;
    }

    MySwal.fire({
      title: "Aviso",
      html: "Deseja alterar a equipe?",
      showCancelButton: true,
      confirmButtonText: "Sim",
      confirmButtonColor: "#4FB4BC",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#A9A9A9",
      width: "350px",
      background: "#FAF0E6",
      color: "#000",
      reverseButtons: true,
    }).then((r) => {
      if (r.isConfirmed) {
        handleRequest();
      }
    });
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
            <FormControlLabel
              control={<Switch value={editarChamado} checked={editarChamado}/>}
              onChange={handleEditarChamado}
              label="Poderá editar chamados?"
              labelPlacement="start"
              id={Styles.Switch}
            />
            <FormControlLabel
              control={<Switch  value={desarquivarChamado} checked={desarquivarChamado}/>}
              onChange={handleDesarquivarChamado}
              label="Poderá desarquivar chamados?"
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
        </div>
      </form>
    </div>
  );
};
export default EdicaoEquipe;
