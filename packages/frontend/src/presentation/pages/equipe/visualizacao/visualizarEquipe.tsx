import Styles from "./visualizarEquipe.scss";
import React, { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { updateTeam } from "@/main/api/api";
import { useAlert } from "@/main/services";

const VisualizarEquipe: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [nomeEquipe, setNomeEquipe] = useState("");
  const [descricaoEquipe, setDescricaoEquipe] = useState("");
  const [cadastrarUsuario, setCadastrarUsuario] = useState(false);
  const [cadastrarEquipe, setCadastrarEquipe] = useState(false);
  const [cadastrarGrupo, setCadastrarGrupo] = useState(false);
  const [editarChamado, setEditarChamado] = useState(false);
  const [desarquivarChamado, setDesarquivarChamado] = useState(false);
  const [configuraStatus, setConfiguraStatus] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const alert = useAlert();

  const loadTeam = async () => {
    const team = location.state;

    if (!team) {
      alert.criarAlerta({
        icon: "error",
        html: "Ocorreu um erro ao carregar as informações da equipe a ser editada.",
        title: "Erro",
      });
      navigate("/teams");
      return;
    }

    setId(team.team_id);
    setNomeEquipe(team.team_name);
    setDescricaoEquipe(team.description);
    setCadastrarEquipe(team.permissionCreateTeams);
    setCadastrarGrupo(team.permissionCreateGroups);
    setCadastrarUsuario(team.permissionCreateUsers);
    setEditarChamado(team.permissionEditRequests);
    setDesarquivarChamado(team.permissionUnarchiveRequests);
    setConfiguraStatus(team.permissionConfigureStatus);
  };

  const handleVoltar = () => {
    navigate("/teams");
  };

  useEffect(() => {
    loadTeam();
  }, []);

  return (
    <div className={Styles.container}>
      <div className={Styles.H1CadastroEquipe}>
        <h1>Visualizar equipe</h1>
        <hr />
      </div>
      <form className={Styles.formEquipe}>
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
            disabled={true}
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
            disabled={true}
          />
        </div>
        <div className={Styles.permissionsContainer}>
          <FormGroup id={Styles.teste}>
            <FormControlLabel
              control={
                <Switch value={cadastrarUsuario} checked={cadastrarUsuario} />
              }
              label="Poderá cadastrar usuários?"
              labelPlacement="start"
              id={Styles.Switch}
              disabled={true}
            />
            <FormControlLabel
              control={
                <Switch value={cadastrarEquipe} checked={cadastrarEquipe} />
              }
              label="Poderá cadastrar equipes?"
              labelPlacement="start"
              id={Styles.Switch}
              disabled={true}
            />
            <FormControlLabel
              control={
                <Switch value={cadastrarGrupo} checked={cadastrarGrupo} />
              }
              label="Poderá cadastrar grupos?"
              labelPlacement="start"
              id={Styles.Switch}
              disabled={true}
            />
            {/* <FormControlLabel
              control={<Switch value={editarChamado} checked={editarChamado}/>}
              label="Poderá editar chamados?"
              labelPlacement="start"
              id={Styles.Switch}
              disabled={true}
            /> */}
            <FormControlLabel
              control={
                <Switch
                  value={desarquivarChamado}
                  checked={desarquivarChamado}
                />
              }
              label="Poderá desarquivar chamados?"
              labelPlacement="start"
              id={Styles.Switch}
              disabled={true}
            />
            <FormControlLabel
              control={
                <Switch value={configuraStatus} checked={configuraStatus} />
              }
              label="Poderá configurar status de chamados?"
              labelPlacement="start"
              id={Styles.Switch}
              disabled={true}
            />
          </FormGroup>
        </div>
        <div className={Styles.botao}>
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
export default VisualizarEquipe;
