import { useContext, useEffect, useState } from "react";
import Styles from "./listagemGrupos.scss";
import { useNavigate } from "react-router-dom";
import { deleteGroup, getAllGroups } from "@/main/api/api";

import { AuthContext } from "@/main/contexts/authcontext";
import { useAlert } from "@/main/services";

const ListagemGrupos: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const alert = useAlert()

  const loadGroups = async () => {
    try {
      const response = await getAllGroups();
      setData(response.data);
    } catch (e) {
      alert.criarAlerta({
        icon: 'error',
        html: "Ocorreu um erro ao carregar os grupos",
        title: 'Erro'
      }) 
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const handleEdit = (e: any, item: any) => {
    e.preventDefault();

    navigate("/editGroup", { replace: true, state: item });
  };

  const handleVisualize = (e: any, item: any) => {
    e.preventDefault();

    navigate("/visualizarGrupo", { replace: true, state: item });
  };

  const handleDelete = (e: any, item: any) => {
    e.preventDefault();

    alert.criarConfirmacao({
      title: "Aviso",
      html: `Deseja excluir ${item.group_name}?`,
      confirmAction: async () => {
        try {
          await deleteGroup(item.group_id);

          alert.criarAlerta({
            icon: 'success',
            html: `Grupo ${item.group_name} excluído com sucesso!`
          }) 
          loadGroups()
        } catch (e) {
          let errorMessage = e.response.data.message;
          if (errorMessage.includes("QueryFailedError: update or delete")) {
            errorMessage =
              "Existem usuários ou equipes vinculados a este grupo.";
          }
          alert.criarAlerta({
            icon: 'error',
            html: errorMessage,
            title: 'Erro'
          }) 
        }      
      }
    })
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.tableContainer}>
        <div className={Styles.title}>
          <h1>Grupos</h1>
          <hr />
        </div>
        <div className={Styles.tableGroups}>
          <table className={Styles.table}>
            <thead>
              <tr className={Styles.headRow}>
                <td>Nome</td>
                <td>Descrição</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <>
                  <tr>
                    <td colSpan={3}>Nenhum grupo encontrado</td>
                  </tr>
                </>
              ) : (
                <></>
              )}
              {data.map((item: any) => (
                <tr key={item.group_id}>
                  <td>{item.group_name}</td>
                  <td>{item.description}</td>
                  <td>
                    <div className={Styles.icons}>
                      {item.group_id === user.group.group_id ? (
                        <></>
                      ) : (
                        <i
                          onClick={(e: any) => {
                            handleEdit(e, item);
                          }}
                          className="material-icons"
                        >
                          create
                        </i>
                      )}
                      {item.group_id === user.group.group_id ? (
                        <></>
                      ) : (
                        <i
                          onClick={(e: any) => {
                            handleDelete(e, item);
                          }}
                          className="material-icons"
                        >
                          delete
                        </i>
                      )}
                       <i
                          onClick={(e: any) => {
                            handleVisualize(e, item);
                          }}
                          className="material-icons"
                        >
                          remove_red_eye
                        </i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListagemGrupos;
