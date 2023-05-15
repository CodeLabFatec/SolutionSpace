import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import Styles from "./chamado-lista-style.scss";
import { VisualizarChamado } from "@/main/enums/visualizar-chamado";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";

import React, { useContext, useEffect, useState } from "react";
import Chamado from "@/presentation/components/chamado/chamado";
import { TipoChamado } from "@/main/enums/tipo-chamado";
import { getAllArchivedRequests, getAllRequests, getAllRequestsByUser } from "@/main/api/api";
import { AuthContext } from "@/main/contexts/authcontext";
import { ChamadoType } from "@/main/types";

const ChamadoLista: React.FC<{ 
  chamadoState: any; visualizacaoChamado: VisualizarChamado; width:any; setWidht:any;}> = (props) => {
  const { collapseSidebar } = useProSidebar();

  const [chamados, setChamados] = useState<ChamadoType[]>([]);
  const [chamadosFiltrados, setChamadosFiltrados] = useState<ChamadoType[]>([]);
  const { user } = useContext(AuthContext);

  const [aberto, setAberto] = useState(true);

  const loadChamados = async () => {
    try {
      if (props.visualizacaoChamado === VisualizarChamado.MEUS_CHAMADOS) {
        const response = await getAllRequestsByUser(user.user_id);

        setChamados(response.data);
        setChamadosFiltrados(response.data);
      } else if (
        props.visualizacaoChamado === VisualizarChamado.TODOS_CHAMADOS
      ) {
        const response = await getAllRequests();
  
        let requests: any[] = []

        requests = response.data.filter((x: any) => !x.arquived && !x.approved)

        if(!user.group.canRateAnalise){
          requests = requests.filter((x: any) => x.requestType !== TipoChamado.FEATURE)
        }

        if(!user.group.canRateAnalinhamento){
          requests = requests.filter((x: any) => x.requestStep === 'Analise de risco')
        }

        setChamados(requests)
        setChamadosFiltrados(requests)

      }
      else if (
        props.visualizacaoChamado === VisualizarChamado.CHAMADOS_ARQUIVADOS
      ){
        const response = await getAllArchivedRequests();

        setChamados(response.data)
        setChamadosFiltrados(response.data)
      }
    } catch (e: any) {
      /* */
    }
  };

  useEffect(() => {
    loadChamados();
  }, [props]);

  const changeFilter: any = (event: any) => {
    const filter = event.target.value.toLowerCase();
    if (filter !== undefined && filter !== null) {
      if (
        filter.toLowerCase() === "feature" ||
        filter.toLowerCase() === "nova feature"
      ) {
        const filteredList = chamados.filter(
          (x) => x.requestType === TipoChamado.FEATURE
        );
        setChamadosFiltrados(filteredList);
      } else if (filter.toLowerCase() === "hotfix") {
        const filteredList = chamados.filter(
          (x) => x.requestType === TipoChamado.HOTFIX
        );
        setChamadosFiltrados(filteredList);
      } else {
        const filteredList = chamados.filter(
          (x) =>
            x.title.toLowerCase().includes(filter) ||
            filter.includes(x.title.toLowerCase())
        );
        setChamadosFiltrados(filteredList);
      }
    }
  };

  return (
    <div
      id="app"
      style={{
        height: "108vh",
        zIndex: "0",
        overflowY: "hidden",
        overflowX: "hidden",
      }}
    >
      <Sidebar
        style={{
          height: "108vh",
          color: "#4FB4BC",
          border: "none",
          textAlign: "left",
        }}
        backgroundColor="#292A2D"
        width={"290px"}
        defaultCollapsed={false}
        collapsedWidth={"50px"}
        transitionDuration={1000}
      >
        <Menu
          transitionDuration={50000}
          closeOnClick={true}

        >
          <MenuItem
            onClick={() => {
              if (aberto){
                props.setWidht(1390)
                setAberto(false)
              }else{
                props.setWidht(1150)
                setAberto(true)
              }
              collapseSidebar();
            }}
            icon={<AlignHorizontalLeftIcon />}
            style={{ padding: "8px" }}
            id={Styles.menuList}
          ></MenuItem>
          <div className={Styles.listaChamadosWrapper}>
            <div className={Styles.listaChamadosPack}>
              <div className={Styles.listaChamadosFiltro}>
                <input placeholder="Pesquisar" onChange={changeFilter} type="text" />
                <div className={Styles.listaChamadosFiltroIcon}>
                  <i className="large material-icons">filter_list</i>
                </div>
              </div>
              {chamadosFiltrados.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <div
                  key={item.request_id}
                  onClick={() => {
                    props.chamadoState(item);
                  }}
                >
                  <Chamado chamado={item} />
                </div>
              ))}
            </div>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default ChamadoLista;
