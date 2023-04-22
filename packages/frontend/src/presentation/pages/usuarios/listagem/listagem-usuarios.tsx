import { useEffect, useState } from "react";
import Styles from "./listagem-usuarios-styles.scss";
import { deleteUser, getAllUsers } from "@/main/api/api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

const ListagemUsuarios: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const loadUsers = async () => {
    try {
      const response = await getAllUsers();
      setData(response.data.users);
    } catch (e) {
      console.log("test " + e);
      Swal.fire("Erro", "Ocorreu um erro ao carregar os usuários", "error");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleEdit = (e: any, item: any) => {
    e.preventDefault();

    navigate("/editUser", { replace: true, state: item });
  };

  const handleDelete = (e: any, item: any) => {
    e.preventDefault();

    MySwal.fire({
      title: "Aviso",
      html: `Deseja mesmo excluir o usuário ${item.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      confirmButtonColor: "#76ba1b",
      cancelButtonText: "Não, cancelar",
      cancelButtonColor: "#ff0000",
    }).then(async (r) => {
      if (r.isConfirmed) {
        try {
          await deleteUser(item.user_id);

          Swal.fire(
            "Sucesso",
            `Usuário ${item.name} excluído com sucesso!`,
            "success"
          );
          loadUsers();
        } catch (e) {
          let errorMessage = e.response.data.message;
          if (errorMessage.includes("QueryFailedError: update or delete")) {
            errorMessage =
              "Existem informações de chamados vinculadas a esse usuário, por isso não foi possível excluí-lo.";
          }
          Swal.fire(
            "Erro",
            `Ocorreu um erro ao excluir o usuário. ${errorMessage}`,
            "error"
          );
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
        <div className={Styles.tableUsers}>
          <table className={Styles.table}>
            <thead>
              <tr className={Styles.headRow}>
                <td>Nome</td>
                <td>Email</td>
                <td>Grupo</td>
                <td>Equipe</td>
                <td>Ações</td>
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
                    <div>
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

export default ListagemUsuarios;
