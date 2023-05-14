import Styles from "./cadastroEquipe.scss";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { createTeam } from "@/main/api/api";
import { useAlert } from "@/main/services";

const CadastroEquipe: React.FC = () => {
  const [nomeEquipe, setNomeEquipe] = useState("");
  const [descricaoEquipe, setDescricaoEquipe] = useState("");
  const [cadastrarUsuario, setCadastrarUsuario] = useState(false);
  const [cadastrarEquipe, setCadastrarEquipe] = useState(false);
  const [cadastrarGrupo, setCadastrarGrupo] = useState(false);
  const [editarChamado, setEditarChamado] = useState(false);
  const [desarquivarChamado, setDesarquivarChamado] = useState(false);
  const [configuraStatus, setConfiguraStatus] = useState(false);

  const navigate = useNavigate();
  const alert = useAlert()

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

  const handleRequest = async () => {
    try {

      await createTeam(
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
        html: 'Equipe salva com sucesso.',
        confirmAction: () => {
          navigate("/teams");
        }
      })
    } catch (e: any) {
      let errorMessage = e.response.data.message;

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
      html: "Deseja salvar a equipe?",
      confirmAction: () => {
        handleRequest();
      }
    })
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
              label="Poderá gerenciar usuários?"
              labelPlacement="start"
              id={Styles.Switch}
            />
            <FormControlLabel
              control={<Switch value={cadastrarEquipe}/>}
              onChange={handleCadatrarEquipe}
              label="Poderá gerenciar equipes?"
              labelPlacement="start"
              id={Styles.Switch}
            />
            <FormControlLabel
              control={<Switch value={cadastrarGrupo} />}
              onChange={handleCadatrarGrupo}
              label="Poderá gerenciar grupos?"
              labelPlacement="start"
              id={Styles.Switch}
            />
            {/* <FormControlLabel
              control={<Switch value={editarChamado}/>}
              onChange={handleEditarChamado}
              label="Poderá editar chamados?"
              labelPlacement="start"
              id={Styles.Switch}
            /> */}
            <FormControlLabel
              control={<Switch  value={desarquivarChamado}/>}
              onChange={handleDesarquivarChamado}
              label="Poderá desarquivar chamados?"
              labelPlacement="start"
              id={Styles.Switch}
            />
            <FormControlLabel
              control={<Switch  value={configuraStatus}/>}
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
            value="Cadastrar"
            className={Styles.buttonEnviar}
          />
        </div>
        
      </form>
    </div>
  );
};
export default CadastroEquipe;
