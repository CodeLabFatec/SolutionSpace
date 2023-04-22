/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React, { useEffect, useState } from "react";
import Styles from "./info-chamado-styles.scss";
import { type ChamadoType } from "../lista-chamados/lista-chamados";
import { VisualizarChamado } from "@/main/enums/visualizar-chamado";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/modal";
import { getRatingsByRequest } from "@/main/api/api";
import { TipoChamado } from "@/main/enums/tipo-chamado";

const InfoChamado: React.FC<{
  chamado: ChamadoType | undefined;
  visualizacaoChamado: VisualizarChamado;
}> = (props) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState<any>(null);

  const applyMarginToButton =
    props.chamado?.status === "Aprovado" ||
    props.chamado?.status === "Arquivado"
      ? { marginRight: "8vh" }
      : {};

  const loadRatings = async () => {
    if (props.chamado != null) {
      if (
        props.chamado.status === "Aberto" &&
        props.chamado.requestType === TipoChamado.HOTFIX
      )
        return;
      if (
        props.chamado.requestStep === "Analise de risco" &&
        props.chamado.requestType === TipoChamado.FEATURE
      )
        return;

      try {
        const response = await getRatingsByRequest(props.chamado.request_id);

        if (response.data.length > 0) {
          const data = response.data;
          setRating(data[data.length - 1]);
        }
      } catch (e) { /*teste*/ }
    }
  };

  useEffect(() => {
    setRating(null);
    loadRatings();
  }, [props]);

  const handleDownload = (e: any) => {
    e.preventDefault();
    if (props.chamado == null) return;

    if (props.chamado.files.length <= 0) return;

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    props.chamado.files.forEach(async (file) => {
      await downloadBase64File(file.ext, file.base64, file.file_name);
    });
  };

  const downloadBase64File = async (
    contentType: string,
    base64Data: string,
    fileName: string
  ) => {
    const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
    downloadLink.remove();
  };

  const conteudo: any = () => {
    if (props.chamado !== undefined) {
      return (
        <div className={Styles.teste}>
          <div className={Styles.tituloDetalhe}>
            <label htmlFor="titulo">Título</label>
            <input
              readOnly={true}
              value={props.chamado.title}
              type="text"
              className={Styles.inputTitulo}
              id="titulo"
              required
              autoFocus
              maxLength={60}
            />
            <label htmlFor="detalhes">Detalhes</label>
            <textarea
              readOnly={true}
              value={props.chamado.description}
              className={Styles.inputDetalhe}
              id="detalhes"
              cols={30}
              rows={10}
              required
            ></textarea>
            {props.chamado.files.length > 0 ? (
              <button
                className={Styles.botaoDownloadArquivo}
                onClick={handleDownload}
              >
                <i className="material-icons">file_download</i>
              </button>
            ) : (
              <></>
            )}
          </div>

          <div className={Styles.botoesInfochamado}>
            {props.chamado.status === "Arquivado" ? (
              <></>
            ) : props.chamado.status === "Aprovado" ? (
              <></>
            ) : props.chamado.requestStep === "Analise de risco" ? (
              <button
                className={Styles.botaoAvaliar}
                onClick={() => {
                  navigate("/riskAnalysis", {
                    replace: true,
                    state: props.chamado,
                  });
                }}
              >
                Avaliar
              </button>
            ) : (
              <button
                className={Styles.botaoAvaliar}
                onClick={() => {
                  navigate("/strategicAlignment", {
                    replace: true,
                    state: props.chamado,
                  });
                }}
              >
                Avaliar
              </button>
            )}

            {rating != null ? (
              <>
                <button
                  style={applyMarginToButton}
                  className={Styles.botaoVisualizarAnalise}
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  Visualizar avaliação
                </button>
                <Modal
                  isOpen={openModal}
                  titulo={
                    rating != null
                      ? rating.title +
                        " - " +
                        rating.user.name +
                        " (Avaliação: " +
                        rating.rating +
                        ")"
                      : "Avaliação"
                  }
                  setModalClose={() => {
                    setOpenModal(!openModal);
                  }}
                >
                  {rating != null ? (
                    <p>{rating.description}</p>
                  ) : (
                    <p>Ocorreu um erro ao carregar a avaliação.</p>
                  )}
                </Modal>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      );
    }
    return (
      <div className={Styles.tituloChamado}>
        <p style={{ textAlign: "center" }}>
          Selecione um chamado ao lado para visualizar seus detalhes.
        </p>
      </div>
    );
  };

  return <div className={Styles.infoChamadoWrapper}>{conteudo()}</div>;
};

export default InfoChamado;
