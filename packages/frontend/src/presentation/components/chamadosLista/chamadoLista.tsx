/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/restrict-plus-operands */

import { Sidebar, Menu, MenuItem, useProSidebar, sidebarClasses } from "react-pro-sidebar";
import Styles from "./chamadoListaStyle.scss";
import { VisualizarChamado } from "@/main/enums/visualizar-chamado";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";

import React, { useContext, useEffect, useState } from "react";
import Chamado from "@/presentation/components/chamado/chamado";
import { TipoChamado } from "@/main/enums/tipo-chamado";
import { getAllRequests, getAllRequestsByUser } from "@/main/api/api";
import { AuthContext } from "@/main/contexts/authcontext";
type FileChamado = {
  base64: string;
  ext: string;
  file_name: string;
  file_id: string;
};

export type ChamadoType = {
  request_id: string;
  title: string;
  description: string;
  requestType: TipoChamado;
  created_at: string;
  requestStep: string;
  status: string;
  files: FileChamado[];
};

const ChamadoLista: React.FC<{ chamadoState: any; visualizacaoChamado: VisualizarChamado; width:any; setWidht:any;}> = (props) => {
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

        setChamados(response.data);
        setChamadosFiltrados(response.data);
      }
    } catch (e: any) {
      console.log(e.response.data.message);
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
          transitionDuration={1000}
          closeOnClick={true}

        >
          <MenuItem
            onClick={() => {
              if (aberto){
                console.log("teste")
                props.setWidht(1390)
                setAberto(false)
              }else{
                props.setWidht(1150)
                setAberto(true)
                console.log('Teste2')
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
