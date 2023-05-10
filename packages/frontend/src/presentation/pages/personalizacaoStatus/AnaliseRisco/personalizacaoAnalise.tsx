import { useState, useEffect } from "react";
import Styles from "./personalizacaoStatusStyles.scss";
import { useNavigate } from "react-router-dom";
import { FormGroup, Switch } from "@mui/material";

import { useAlert } from "@/main/services";
import ColorPicker from "@/presentation/components/colorPicker/colorPicker";
import { getStatusConfigurationByRequestStep, updateStatusConfiguration } from "@/main/api/api";

const PersonalizacaoAnalise: React.FC = () => {
  const navigate = useNavigate();

  const [arquivaNota0,setArquivaNota0] = useState(false);
  const [arquivaNota1,setArquivaNota1] = useState(false);
  const [arquivaNota2,setArquivaNota2] = useState(false);
  const [arquivaNota3,setArquivaNota3] = useState(false);
  const [textoNota0,setTextoNota0] = useState("");
  const [textoNota1,setTextoNota1] = useState("");
  const [textoNota2,setTextoNota2] = useState("");
  const [textoNota3,setTextoNota3] = useState("");
  const [corNota0,setCorNota0] = useState("#808080");
  const [corNota1,setCorNota1] = useState("#808080");
  const [corNota2,setCorNota2] = useState("#808080");
  const [corNota3,setCorNota3] = useState("#808080");
  const [avaliacao0,setAvaliacao0] = useState<any>()
  const [avaliacao1,setAvaliacao1] = useState<any>()
  const [avaliacao2,setAvaliacao2] = useState<any>()
  const [avaliacao3,setAvaliacao3] = useState<any>()


  const alert = useAlert();

  const load = async () => {  
    try{
      const response = await getStatusConfigurationByRequestStep('AnaliseRisco')

      const data = response.data

      data.forEach((element: any) => {
        if(element.rating === '0'){
          setArquivaNota0(element.archiveRequests)
          setTextoNota0(element.status)
          setCorNota0(element.color)
          setAvaliacao0(element)
        }else if(element.rating === '1'){
          setArquivaNota1(element.archiveRequests)
          setTextoNota1(element.status)
          setCorNota1(element.color)
          setAvaliacao1(element)
        }else if(element.rating === '2'){
          setArquivaNota2(element.archiveRequests)
          setTextoNota2(element.status)
          setCorNota2(element.color)
          setAvaliacao2(element)
        }else if(element.rating === '3'){
          setArquivaNota3(element.archiveRequests)
          setTextoNota3(element.status)
          setCorNota3(element.color)
          setAvaliacao3(element)
        }
      });
    }catch(e) {
      alert.criarAlerta({
        icon: 'error',
        html: "Ocorreu um erro ao carregar as informações",
        title: 'Erro'
      })
   }
  }

  const handleRequest = async () => {
    try{

      const statuses = []

      avaliacao0.archiveRequests = arquivaNota0
      avaliacao0.color = corNota0
      avaliacao0.status = textoNota0

      avaliacao1.archiveRequests = arquivaNota1
      avaliacao1.color = corNota1
      avaliacao1.status = textoNota1

      avaliacao2.archiveRequests = arquivaNota2
      avaliacao2.color = corNota2
      avaliacao2.status = textoNota2

      avaliacao3.archiveRequests = arquivaNota3
      avaliacao3.color = corNota3
      avaliacao3.status = textoNota3

      statuses.push(avaliacao0)
      statuses.push(avaliacao1)
      statuses.push(avaliacao2)
      statuses.push(avaliacao3)

      await updateStatusConfiguration(statuses)

      alert.criarAlerta({
        icon: 'success',
        html: "Alterações feitas com sucesso.",
        confirmAction: () => {
          navigate("/home");
        }
      });
    }catch(e: any){
      const errorMessage = e.response.data

      alert.criarAlerta({
        icon: 'error',
        html: errorMessage,
        title: 'Erro'
      })
    }
  }

  const handleClick = (e: any) => {
    e.preventDefault()

    if(!validateArchiveRequests()){
      alert.criarAlerta({
        html: "Pelo menos uma nota não deve arquivar automaticamente o chamado.",
        title: 'Opss...'
      })
      return
    }

    if(!validateStatus()){
      alert.criarAlerta({
        html: "Todas as notas devem ter um status preenchido.",
        title: 'Opss...'
      })
      return
    }
    
    alert.criarConfirmacao({
      title: "Aviso",
      html: 'Deseja salvar as alterações?',
      confirmAction: () => {
        handleRequest();
      }
    })
  }

  const validateArchiveRequests = () => {
    if(arquivaNota0 && arquivaNota1 && arquivaNota2 && arquivaNota3){
      return false
    }
    return true
  }

  const validateStatus = () => {
    if(!textoNota0 || textoNota0 === '' || textoNota0 === ' ') return false
    if(!textoNota1 || textoNota1 === '' || textoNota1 === ' ') return false
    if(!textoNota2 || textoNota2 === '' || textoNota2 === ' ') return false
    if(!textoNota3 || textoNota3 === '' || textoNota3 === ' ') return false

    return true
  }

  useEffect(()=> {
    load()
  }, [])

  return (
    <div className={Styles.container}>
      <div className={Styles.tableContainer}>
        <div className={Styles.title}>
          <h1>Status de análise de risco</h1>
          <hr />
        </div>
        <div className={Styles.tableTeams}>
          <table className={Styles.table}>
            <thead>
              <tr className={Styles.headRow}>
                <td>Nota</td>
                <td>Status</td>
                <td>Cor</td>
                <td>Arquiva automaticamente?</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0</td>
                <td>
                  <input
                    type="text"
                    value={textoNota0}
                    onChange={(e: any) => {
                      setTextoNota0(e.target.value)
                    }}
                    className={Styles.textoNota}
                    maxLength={25}
                    placeholder="Editar texto do chamado"
                  />
                </td>
                <td className={Styles.main}>
                  <ColorPicker value={corNota0} setValue={setCorNota0} />
                </td>
                <td>
                  <FormGroup id={Styles.switch}>
                    <Switch
                      value={arquivaNota0}
                      onChange={() => {
                        setArquivaNota0(!arquivaNota0)
                      }}
                      checked={arquivaNota0}
                      id={Styles.switch}
                    />
                  </FormGroup>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <input
                    type="text"
                    value={textoNota1}
                    onChange={(e: any) => {
                      setTextoNota1(e.target.value);
                    }}
                    className={Styles.textoNota}
                    maxLength={25}
                    placeholder="Editar texto do chamado"
                  />
                </td>
                <td className={Styles.main}>
                  <ColorPicker value={corNota1} setValue={setCorNota1} />
                </td>
                <td>
                  <FormGroup id={Styles.switch}>
                    <Switch
                      value={arquivaNota1}
                      onChange={() => {
                        setArquivaNota1(!arquivaNota1)
                      }}
                      checked={arquivaNota1}
                      id={Styles.switch}
                    />
                  </FormGroup>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <input
                    type="text"
                    value={textoNota2}
                    onChange={(e: any) => {
                      setTextoNota2(e.target.value);
                    }}
                    className={Styles.textoNota}
                    maxLength={25}
                    placeholder="Editar texto do chamado"
                  />
                </td>
                <td className={Styles.main}>
                  <ColorPicker value={corNota2} setValue={setCorNota2} />
                </td>
                <td>
                  <FormGroup id={Styles.switch}>
                    <Switch
                     value={arquivaNota2}
                     onChange={() => {
                       setArquivaNota2(!arquivaNota2)
                     }}
                     checked={arquivaNota2}
                     id={Styles.switch}
                    />
                  </FormGroup>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  <input
                    type="text"
                    value={textoNota3}
                    onChange={(e: any) => {
                      setTextoNota3(e.target.value);
                    }}
                    className={Styles.textoNota}
                    maxLength={25}
                    placeholder="Editar texto do chamado"
                  />
                </td>
                <td className={Styles.main}>
                  <ColorPicker value={corNota3} setValue={setCorNota3} />
                </td>
                <td>
                  <FormGroup id={Styles.switch}>
                    <Switch
                      value={arquivaNota3}
                      onChange={() => {
                        setArquivaNota3(!arquivaNota3)
                      }}
                      checked={arquivaNota3}
                      id={Styles.switch}
                    />
                  </FormGroup>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button className={Styles.botaoSalvar} onClick={handleClick}>
        Salvar configurações
      </button>
    </div>
  );
};

export default PersonalizacaoAnalise;
