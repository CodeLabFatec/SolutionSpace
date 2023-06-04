import Styles from "./edicaochamado.scss";

import React, { useState, useEffect } from "react"; 
import { Dropzone } from "@/presentation/components";

import { useLocation, useNavigate } from "react-router-dom";
import { useAlert } from "@/main/services";
import { editRequest, getRequestById } from "@/main/api/api";
import { uniqueId } from "lodash";
import { filesize } from "filesize";

const EdicaoChamados: React.FC = () => {

  const [id, setId] = useState('')
  const [titulo, setTitulo] = useState<string>("");
  const [detalhes, setDetalhes] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const navigate = useNavigate();
  const alert = useAlert();

  const location = useLocation()
  
  useEffect(() => {
    const chamado = location.state; 

    if(!chamado){
      alert.criarAlerta({
        icon: "error",
        html: "Ocorreu um erro ao carregar o chamado.",
        title: "Erro",
      });
      navigate('/home')
      return
    }

    const fetchChamado = async () => {
      try {
        setId(chamado)
  
        const response = await getRequestById(chamado); 
  
        setTitulo(response.data.title);
        setDetalhes(response.data.description);
        if(response.data.files.length > 0){
          response.data.files.forEach((item: any) => {
            const fl = srcToFile(`${item.base64}`, item.file_name, item.ext);
            const file = {
              name: item.file_name,
              base64: item.base64,
              type: item.ext,
              id: uniqueId(),
              readableSize: filesize(fl.size),
              preview: `data:${item.ext};base64,${item.base64}`,
              progress: 100,
              uploaded: true,
              error: false,
              url: `data:${item.ext};base64,${item.base64}`
            }
            uploadedFiles.push(file)
          })
        }        
      }catch (e) {
  
        alert.criarAlerta({
          icon: "error",
          html: "Ocorreu um erro ao carregar o chamado.",
          title: "Erro",
        });
        navigate('/home')

      }
    };
  
    fetchChamado();
  }, []); 

  function srcToFile(src: string, fileName: string, mimeType: string){
    return new File([src], fileName, { type: mimeType })
}
  

  const handleRequest = async () => {
    try {
      const files: any[] = [];
      if (uploadedFiles.length > 0) {
        uploadedFiles.forEach((file) => {
          files.push({
            file_name: file.name,
            base64: file.base64,
            ext: file.type
          });
        });
      }

      await editRequest(id, titulo, detalhes, files)

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
      html: "Deseja alterar esse chamado?",
      confirmAction: () => {
        handleRequest();
      },
    });
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.H1formularioChamados}>
        <h1>Editando chamado</h1>
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
            onClick={()=> navigate('/home')}
          />
          <input
            type="submit"
            value="Salvar alterações"
            className={Styles.buttonEnviar}
          />
        </div>
      </form>
    </div>
  );
};

export default EdicaoChamados;


