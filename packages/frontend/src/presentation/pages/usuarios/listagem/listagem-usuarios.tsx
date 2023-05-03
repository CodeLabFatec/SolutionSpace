import { useEffect, useState, useContext } from "react";
import Styles from "./listagem-usuarios-styles.scss";
import { deleteUser, getAllUsers } from "@/main/api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/main/contexts/authcontext";
import { useAlert } from "@/main/services";

const ListagemUsuarios: React.FC = () => {
  const navigate = useNavigate();
  const alert = useAlert()
  const [data, setData] = useState([]);

  const { user } = useContext(AuthContext)

  const loadUsers = async () => {
    try {
      const response = await getAllUsers();
      setData(response.data.users);
    } catch (e) {
      alert.criarAlerta({
        icon: 'error',
        html: "Ocorreu um erro ao carregar os usuários",
        title: 'Erro'
      }) 
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

    alert.criarConfirmacao({
      title: "Aviso",
      html: `Deseja excluir ${item.name}?`,
      confirmAction: async () => {
        try {
          await deleteUser(item.user_id);

          alert.criarAlerta({
            icon: 'success',
            html: `Usuário ${item.name} excluído com sucesso!`
          }) 
          loadUsers();
        } catch (e) {
          let errorMessage = e.response.data.message;
          if (errorMessage.includes("QueryFailedError: update or delete")) {
            errorMessage =
              "Existem chamados vinculadas este usuário.";
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
                      {item.user_id === user.user_id ? <></> : (
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

export default ListagemUsuarios;
