import { useContext, useEffect, useState } from "react";
import Styles from "./listagemEquipeStyles.scss";
import { deleteTeam, getAllTeams } from "@/main/api/api";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "@/main/contexts/authcontext";
import { useAlert } from "@/main/services";

const ListagemEquipe: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const { user } = useContext(AuthContext);
  const alert = useAlert()

  const loadTeams = async () => {
    try {
      const response = await getAllTeams();
      setData(response.data);
    } catch (e) {
      alert.criarAlerta({
        icon: 'error',
        html: "Ocorreu um erro ao carregar as equipes",
        title: 'Erro'
      }) 
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const handleEdit = (e: any, item: any) => {
    e.preventDefault();

    navigate("/editTeam", { replace: true, state: item });
  };

  const handleDelete = (e: any, item: any) => {
    e.preventDefault();

    alert.criarConfirmacao({
      title: "Aviso",
      html: `Deseja excluir ${item.team_name}?`,
      confirmAction: async () => {
        try {
          await deleteTeam(item.team_id);

          alert.criarAlerta({
            icon: 'success',
            html: `Equipe ${item.team_name} excluída com sucesso!`
          }) 
          loadTeams();
        } catch (e) {
          let errorMessage = e.response.data.message;
          if (errorMessage.includes("QueryFailedError: update or delete")) {
            errorMessage =
             "Existem usuários ou grupos vinculados a esta equipe.";
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
          <h1>Equipes</h1>
          <hr />
        </div>
        <div className={Styles.tableTeams}>
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
                    <td colSpan={3}>Nenhuma equipe encontrada</td>
                  </tr>
                </>
              ) : (
                <></>
              )}
              {data.map((item: any) => (
                <tr key={item.team_id}>
                  <td>{item.team_name}</td>
                  <td>{item.description}</td>
                  <td>
                    <div className={Styles.icons}>
                      {item.team_id === user.team.team_id ? (
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
                      {item.team_id === user.team.team_id ? (
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

export default ListagemEquipe;
