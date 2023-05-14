import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import Styles from "./visualizarGrupo.scss";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllTeams, updateGroup } from "@/main/api/api";
import Select from "react-select";
import { useAlert } from "@/main/services";

const VisualizarGrupo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const alert = useAlert()

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
        icon: 'error',
        html: 'Ocorreu um erro ao carregar as equipes.',
        title: 'Erro'
      })
    }
  };

  const loadGroup = async () => {
    const group = location.state;

    if (!group) {
      alert.criarAlerta({
        icon: 'error',
        html: "Ocorreu um erro ao carregar as informações do grupo a ser editado.",
        title: 'Erro'
      })
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

  return (
    <div className={Styles.container}>
      <div className={Styles.H1cadastroGrupo}>
        <h1>Visualizar grupo</h1>
        <hr />
        <form className={Styles.formCadastroGrupo}>
          <div className={Styles.inputGroup}>
            <div style={{ width: "50%" }}>
              <label htmlFor="nome">Nome</label>
              <input
                className={Styles.inputText}
                maxLength={60}
                value={nomeGrupo}
                disabled={true}
              ></input>
              <label htmlFor="nome">Descrição</label>
              <input
                className={Styles.inputText}
                maxLength={60}
                value={descricaoGrupo}
                disabled={true}
              ></input>
              <label htmlFor="nome">Equipe</label>
              <div style={{ width: "100%" }}>
                <Select
                  isSearchable={true}
                  isDisabled={true}
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
                      disabled={true}
                    />
                  }
                  label="Poderá solicitar features?"
                  labelPlacement="start"
                  id={Styles.Switch}
                />
                <FormControlLabel
                  control={
                    <Switch value={solicitarHotfix} checked={solicitarHotfix} 
                    disabled={true}/>
                  }
                  label="Poderá solicitar hotfix?"
                  labelPlacement="start"
                  id={Styles.Switch}
                />
                <FormControlLabel
                  control={
                    <Switch
                      value={avaliarAnaliseRisco}
                      checked={avaliarAnaliseRisco}
                      disabled={true}
                    />
                  }
                  label="Poderá avaliar a Análise de Risco?"
                  labelPlacement="start"
                  id={Styles.Switch}
                />
                <FormControlLabel
                  control={
                    <Switch
                      value={analiseObrigatoria}
                      checked={analiseObrigatoria}
                      disabled={true}
                    />
                  }
                  label="É obrigatória?"
                  labelPlacement="start"
                  id={Styles.Switch}
                />
                <FormControlLabel
                  control={
                    <Switch
                      value={avaliarAlinhamento}
                      checked={avaliarAlinhamento}
                      disabled={true}
                      
                    />
                  }
                  label="Poderá avaliar o Alinhamento Estratégico?"
                  labelPlacement="start"
                  id={Styles.Switch}
                />
                <FormControlLabel
                  control={
                    <Switch
                      value={alinhamentoObrigarorio}
                      checked={alinhamentoObrigarorio}
                      disabled={true}
                    />
                  }
                  label="É obrigatório?"
                  labelPlacement="start"
                  id={Styles.Switch}
                />
              </FormGroup>
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

export default VisualizarGrupo;
