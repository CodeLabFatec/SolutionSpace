import { useEffect, useState } from "react";
import Styles from "./listagem-usuarios-styles.scss";
import {  getAllTeams, getAllUsers } from "@/main/api/api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

const ListagemEquipe: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const loadTeams = async () => {
    try {
      const response = await getAllTeams();
      setData(response.data.teams);
    } catch (e) {
      console.log("test " + e);
      MySwal.fire({
        title: "Opss...",
        html: "Ocorreu um erro ao carregar as equipes",
        width: "350px",
        background: "#FAF0E6",
        color: "#000",
        confirmButtonColor: "#4FB4BC",
      });
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const handleEdit = (e: any, item: any) => {
    e.preventDefault();

    navigate("/editTeams", { replace: true, state: item });
  };

  const handleDelete = (e: any, item: any) => {
    e.preventDefault();

    MySwal.fire({
      html: `Deseja excluir ${item.name}?`,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#4FB4BC",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#A9A9A9",
      width: '350px',
      background:'#FAF0E6',
      color: '#000',
      reverseButtons: true
    }).then(async (r) => {
      if (r.isConfirmed) {
        try {
          // await deleteTeam(item.user_id);
          MySwal.fire({
            html: `PUsuário ${item.name} excluído com sucesso!`,
            icon: "success",
            width: "350px",
            background: "#FAF0E6",
            color: "#000",
            confirmButtonColor: "#4FB4BC",
          })
          loadTeams();
        } catch (e) {
          let errorMessage = e.response.data.message;
          if (errorMessage.includes("QueryFailedError: update or delete")) {
            errorMessage =
              "Existem chamados vinculados a este usuário.";
          }
          MySwal.fire({
            title: "Erro",
            html: errorMessage,
            width: "350px",
            background: "#FAF0E6",
            color: "#000",
            confirmButtonColor: "#4FB4BC",
          })
        }
      }
    });
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.tableContainer}>
        <div className={Styles.title}>
          <h1>Usuários</h1>
          <hr />
        </div>
        <div className={Styles.tableTeams}>
          <table className={Styles.table}>
            <thead>
              <tr className={Styles.headRow}>
                <td>Nome</td>
                <td>Email</td>
                <td>Grupo</td>
                <td>Equipe</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <>
                  <tr>
                    <td colSpan={5}>Nenhum usuário encontrado</td>
                  </tr>
                </>
              ) : (
                <></>
              )}
              {data.map((item: any) => (
                <tr key={item.user_id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.group?.group_name}</td>
                  <td>{item.team?.team_name}</td>
                  <td>
                    <div className={Styles.icons}>
                      <i
                        onClick={(e: any) => {
                          handleEdit(e, item);
                        }}
                        className="material-icons"
                      >
                        create
                      </i>
                      <i
                        onClick={(e: any) => {
                          handleDelete(e, item);
                        }}
                        className="material-icons"
                      >
                        delete
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

export default ListagemEquipe;
