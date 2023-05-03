/* eslint-disable @typescript-eslint/no-unused-vars */
import { SelectType } from "@/presentation/components";
import Styles from "./cadastro-usuarios-styles.scss";
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { createUser, getAllTeams, getGroupsByTeam } from "@/main/api/api";
import Select from "react-select";
import { useAlert } from "@/main/services";

const CadastroUsuarios: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState<string>("");
  const [genero, setGenero] = useState<string>();
  const [equipe, setEquipe] = useState<string>();
  const [grupo, setGrupo] = useState<any>();
  const [equipes] = useState<any[]>([]);
  const [grupos] = useState<any[]>([]);

  const navigate = useNavigate();
  const alert = useAlert();

  const generos = [
    { value: "male", label: "Masculino" },
    { value: "female", label: "Feminino" },
    { value: "others", label: "Outro" },
  ];

  const loadEquipes = async () => {
    try {
      const response = await getAllTeams();
      response.data.map((item: any) => {
        equipes.push({ label: item.team_name, value: item.team_id });
      });
    } catch (e) {
      alert.criarAlerta({
        icon: 'error',
        html: 'Ocorreu um erro ao carregar as equipes.',
        title: 'Erro'
      })
    }
  };

  useEffect(() => {
    loadEquipes();
  }, []);

  const handleRequest = async () => {
    if (!genero) return;
    if (!equipe) return;
    if (!grupo) return;
    try {
      await createUser(nome, email, senha, genero, equipe, grupo.value);

      alert.criarAlerta({
        icon: 'success',
        html: 'Usuário salvo com sucesso.',
        confirmAction: () => {
          navigate("/users");
        }
      })

    } catch (e: any) {
      let errorMessage = e.response.data.message;

      if (errorMessage === "All properties are required to create an User") {
        errorMessage =
          "Não foi possível criar o usuário, pois faltam informações.";
      } else if (
        errorMessage === "Internal Server Error - Email already exists"
      ) {
        errorMessage =
          "Não foi possível criar o usuário, pois esse email já está sendo utilizado.";
      } else if (errorMessage === "Team not found") {
        errorMessage =
          "Não foi possível criar o usuário, pois a equipe informada não foi encontrada.";
      } else if (errorMessage === "Group not found") {
        errorMessage =
          "Não foi possível criar o usuário, pois o grupo informado não foi encontrado.";
      } else if (errorMessage === "Authorization not found") {
        errorMessage =
          "Você precisa estar autenticado para realizar essa operação!";
      } else if (
        errorMessage === "duplicate key value violates unique constraint"
      ) {
        errorMessage = "E-mail já cadastrado.";
      }

      alert.criarAlerta({
        icon: 'error',
        html: errorMessage
      })
    }
  };

  function validateEmail(email: string) {
    let validado = false;

    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.com$/;
    if (reg.test(email)) {
      validado = true;
    }

    return validado;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (nome == null || nome === "" || nome === " ") {
      alert.criarAlerta({
        html: "Nome é obrigatório.",
        title: 'Opss...'
      })
      return;
    }

    if (email == null || email === "" || email === " ") {
      alert.criarAlerta({
        html: "Email é obrigatório.",
        title: 'Opss...'
      })
      return;
    }

    if (senha == null || senha === "" || senha === " ") {
      alert.criarAlerta({
        html: "Senha é obrigatório.",
        title: 'Opss...'
      })
      return;
    }

    if (senha.length < 6) {
      alert.criarAlerta({
        html: "Senha deve conter mais que 6 caracteres.",
        title: 'Opss...'
      })
      return
    }

    if (senha !== confirmacaoSenha) {
      alert.criarAlerta({
        html: "Senha e confirmação de senha devem ser iguais.",
        title: 'Opss...'
      })
      return;
    }

    if (genero == null || genero === "" || genero === " ") {
      alert.criarAlerta({
        html: "Gênero é obrigatório.",
        title: 'Opss...'
      })
      return;
    }

    if (equipe == null || equipe === "" || equipe === " ") {
      alert.criarAlerta({
        html: "Equipe é obrigatório.",
        title: 'Opss...'
      })
      return;
    }

    if (grupo == null || grupo.value === "" || grupo.value === " ") {
      alert.criarAlerta({
        html: "Grupo é obrigatório.",
        title: 'Opss...'
      })
      return;
    }

    if (!validateEmail(email)) {
      alert.criarAlerta({
        html: "Email inválido.",
        title: 'Opss...'
      })
      return;
    }

    alert.criarConfirmacao({
      title: "Aviso",
      html: "Deseja salvar o usuário?",
      confirmAction: () => {
        handleRequest();
      }
    })
  };

  const handleEquipeChange = async (value: any) => {
    if (equipe === value) return;
    setGrupo(null);
    grupos.splice(0, grupos.length);
    setEquipe(value);

    try {
      const response = await getGroupsByTeam(value);

      if (response && response.data) {
        response.data.map((item: any) => {
          grupos.push({ label: item.group_name, value: item.group_id });
        });
      }
    } catch (e) {
      alert.criarAlerta({
        icon: 'error',
        html: 'Ocorreu um erro ao carregar as equipes.',
        title: 'Erro'
      })    
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.usuarioForm}>
        <div className={Styles.titleCadastroUsuarios}>
          <h1>Cadastro de usuário</h1>
          <hr />
        </div>
        <form onSubmit={handleSubmit} className={Styles.formCadastroUsuarios}>
          <div className={Styles.inputGroup}>
            <div style={{ width: "50%" }}>
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e: any) => {
                  setNome(e.target.value);
                }}
                className={Styles.inputText}
                maxLength={60}
              />
            </div>
            <div style={{ width: "50% !important" }}>
              <label htmlFor="nome">Gênero</label>
              <SelectType
                width="550px"
                onChange={setGenero}
                options={generos}
              />
            </div>
          </div>
          <div className={Styles.inputGroup}>
            <div style={{ width: "1150px" }}>
              <label htmlFor="nome">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                style={{ width: "100%" }}
                className={Styles.inputText}
                maxLength={60}
              />
            </div>
          </div>
          <div className={Styles.inputGroup}>
            <div style={{ width: "50%" }}>
              <label htmlFor="nome">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e: any) => {
                  setSenha(e.target.value);
                }}
                className={Styles.inputText}
                maxLength={60}
              />
            </div>
            <div style={{ width: "50%" }}>
              <label htmlFor="nome">Confirmação de Senha</label>
              <input
                type="password"
                value={confirmacaoSenha}
                onChange={(e: any) => {
                  setConfirmacaoSenha(e.target.value);
                }}
                className={Styles.inputText}
                maxLength={60}
              />
            </div>
          </div>
          <div className={Styles.inputGroup}>
            <div style={{ width: "50% !important" }}>
              <label htmlFor="nome">Equipe</label>
              <SelectType
                width="550px"
                onChange={handleEquipeChange}
                options={equipes}
              />
            </div>
            <div
              style={
                equipe === "" || equipe == null
                  ? {
                      width: "50% !important",
                      marginLeft: "50px",
                      display: "none",
                    }
                  : { width: "50% !important", marginLeft: "50px" }
              }
            >
              <label htmlFor="nome">Grupo</label>
              <Select
                isSearchable={true}
                onChange={(e: any) => {
                  setGrupo(e);
                }}
                value={grupo}
                options={grupos}
                styles={selectStyles}
                placeholder={"Selecione..."}
              />
            </div>
          </div>
          <div className={Styles.buttonWrapper}>
            <input
              type="submit"
              value="Cadastrar"
              className={Styles.buttonEnviar}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const selectStyles = {
  menuList: (styles: any) => ({
    ...styles,
    background: "#333333",
    color: "#FFF",
  }),
  option: (styles: any) => ({
    ...styles,
    backgroundColor: "#333333",
    zIndex: 1,
  }),
  menu: (base: any) => ({
    ...base,
    marginLeft: "0",
    width: "550px",
    zIndex: 100,
  }),
  control: (styles: any) => ({
    ...styles,
    width: "550px",
    backgroundColor: "#333333",
    border: "none",
    borderRadius: "4px",
    boxShadow: "none",
    margin: "7px 0 17px 0",
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: "#FFF",
  }),
};

export default CadastroUsuarios;
