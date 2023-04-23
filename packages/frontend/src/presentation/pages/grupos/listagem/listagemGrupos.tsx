import { useEffect, useState } from "react";
import Styles from "./listagemGrupos.scss";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { deleteGroup, getAllGroups } from "@/main/api/api";

const MySwal = withReactContent(Swal);

const ListagemGrupos: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const loadGroups = async () => {
    try {
      const response = await getAllGroups();
      setData(response.data);
    } catch (e) {
       MySwal.fire({
        title: "Erro",
        html: "Ocorreu um erro ao carregar os grupos",
        width: "350px",
        background: "#FAF0E6",
        color: "#000",
        confirmButtonColor: "#4FB4BC",
      });
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const handleEdit = (e: any, item: any) => {
    e.preventDefault();

    navigate("/editGroup", { replace: true, state: item });
  };

  const handleDelete = (e: any, item: any) => {
    e.preventDefault();

    MySwal.fire({
      html: `Deseja excluir ${item.group_name}?`,
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
          await deleteGroup(item.group_id);

           MySwal.fire({
            html: `Grupo ${item.group_name} excluído com sucesso!`,
            icon: "success",
            width: "350px",
            background: "#FAF0E6",
            color: "#000",
            confirmButtonColor: "#4FB4BC",
          })
          loadGroups();
        } catch (e) {
          let errorMessage = e.response.data.message;
          if (errorMessage.includes("QueryFailedError: update or delete")) {
            errorMessage =
              "Existem usuários ou equipes vinculados a este grupo.";
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

export default ListagemGrupos;
