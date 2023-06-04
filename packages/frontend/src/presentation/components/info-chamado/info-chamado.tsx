import React, { useContext } from "react";
import Styles from "./info-chamado-styles.scss";
import { VisualizarChamado } from "@/main/enums/visualizar-chamado";
import { useNavigate } from "react-router-dom";
import { ChamadoType } from "@/main/types";
import { AuthContext } from "@/main/contexts/authcontext";
import moment from "moment";
import { useAlert, useDownload } from "@/main/services";
import { unarchiveRequest } from "@/main/api/api";

const InfoChamado: React.FC<{
  chamado: ChamadoType | undefined;
  visualizacaoChamado: VisualizarChamado;
}> = (props) => {

  const navigate = useNavigate();
  const download = useDownload();
  const { user } = useContext(AuthContext)
  const alert = useAlert()


  const applyMarginToButton: any =
    props.chamado?.approved ||
    props.chamado?.arquived
      ? { marginRight: "2vh" }
      : {};

  const handleDownload = (e: any) => {
    e.preventDefault();
    if (props.chamado == null) return;

    if (props.chamado.files.length <= 0) return;

    props.chamado.files.forEach(async (file: any) => {
      await download.download(file.ext, file.base64, file.file_name);
    });
  };

  const handleRequest = async () => {
    if (props.chamado !== undefined){
    try {
      await unarchiveRequest(props.chamado.request_id);
      alert.criarAlerta({
        icon: 'success',
        html: "Chamado desarquivado com sucesso!",
        confirmAction: () => {
          navigate("/home");
        }
      });
    } catch (e: any) {
      let errorMessage = e.response.data;
  
      if (errorMessage === "Unable to unarchive this request") {
        errorMessage = "Não é possível desarquivar o chamado";
      }
     }
    }
  };
 
  const handleClick = (e: any) => {
    e.preventDefault();

    alert.criarConfirmacao({
      title: "Aviso",
      html: 'Deseja desarquivar esse chamado?',
      confirmAction: () => {
        handleRequest();
      }
    })
  };
  
  const BotaoAvaliar = () => {
    const chamado = props.chamado

    if(!chamado) return <></>
    if(chamado.arquived) return (
      <div className={Styles.botoesInfochamado}>
        <button
          style={applyMarginToButton}
          color="secundary"
          className={Styles.botaoVisualizarAnalise}
          onClick={() => {
            navigate("/history", {
              replace: true,
              state: props.chamado,
            });
          }}>
          Ver avaliações
        </button>
      </div>
    )
    if(chamado.approved) return (
      <div className={Styles.botoesInfochamado}>
        <button
          style={applyMarginToButton}
          color="secundary"
          className={Styles.botaoVisualizarAnalise}
          onClick={() => {
            navigate("/history", {
              replace: true,
              state: props.chamado,
            });
          }}>
          Ver avaliações
        </button>
      </div>
    )

    if(chamado.requestStep === 'Analise de risco'){

      if(user.group.canRateAnalise || user.group.mustRateAnalise){
        if(chamado.ratings.length > 0){
          const check = chamado.ratings.find(
            x=> x.requestStep === chamado.requestStep && user.user_id === x.user.user_id)

          if(check){
            return (
              <div className={Styles.botoesInfochamado}>
                <button
                  style={applyMarginToButton}
                  color="secundary"
                  className={Styles.botaoVisualizarAnalise}
                  onClick={() => {
                    navigate("/history", {
                      replace: true,
                      state: props.chamado,
                    });
                  }}>
                  Ver avaliações
                </button>
              </div>
              )
          }
          return (
          <div className={Styles.botoesInfochamado}>
            <button
              className={Styles.botaoAvaliar}
              onClick={() => {
                navigate("/riskAnalysis", {
                  replace: true,
                  state: props.chamado,
                });
              }}>
              Avaliar
            </button>
            <button
            style={applyMarginToButton}
            color="secundary"
            className={Styles.botaoVisualizarAnalise}
            onClick={() => {
              navigate("/history", {
                replace: true,
                state: props.chamado,
              });
            }}>
            Ver avaliações
            </button>
          </div>
          )
        }else{
          return (
          <div className={Styles.botoesInfochamado}>
            <button
              className={Styles.botaoAvaliar}
              onClick={() => {
                navigate("/riskAnalysis", {
                  replace: true,
                  state: props.chamado,
                });
              }}>
              Avaliar
            </button>
            <button
              style={applyMarginToButton}
              color="secundary"
              className={Styles.botaoVisualizarAnalise}
              onClick={() => {
                navigate("/history", {
                  replace: true,
                  state: props.chamado,
                });
              }}>
              Ver avaliações
            </button>
          </div>
          )
        }
      }
      return <></>
    }else{

      if(user.group.canRateAnalinhamento || user.group.mustRateAnalinhamento){
        if(chamado.ratings.length > 0){
          const check = chamado.ratings.find(
            x=> x.requestStep === chamado.requestStep && user.user_id === x.user.user_id)

          if(check){
            return (
            <div className={Styles.botoesInfochamado}>
              <button
                style={applyMarginToButton}
                color="secundary"
                className={Styles.botaoVisualizarAnalise}
                onClick={() => {
                  navigate("/history", {
                    replace: true,
                    state: props.chamado,
                  });
                }}>
                Ver avaliações
              </button>
            </div>
            )
          }
          return (
            <div className={Styles.botoesInfochamado}>
              <button
                className={Styles.botaoAvaliar}
                onClick={() => {
                  navigate("/strategicAlignment", {
                    replace: true,
                    state: props.chamado,
                  });
                }}>
                Avaliar
              </button>
              <button
              style={applyMarginToButton}
              color="secundary"
              className={Styles.botaoVisualizarAnalise}
              onClick={() => {
                navigate("/history", {
                  replace: true,
                  state: props.chamado,
                });
              }}>
              Ver avaliações
              </button>
            </div>
          )
        }else{
          return (
            <div className={Styles.botoesInfochamado}>
              <button
                className={Styles.botaoAvaliar}
                onClick={() => {
                  navigate("/strategicAlignment", {
                    replace: true,
                    state: props.chamado,
                  });
                }}>
                Avaliar
              </button>
              <button
              style={applyMarginToButton}
              color="secundary"
              className={Styles.botaoVisualizarAnalise}
              onClick={() => {
                navigate("/history", {
                  replace: true,
                  state: props.chamado,
                });
              }}>
              Ver avaliações
              </button>
            </div>
          )
        }
      }
      return <></>
    }
  }

  const conteudo: any = () => {
    if (props.chamado !== undefined) {
    
      return (
        <div className={Styles.teste}>

          <p className={Styles.cabecalho}>Criado por {props.chamado.user.name} em {moment(props.chamado.created_at).format('DD/MM/yyyy * HH:mm').replace('*', 'às')}</p>
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

          {props.visualizacaoChamado === VisualizarChamado.TODOS_CHAMADOS ? (
            <BotaoAvaliar />
          ): <></>}

          {props.visualizacaoChamado === VisualizarChamado.MEUS_CHAMADOS ? (
            <div className={Styles.botoesInfochamado}>
              <button
                color="secundary"
                className={Styles.botaoVisualizarAnalise}
                onClick={() => {
                  navigate("/history", {
                    replace: true,
                    state: props.chamado,
                  });
                }}
              >
                Ver avaliações
              </button>
            </div>    
          ): <></>}

          {props.visualizacaoChamado === VisualizarChamado.CHAMADOS_ARQUIVADOS ? (
            <div className={Styles.botoesInfochamado}>
                <button
                  className={Styles.botaoDesarquivar}
                  onClick={handleClick}
                >
                  Desarquivar
                </button>
          
                <button
                style={applyMarginToButton}
                color="secundary"
                className={Styles.botaoVisualizarAnalise}
                onClick={() => {
                  navigate("/history", {
                    replace: true,
                    state: props.chamado,
                  });
                }}
              >
                Ver avaliações
              </button>
            </div>
          ): <></>}
           {props.visualizacaoChamado === VisualizarChamado.MEUS_CHAMADOS ? (
            <div className={Styles.botoesInfochamado}>
              <button
                color="secundary"
                className={Styles.botaoEditarChamado}
                onClick={() => {
                  navigate("/editRequest", {
                    replace: true,
                    state: props.chamado?.request_id,
                  });
                }}
              >
                Editar
              </button>
            </div>    
          ): <></>}
        
          
        </div>
      );
    }
    
    return (
      <div className={Styles.tituloChamadoNull}>
        <p style={{ textAlign: "center" }}>
          Selecione um chamado ao lado para visualizar seus detalhes.
        </p>
      </div>
    );
  };

  return <div className={Styles.infoChamadoWrapper}>{conteudo()}</div>;
};

export default InfoChamado;
