import Styles from "./formularioChamados.scss";
import { createRequest } from "@/main/api/api";
import React, { useState, useContext } from "react";
import { Dropzone } from "@/presentation/components";
import { TipoChamado } from "@/main/enums";

import { AuthContext } from "@/main/contexts/authcontext";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@/main/services";

const FormularioChamados: React.FC<{ tipoChamado: TipoChamado }> = (props) => {
  const title =
    props.tipoChamado === TipoChamado.FEATURE ? "Nova feature" : "Hotfix";

  const [titulo, setTitulo] = useState<string>("");
  const [detalhes, setDetalhes] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const alert = useAlert()

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

      await createRequest(
        user.user_id,
        titulo,
        detalhes,
        props.tipoChamado === TipoChamado.FEATURE ? "FEATURE" : "hotfix",
        files
      );

      alert.criarAlerta({
        icon: 'success',
        html: "Chamado aberto com sucesso.",
        confirmAction: () => {
          navigate("/home");
        }
      })
    } catch (e: any) {
      let errorMessage = e.response.data.message;

      if (
        errorMessage === "Missing required informations to create a request"
      ) {
        errorMessage =
          "Preencha todas as informações.";
      } else if (errorMessage === "User not found") {
        errorMessage =
          "Usuário inválido.";
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

    if (titulo == null || titulo === "" || titulo === " ") {
      alert.criarAlerta({
        html: "Título é obrigatório.",
        title: 'Opss...'
      })
      return;
    }

    if (detalhes == null || detalhes === "" || detalhes === " ") {
      alert.criarAlerta({
        html: "Detalhes é obrigatório.",
        title: 'Opss...'
      })
      return;
    }

    alert.criarConfirmacao({
      title: "Aviso",
      html: "Deseja salvar esse chamado?",
      confirmAction: () => {
        handleRequest();
      }
    })
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
export default FormularioChamados;
