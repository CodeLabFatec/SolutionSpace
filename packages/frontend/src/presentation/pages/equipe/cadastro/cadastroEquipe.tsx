/* eslint-disable @typescript-eslint/no-unused-vars */
import Styles from "./cadastroEquipe.scss";
import React, { useState } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { createTeam } from "@/main/api/api";


const MySwal = withReactContent(Swal);

const CadastroEquipe: React.FC = () => {
  const [nomeEquipe, setNomeEquipe] = useState("");
  const [descricaoEquipe, setDescricaoEquipe] = useState("");
  const [cadastrarUsuario, setCadastrarUsuario] = useState(false);
  const [cadastrarEquipe, setCadastrarEquipe] = useState(false);
  const [cadastrarGrupo, setCadastrarGrupo] = useState(false);
  const [editarChamado, setEditarChamado] = useState(false);
  const [desarquivarChamado, setDesarquivarChamado] = useState(false);

  const navigate = useNavigate();

  const handleCadatrarUsuario = () => {
    if (!cadastrarUsuario){
        setCadastrarUsuario(true)
    }else{
        setCadastrarUsuario(false)
    }
  }

  const handleCadatrarEquipe = () => {
    if (!cadastrarEquipe){
        setCadastrarEquipe(true)
    }else{
        setCadastrarEquipe(false)
    }
  }

  const handleCadatrarGrupo = () => {
    if (!cadastrarGrupo){
        setCadastrarGrupo(true)
    }else{
        setCadastrarGrupo(false)
    }
  }

  const handleDesarquivarChamado = () => {
    if (!desarquivarChamado){
        setDesarquivarChamado(true)
    }else{
        setDesarquivarChamado(false)
    }
  }

  const handleEditarChamado = () => {
    if (!editarChamado){
        setEditarChamado(true)
    }else{
        setEditarChamado(false)
    }
  }

  const handleRequest = async () => {
    try {

      await createTeam(
        nomeEquipe,
        descricaoEquipe,
        cadastrarUsuario, 
        cadastrarEquipe, 
        cadastrarGrupo, 
        editarChamado, 
        desarquivarChamado)

      MySwal.fire({
        html: "Equipe cadastrada com sucesso.",
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

      console.log(e)
      if (
        errorMessage === "All properties are required to create a team"
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
      html: "Deseja salvar equipe?",
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
        <h1>Cadastro de equipe</h1>
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
              control={<Switch  value={cadastrarUsuario}/>}
              onChange={handleCadatrarUsuario}
              label="Poderá cadastrar usuários?"
              labelPlacement="start"
              id={Styles.Switch}
            />
            <FormControlLabel
              control={<Switch value={cadastrarEquipe}/>}
              onChange={handleCadatrarEquipe}
              label="Poderá cadastrar equipes?"
              labelPlacement="start"
              id={Styles.Switch}
            />
            <FormControlLabel
              control={<Switch value={cadastrarGrupo} />}
              onChange={handleCadatrarGrupo}
              label="Poderá cadastrar grupos?"
              labelPlacement="start"
              id={Styles.Switch}
            />
            <FormControlLabel
              control={<Switch value={editarChamado}/>}
              onChange={handleEditarChamado}
              label="Poderá editar chamados?"
              labelPlacement="start"
              id={Styles.Switch}
            />
            <FormControlLabel
              control={<Switch  value={desarquivarChamado}/>}
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
            value="Cadastrar"
            className={Styles.buttonEnviar}
          />
        </div>
      </form>
    </div>
  );
};
export default CadastroEquipe;
