/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header } from "@/presentation/components";
import Styles from "./analiseRisco.scss";

import React, { useContext, useState } from "react";
import DropZone from "@/presentation/components/dropzone/dropzone";
import { AuthContext } from "@/main/contexts/authcontext";
import { useNavigate, useLocation } from "react-router-dom";
import { createRiskAnalysisRating } from "@/main/api/api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const AnaliseRisco: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [titulo, setTitulo] = useState<string>("");
  const [detalhes, setDetalhes] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

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

      const response = await createRiskAnalysisRating(
        location.state.request_id,
        user.user_id,
        rating,
        titulo,
        detalhes,
        files
      );

      MySwal.fire({
        html: "Avaliação feita com sucesso!",
        icon: "success",
        width: "350px",
        background: "#FAF0E6",
        color: "#000",
        confirmButtonColor: "#4FB4BC",
      }).then((r) => {
        navigate("/home");
      });
    } catch (e: any) {
      let errorMessage = e.response.data;

      if (errorMessage === "Missing required informations to create a rating") {
        errorMessage =
          "Preencha todas as informações.";
      } else if (errorMessage === "User not found") {
        errorMessage =
          "Usuário inválido.";
      } else if (
        errorMessage ===
        "There is already a rating for this request from the same team"
      ) {
        errorMessage = "Chamado já avaliado.";
      } else if (errorMessage === "Request not found") {
        errorMessage =
          "Chamado não encontrado.";
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

    if (location.state === null) {
      MySwal.fire({
        icon: "error",
        html: "Chamado não encontrado.",
        width: "350px",
        background: "#FAF0E6",
        color: "#000",
        confirmButtonColor: "#4FB4BC",
      });
      return;
    }

    if (titulo == null || titulo === "" || titulo === " ") {
      MySwal.fire({
        title: "Opss...",
        html: "Título é obrigatório.",
        width: "350px",
        background: "#FAF0E6",
        color: "#000",
        confirmButtonColor: "#4FB4BC",
      });
      return;
    }

    if (detalhes == null || detalhes === "" || detalhes === " ") {
      MySwal.fire({
        title: "Opss...",
        html: "Detalhes é obrigatório.",
        width: "350px",
        background: "#FAF0E6",
        color: "#000",
        confirmButtonColor: "#4FB4BC",
      });
      return;
    }

    if (rating == null || rating === "" || rating === " ") {
      MySwal.fire({
        title: "Opss...",
        html: "Defina um nível de risco para esse chamado.",
        width: "350px",
        background: "#FAF0E6",
        color: "#000",
        confirmButtonColor: "#4FB4BC",
      });
      return;
    }

    MySwal.fire({
      html: "Deseja salvar avaliação?",
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
      <div className={Styles.H1formularioChamados}>
        <h1>Documento de análise de risco</h1>
        <hr />
      </div>
      <div className={Styles.form}>
        <div className={Styles.tituloDetalhe}>
          <label htmlFor="titulo">Título</label>
          <input
            value={titulo}
            onChange={(e) => {
              setTitulo(e.target.value);
            }}
            type="text"
            className={Styles.inputTitulo}
            id="titulo"
            maxLength={60}
          />
          <label htmlFor="detalhes">Detalhes</label>
          <textarea
            value={detalhes}
            onChange={(e) => {
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
            <DropZone
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
            />
          </div>
          <div className={Styles.formWrapper}>
            <form className={Styles.formAvaliacao} action="" method="">
              <h3 className={Styles.formTitle}>Risco</h3>
              <hr />
              <div className={Styles.debtAmountSlider}>
                <input
                  type="radio"
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                  name="debt-amount"
                  id="0"
                  value="0"
                  required
                />
                <label htmlFor="0" data-debt-amount="Não existe"></label>
                <input
                  type="radio"
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                  name="debt-amount"
                  id="1"
                  value="1"
                  required
                />
                <label htmlFor="1" data-debt-amount="Baixo"></label>
                <input
                  type="radio"
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                  name="debt-amount"
                  id="2"
                  value="2"
                  required
                />
                <label htmlFor="2" data-debt-amount="Médio"></label>
                <input
                  type="radio"
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                  name="debt-amount"
                  id="3"
                  value="3"
                  required
                />
                <label htmlFor="3" data-debt-amount="Alto"></label>
                <div className={Styles.debtAmountPos}></div>
              </div>
            </form>
          </div>
          <input
            type="button"
            onClick={handleSubmit}
            value="Confirmar avaliação"
            className={Styles.buttonEnviar}
          />
          {/* <div
            className={Styles.openModal}
            onClick={() => {
              setOpenModal(true)
            }}
          >
            <i className='large material-icons'>assignment_turned_in</i>
          </div>
          <Modal
            isOpen={openModal}
            titulo={''}
            setModalClose={() => {
              setOpenModal(!openModal)
            }}
          >
            <div>a</div>
          </Modal> */}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default AnaliseRisco;
