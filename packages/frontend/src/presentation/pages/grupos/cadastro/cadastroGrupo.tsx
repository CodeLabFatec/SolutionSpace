import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import Styles from "./cadastroGrupo.scss"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createGroup, getAllTeams } from "@/main/api/api";
import { SelectType } from "@/presentation/components";


const MySwal = withReactContent(Swal);

const CadastroGrupo: React.FC = () => {
  const [nomeGrupo, setNomeGrupo] = useState("");
  const [descricaoGrupo, setDescricaoGrupo] = useState("");
  const [nomeEquipe, setNomeEquipe] = useState("");
  const [solicicitarFeature, setSolicicitarFeature] = useState(false);
  const [solicitarHotfix, setSolicitarHotfix] = useState(false);
  const [avaliarAnaliseRisco, setAvaliarAnaliseRisco] = useState(false);
  const [analiseObrigatoria, setAnaliseObrigatoria] = useState(false);
  const [avaliarAlinhamento, setAvaliarAlinhamento] = useState(false);
  const [alinhamentoObrigarorio, setAlinhamentoObrigarorio] = useState(false);
  const [equipes] = useState<any[]>([])

  const loadEquipes = async () => {
    try {
      const response = await getAllTeams()
      response.data.map((item: any) => {
        equipes.push({ label: item.team_name, value: item.team_id })
      })
    } catch (e) {
      MySwal.fire({
        title: "Erro",
        html: 'Ocorreu um erro ao carregar as equipes.',
        width: "350px",
        background: "#FAF0E6",
        color: "#000",
        confirmButtonColor: '#4FB4BC',
      });
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
  }

  const handleAvaliarAlinhamento = () => {
    setAvaliarAlinhamento(!avaliarAlinhamento)
  }

  const handleAnaliseObrigatoria = () => {
    setAnaliseObrigatoria(!analiseObrigatoria)
  }

  const handleAlinhamentoObrigarorio = () => {
    setAlinhamentoObrigarorio(!alinhamentoObrigarorio)
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

      MySwal.fire({
        html: "Grupo salvo com sucesso.",
        icon: "success",
        width: "350px",
        background: "#FAF0E6",
        color: "#000",
        confirmButtonColor: "#4FB4BC",
      }).then((r) => {
        navigate("/team");
      });
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

    if (!nomeGrupo || nomeGrupo === '' || nomeGrupo === ' ') {
      MySwal.fire({
        title: "Opss...",
        html: "Nome do grupo é obrigatório.",
        width: "350px",
        background: "#FAF0E6",
        color: "#000",
        confirmButtonColor: '#4FB4BC'
      });
      return;
    }

    if (!descricaoGrupo || descricaoGrupo === '' || descricaoGrupo === ' ') {
      MySwal.fire({
        title: "Opss...",
        html: "Descrição do grupo é obrigatória.",
        width: "350px",
        background: "#FAF0E6",
        color: "#000",
        confirmButtonColor: '#4FB4BC'
      });
      return;
    }

    if (!nomeEquipe || nomeEquipe === '' || nomeEquipe === ' ') {
      MySwal.fire({
        title: "Opss...",
        html: "Escolha de uma equipe é obrigatória.",
        width: "350px",
        background: "#FAF0E6",
        color: "#000",
        confirmButtonColor: '#4FB4BC'
      });
      return;
    }

    MySwal.fire({
      title: "Aviso",
      html: "Deseja salvar grupo?",
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
      <div className={Styles.H1cadastroGrupo}>
        <h1>Cadastro de grupos</h1>
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
                  control={<Switch value={avaliarAnaliseRisco} />}
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
                  control={<Switch value={avaliarAlinhamento} />}
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