import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import Styles from "./edicaoGrupo.scss";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllTeams, updateGroup } from "@/main/api/api";
import Select from "react-select";
import { useAlert } from "@/main/services";

const EdicaoGrupo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const alert = useAlert();

  const [id, setId] = useState<string>("");
  const [nomeGrupo, setNomeGrupo] = useState("");
  const [descricaoGrupo, setDescricaoGrupo] = useState("");
  const [equipe, setEquipe] = useState<any>();
  const [solicitarFeature, setSolicicitarFeature] = useState(false);
  const [solicitarHotfix, setSolicitarHotfix] = useState(false);
  const [avaliarAnaliseRisco, setAvaliarAnaliseRisco] = useState(false);
  const [analiseObrigatoria, setAnaliseObrigatoria] = useState(false);
  const [avaliarAlinhamento, setAvaliarAlinhamento] = useState(false);
  const [alinhamentoObrigarorio, setAlinhamentoObrigarorio] = useState(false);
  const [equipes] = useState<any[]>([]);

  const loadEquipes = async () => {
    try {
      const response = await getAllTeams();
      response.data.map((item: any) => {
        equipes.push({ label: item.team_name, value: item.team_id });
      });
    } catch (e) {
      alert.criarAlerta({
        icon: "error",
        html: "Ocorreu um erro ao carregar as equipes.",
        title: "Erro",
      });
    }
  };

  const loadGroup = async () => {
    const group = location.state;

    if (!group) {
      alert.criarAlerta({
        icon: "error",
        html: "Ocorreu um erro ao carregar as informações do grupo a ser editado.",
        title: "Erro",
      });
      navigate("/groups");
      return;
    }
    setId(group.group_id);
    setNomeGrupo(group.group_name);
    setDescricaoGrupo(group.description);
    setEquipe({ value: group.team.team_id, label: group.team.team_name });
    setSolicicitarFeature(group.canRequestFeatures);
    setSolicitarHotfix(group.canRequestHotfix);
    setAvaliarAnaliseRisco(group.canRateAnalise);
    setAnaliseObrigatoria(group.mustRateAnalise);
    setAvaliarAlinhamento(group.canRateAnalinhamento);
    setAlinhamentoObrigarorio(group.mustRateAnalinhamento);
  };

  useEffect(() => {
    loadGroup();
    loadEquipes();
  }, []);

  const handleSolicitarFeature = () => {
    setSolicicitarFeature(!solicitarFeature);
  };

  const handleSolicitarHotfix = () => {
    setSolicitarHotfix(!solicitarHotfix);
  };

  const handleAvaliarAnaliseRisco = () => {
    setAvaliarAnaliseRisco(!avaliarAnaliseRisco);
    if (analiseObrigatoria == true) {
      setAvaliarAnaliseRisco(true);
    }
  };

  const handleAvaliarAlinhamento = () => {
    setAvaliarAlinhamento(!avaliarAlinhamento);
  };

  const handleAnaliseObrigatoria = () => {
    setAnaliseObrigatoria(!analiseObrigatoria);
    if (avaliarAnaliseRisco == false) {
      setAvaliarAnaliseRisco(true);
    }
  };

  const handleVoltar = () => {
    navigate("/groups");
  };

  const handleAlinhamentoObrigarorio = () => {
    setAlinhamentoObrigarorio(!alinhamentoObrigarorio);
  };

  const handleRequest = async () => {
    try {
      await updateGroup(
        id,
        nomeGrupo,
        equipe.value,
        descricaoGrupo,
        solicitarFeature,
        solicitarHotfix,
        avaliarAlinhamento,
        avaliarAnaliseRisco,
        alinhamentoObrigarorio,
        analiseObrigatoria
      );

      alert.criarAlerta({
        icon: "success",
        html: "Grupo alterado com sucesso.",
        confirmAction: () => {
          navigate("/groups");
        },
      });
    } catch (e: any) {
      let errorMessage = e.response.data.message;

      if (errorMessage === "All properties are required to create a group") {
        errorMessage = "Preencha todas as informações.";
      } else if (errorMessage === "User not found") {
        errorMessage = "Usuário inválido.";
      } else if (errorMessage === "Authorization not found") {
        errorMessage =
          "Você precisa estar autenticado para realizar essa operação.";
      }

      alert.criarAlerta({
        icon: "error",
        html: errorMessage,
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!nomeGrupo || nomeGrupo === "" || nomeGrupo === " ") {
      alert.criarAlerta({
        html: "Nome do grupo é obrigatório.",
        title: "Opss...",
      });
      return;
    }

    if (!descricaoGrupo || descricaoGrupo === "" || descricaoGrupo === " ") {
      alert.criarAlerta({
        html: "Descrição do grupo é obrigatória.",
        title: "Opss...",
      });
      return;
    }

    if (!equipe || equipe.value === "" || equipe.value === " ") {
      alert.criarAlerta({
        html: "Escolha de uma equipe é obrigatória.",
        title: "Opss...",
      });
      return;
    }

    alert.criarConfirmacao({
      title: "Aviso",
      html: "Deseja alterar o grupo?",
      confirmAction: () => {
        handleRequest();
      },
    });
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.H1cadastroGrupo}>
        <h1>Edição de grupo</h1>
        <hr />
        <form className={Styles.formCadastroGrupo} onSubmit={handleSubmit}>
          <div className={Styles.inputGroup}>
            <div style={{ width: "50%" }}>
              <label htmlFor="nome">Nome</label>
              <input
                className={Styles.inputText}
                maxLength={60}
                value={nomeGrupo}
                onChange={(e: any) => {
                  setNomeGrupo(e.target.value);
                }}
              ></input>
              <label htmlFor="nome">Descrição</label>
              <input
                className={Styles.inputText}
                maxLength={60}
                value={descricaoGrupo}
                onChange={(e: any) => {
                  setDescricaoGrupo(e.target.value);
                }}
              ></input>
              <label htmlFor="nome">Equipe</label>
              <div style={{ width: "100%" }}>
                <Select
                  isSearchable={true}
                  onChange={(e: any) => {
                    setEquipe(e);
                  }}
                  value={equipe}
                  options={equipes}
                  styles={selectStyles}
                  placeholder={"Selecione..."}
                />
              </div>
            </div>
            <div className={Styles.permissionsContainer}>
              <FormGroup id={Styles.teste}>
                <FormControlLabel
                  control={
                    <Switch
                      value={solicitarFeature}
                      checked={solicitarFeature}
                    />
                  }
                  onChange={handleSolicitarFeature}
                  label="Poderá solicitar features?"
                  labelPlacement="start"
                  id={Styles.Switch}
                />
                <FormControlLabel
                  control={
                    <Switch value={solicitarHotfix} checked={solicitarHotfix} />
                  }
                  onChange={handleSolicitarHotfix}
                  label="Poderá solicitar hotfix?"
                  labelPlacement="start"
                  id={Styles.Switch}
                />
                <FormControlLabel
                  control={
                    <Switch
                      value={avaliarAnaliseRisco}
                      checked={avaliarAnaliseRisco}
                    />
                  }
                  onChange={handleAvaliarAnaliseRisco}
                  label="Poderá avaliar a Análise de Risco?"
                  labelPlacement="start"
                  id={Styles.Switch}
                />
                <FormControlLabel
                  control={
                    <Switch
                      value={analiseObrigatoria}
                      checked={analiseObrigatoria}
                    />
                  }
                  onChange={handleAnaliseObrigatoria}
                  label="É obrigatória?"
                  labelPlacement="start"
                  id={Styles.Switch}
                />
                <FormControlLabel
                  control={
                    <Switch
                      value={avaliarAlinhamento}
                      checked={avaliarAlinhamento}
                    />
                  }
                  onChange={handleAvaliarAlinhamento}
                  label="Poderá avaliar o Alinhamento Estratégico?"
                  labelPlacement="start"
                  id={Styles.Switch}
                />
                <FormControlLabel
                  control={
                    <Switch
                      value={alinhamentoObrigarorio}
                      checked={alinhamentoObrigarorio}
                    />
                  }
                  onChange={handleAlinhamentoObrigarorio}
                  label="É obrigatório?"
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
          </div>
        </form>
      </div>
    </div>
  );
};

const selectStyles = {
  menuList: (styles: any) => ({
    ...styles,
    background: "#333333",
    color: "#FFF",
  }),
  option: (styles: any) => ({
    ...styles,
    backgroundColor: "#333333",
    zIndex: 1,
  }),
  menu: (base: any) => ({
    ...base,
    marginLeft: "0",
    width: "550px",
    zIndex: 100,
  }),
  control: (styles: any) => ({
    ...styles,
    width: "1200px",
    backgroundColor: "#333333",
    border: "none",
    borderRadius: "4px",
    boxShadow: "none",
    margin: "7px 0 17px 0",
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: "#FFF",
  }),
};

export default EdicaoGrupo;
