import Styles from "./edicaochamado.scss";

import React, { useState, useContext, useEffect } from "react"; 
import { Dropzone } from "@/presentation/components";
import { TipoChamado } from "@/main/enums";

import { AuthContext } from "@/main/contexts/authcontext";
import { useLocation, useNavigate } from "react-router-dom";
import { useAlert } from "@/main/services";
import { getAllRequests, getRequestById } from "@/main/api/api";

const EdicaoChamados: React.FC<{ tipoChamado: TipoChamado }> = (props) => {
  const title =
    props.tipoChamado === TipoChamado.FEATURE ? "Nova feature" : "Hotfix";

  const [titulo, setTitulo] = useState<string>("");
  const [detalhes, setDetalhes] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const alert = useAlert();

  const location = useLocation()
  
  useEffect(() => {
    const fetchChamado = async () => {
      try {
        const chamado = location.state.request_id; 
  
       await getRequestById(chamado); 
  
        setTitulo(chamado.titulo);
        setDetalhes(chamado.detalhes);
        setUploadedFiles(chamado.uploadedFiles);
      }catch (e) {
  
        alert.criarAlerta({
          icon: "error",
          html: "Ocorreu um erro ao carregar os chamados.",
          title: "Erro",
        });

      }
    };
  
    fetchChamado();
  }, [location.state.request_id]); 
  

  const handleRequest = async () => {
    try {
      const files: any[] = [];
      if (uploadedFiles.length > 0) {
        uploadedFiles.forEach((file) => {
          files.push({
            file_name: file.name,
            base64: file.base64,
            ext: file.type,
          });
        });
      }

    //  await updateRequest({
    //    id: location.state.request_id,
    //    titulo: titulo,
    //    detalhes: detalhes,
    //    uploadedFiles: files
    //  });
      

      alert.criarAlerta({
        icon: "success",
        html: "Chamado editado com sucesso.",
        confirmAction: () => {
          navigate("/home");
        },
      });
    } catch (e: any) {
      let errorMessage = e.response.data.message;

      if (
        errorMessage === "Missing required informations to create a request"
      ) {
        errorMessage = "Não foi possível alterar o chamado.";
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

    if (titulo == null || titulo === "" || titulo === " ") {
      alert.criarAlerta({
        html: "É necessário ter um título.",
        title: "Opss...",
      });
      return;
    }

    if (detalhes == null || detalhes === "" || detalhes === " ") {
      alert.criarAlerta({
        html: "Detalhes é obrigatório.",
        title: "Opss...",
      });
      return;
    }

    alert.criarConfirmacao({
      title: "Aviso",
      html: "Deseja salvar esse chamado?",
      confirmAction: () => {
        handleRequest();
      },
    });
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.H1formularioChamados}>
        <h1>{title}</h1>
        <hr />
      </div>
      <form onSubmit={handleSubmit} className={Styles.form}>
        <div className={Styles.tituloDetalhe}>
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e: any) => {
              setTitulo(e.target.value);
            }}
            className={Styles.inputTitulo}
            id="titulo"
            maxLength={40}
          />
          <label htmlFor="detalhes">Detalhes</label>
          <textarea
            value={detalhes}
            onChange={(e: any) => {
              setDetalhes(e.target.value);
            }}
            className={Styles.inputDetalhe}
            name=""
            id="detalhes"
            cols={30}
            rows={10}
          ></textarea>
        </div>
        <div className={Styles.arquivoBotao}>
          <div className={Styles.dropzoneContainer}>
            <Dropzone
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
            />
          </div>
          <input
            type="button"
            value="Cancelar"
            className={Styles.buttonCancelar}
          />
          <input
            type="submit"
            value="Enviar para o comitê de aprovação"
            className={Styles.buttonEnviar}
          />
        </div>
      </form>
    </div>
  );
};

export default EdicaoChamados;


