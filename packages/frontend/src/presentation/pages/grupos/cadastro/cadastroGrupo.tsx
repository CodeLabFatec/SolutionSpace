import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import Styles from "./cadastroGrupo.scss"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGroup, getAllTeams } from "@/main/api/api";
import { SelectType } from "@/presentation/components";
import { useAlert } from "@/main/services";

const CadastroGrupo: React.FC = () => {
  const [nomeGrupo, setNomeGrupo] = useState("");
  const [descricaoGrupo, setDescricaoGrupo] = useState("");
  const [nomeEquipe, setNomeEquipe] = useState("");
  const [solicicitarFeature, setSolicicitarFeature] = useState(false);
  const [solicitarHotfix, setSolicitarHotfix] = useState(false);
  const [avaliarAnaliseRisco, setAvaliarAnaliseRisco] = useState<boolean>(false);
  const [analiseObrigatoria, setAnaliseObrigatoria] = useState<boolean>(false);
  const [avaliarAlinhamento, setAvaliarAlinhamento] = useState(false);
  const [alinhamentoObrigarorio, setAlinhamentoObrigarorio] = useState(false);
  const [equipes] = useState<any[]>([])
  const alert = useAlert()

  const loadEquipes = async () => {
    try {
      const response = await getAllTeams()
      response.data.map((item: any) => {
        equipes.push({ label: item.team_name, value: item.team_id })
      })
    } catch (e) {
      alert.criarAlerta({
        icon: 'error',
        html: 'Ocorreu um erro ao carregar as equipes.',
        title: 'Erro'
      })
    }
  }

  useEffect(() => {
    loadEquipes()
  }, [])

  const navigate = useNavigate();

  const handleSolicitarFeature = () => {
    setSolicicitarFeature(!solicicitarFeature)
  }

  const handleSolicitarHotfix = () => {
    setSolicitarHotfix(!solicitarHotfix)
  }

  const handleAvaliarAnaliseRisco = () => {
    setAvaliarAnaliseRisco(!avaliarAnaliseRisco)
    if (analiseObrigatoria == true){
      setAvaliarAnaliseRisco(true)
    }
  }

  const handleAvaliarAlinhamento = () => {
    setAvaliarAlinhamento(!avaliarAlinhamento)
    if (alinhamentoObrigarorio == true){
      setAvaliarAlinhamento(true)
    }
  }

  const handleAnaliseObrigatoria = () => {
    setAnaliseObrigatoria(!analiseObrigatoria)
    if (avaliarAnaliseRisco == false){
      setAvaliarAnaliseRisco(true)
    }
  }

  const handleAlinhamentoObrigarorio = () => {
    setAlinhamentoObrigarorio(!alinhamentoObrigarorio)
    if (avaliarAlinhamento == false){
      setAvaliarAlinhamento(true)
    }
  }

  const handleRequest = async () => {
    try {

      await createGroup(
        nomeEquipe,
        nomeGrupo,
        descricaoGrupo,
        solicicitarFeature,
        solicitarHotfix,
        avaliarAnaliseRisco,
        analiseObrigatoria,
        avaliarAlinhamento,
        alinhamentoObrigarorio)

      alert.criarAlerta({
        icon: 'success',
        html: 'Grupo salvo com sucesso.',
        confirmAction: () => {
          navigate("/groups");
        }
      })
    } catch (e: any) {
      let errorMessage = e.response.data.message;

      if (
        errorMessage === "All properties are required to create a group"
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

    if (!nomeGrupo || nomeGrupo === '' || nomeGrupo === ' ') {
      alert.criarAlerta({
        html: "Nome do grupo é obrigatório.",
        title: 'Opss...'
      })
      return;
    }

    if (!descricaoGrupo || descricaoGrupo === '' || descricaoGrupo === ' ') {
      alert.criarAlerta({
        html: "Descrição do grupo é obrigatória.",
        title: 'Opss...'
      })
      return;
    }

    if (!nomeEquipe || nomeEquipe === '' || nomeEquipe === ' ') {
      alert.criarAlerta({
        html: "Escolha de uma equipe é obrigatória.",
        title: 'Opss...'
      })
      return;
    }

    alert.criarConfirmacao({
      title: "Aviso",
      html: "Deseja salvar o grupo?",
      confirmAction: () => {
        handleRequest();
      }
    })
  };


  return (
    <div className={Styles.container}>
      <div className={Styles.H1cadastroGrupo}>
        <h1>Cadastro de grupo</h1>
        <hr />
        <form className={Styles.formCadastroGrupo} onSubmit={handleSubmit}>
          <div className={Styles.inputGroup}>
            <div style={{ width: '50%' }}>
              <label htmlFor='nome'>Nome</label>
              <input className={Styles.inputText}
                maxLength={60} value={nomeGrupo} onChange={(e: any) => { setNomeGrupo(e.target.value) }}></input>
              <label htmlFor='nome'>Descrição</label>
              <input className={Styles.inputText}
                maxLength={60} value={descricaoGrupo} 
                onChange={(e: any) => { setDescricaoGrupo(e.target.value) }}></input>
              <label htmlFor='nome'>Equipe</label>
              <div style={{ width: '100%' }}>
                <SelectType width="550px" onChange={setNomeEquipe} options={equipes} />
              </div>
            </div>
            <div className={Styles.permissionsContainer}>
              <FormGroup id={Styles.teste}>
                <FormControlLabel
                  control={<Switch value={solicicitarFeature} />}
                  onChange={handleSolicitarFeature}
                  label="Poderá solicitar features?"
                  labelPlacement="start"
                  id={Styles.Switch}
                />
                <FormControlLabel
                  control={<Switch value={solicitarHotfix} />}
                  onChange={handleSolicitarHotfix}
                  label="Poderá solicitar hotfix?"
                  labelPlacement="start"
                  id={Styles.Switch}
                />
                <FormControlLabel
                  control={<Switch value={avaliarAnaliseRisco} checked={avaliarAnaliseRisco}/>}
                  onChange={handleAvaliarAnaliseRisco}
                  label="Poderá avaliar a Análise de Risco?"
                  labelPlacement="start"
                  id={Styles.Switch}
                />
                <FormControlLabel
                  control={<Switch value={analiseObrigatoria} />}
                  onChange={handleAnaliseObrigatoria}
                  label="É obrigatória?"
                  labelPlacement="start"
                  id={Styles.Switch}
                />
                <FormControlLabel
                  control={<Switch value={avaliarAlinhamento} checked={avaliarAlinhamento}/>}
                  onChange={handleAvaliarAlinhamento}
                  label="Poderá avaliar o Alinhamento Estratégico?"
                  labelPlacement="start"
                  id={Styles.Switch}
                />
                <FormControlLabel
                  control={<Switch value={alinhamentoObrigarorio} />}
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
                value="Cadastrar"
                className={Styles.buttonEnviar}
              />
            </div>

          </div>


        </form>

      </div>
    </div>
  );

}
export default CadastroGrupo;