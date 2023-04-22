import { MakeChamados, MakeLogin } from "@/main/factories/pages";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { HomeSolicitantes } from "@/presentation/pages";
import { AuthProvider, AuthContext } from "../contexts/authcontext";
import { MakeFormularioChamados } from "../factories/pages/formularioChamados-factory";
import { TipoChamado } from "../enums/tipo-chamado";
import { VisualizarChamado } from "../enums/visualizar-chamado";
import AlinhamentoEstrategico from "@/presentation/pages/alinhamentoEstrategico/alinhamentoEstrategico";
import AnaliseRisco from "@/presentation/pages/analiseRisco/analiseRisco";
import SideMenu from "@/presentation/components/menu/menu";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Header } from "@/presentation/components";
import { MakeCadastroUsuarios } from '../factories/pages/cadastro-usuarios'
import { MakeListagemUsuarios } from '../factories/pages/listagem-usuarios'
import { MakeEdicaoUsuario } from '../factories/pages/edicao-usuarios'
import CadastroEquipe from "@/presentation/pages/equipe//cadastro/cadastroEquipe";

const Router: React.FC = () => {
  const Private = ({ children }: any) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div className="loading">Carregando...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const Login = () => {
    const { authenticated } = useContext(AuthContext);

    if (!authenticated) {
      return <MakeLogin />;
    }

    return <Navigate to="/home" />;
  };

  const Menu = () => {
    const { authenticated } = useContext(AuthContext);

    if (!authenticated) {
      return <></>;
    }

    return (
      <div>
        <Header />
        <ProSidebarProvider>
          <SideMenu></SideMenu>
        </ProSidebarProvider>
      </div>
    );
  };

  const Origin = ({ children }: any) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div className="loading">Carregando...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    // Verificar o team do user para redirecioná-lo à página correta.
    return children;
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Menu />
        <Routes>
          <Route
            index
            element={
              <Origin>
                <Navigate to="/home" />
              </Origin>
            }
          />
          <Route
            path="*"
            element={
              <Origin>
                <Navigate to="/home" />
              </Origin>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <Private>
                <HomeSolicitantes />
              </Private>
            }
          />
          <Route
            path="/newFeature"
            element={
              <>
                <Private>
                  <MakeFormularioChamados tipoChamado={TipoChamado.FEATURE} />
                </Private>
              </>
            }
          />
          <Route
            path="/newHotfix"
            element={
              <Private>
                <MakeFormularioChamados tipoChamado={TipoChamado.HOTFIX} />
              </Private>
            }
          />
          <Route
            path="/myRequests"
            element={
              <Private>
                <MakeChamados
                  visualizacaoChamados={VisualizarChamado.MEUS_CHAMADOS}
                />
              </Private>
            }
          />
          <Route
            path="/requests"
            element={
              <Private>
                <MakeChamados
                  visualizacaoChamados={VisualizarChamado.TODOS_CHAMADOS}
                />
              </Private>
            }
          />
          <Route
            path="/strategicAlignment"
            element={
              <Private>
                <AlinhamentoEstrategico />
              </Private>
            }
          />
          <Route
            path="/riskAnalysis"
            element={
              <Private>
                <AnaliseRisco />
              </Private>
            }
          />
          <Route
            path='/newUser'
            element={
              <Private>
                <MakeCadastroUsuarios />
              </Private>
            }
          />
          <Route
            path='/newTeam'
            element={
              <Private>
                <CadastroEquipe />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
