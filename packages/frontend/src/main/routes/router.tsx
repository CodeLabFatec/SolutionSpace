import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthProvider, AuthContext } from "../contexts/authcontext";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Header, SideMenu } from "@/presentation/components";
import {
  AlinhamentoEstrategico,
  AnaliseRisco,
  CadastroEquipe,
  CadastroGrupo,
  CadastroUsuarios,
  Chamados,
  EdicaoEquipe,
  EdicaoGrupo,
  EdicaoUsuarios,
  FormularioChamados,
  Home,
  ListagemEquipe,
  ListagemGrupos,
  ListagemUsuarios,
  Login,
  PersonalizacaoAnalise,
  HistoricoAvaliacao
} from "@/presentation/pages";
import { TipoChamado, VisualizarChamado } from "../enums";
import PersonalizacaoAlinhamento from "@/presentation/pages/personalizacaoStatus/alinhamentoEstrategico/personalizacaoAlinhamento";

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

  const CheckLogin = () => {
    const { authenticated } = useContext(AuthContext);

    if (!authenticated) {
      return <Login />;
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
          <Route path="/login" element={<CheckLogin />} />
          <Route
            path="/home"
            element={
              <Private>
                <Home />
              </Private>
            }
          />
          <Route
            path="/newFeature"
            element={
              <Private>
                <FormularioChamados tipoChamado={TipoChamado.FEATURE} />
              </Private>
            }
          />
          <Route
            path="/newHotfix"
            element={
              <Private>
                <FormularioChamados tipoChamado={TipoChamado.HOTFIX} />
              </Private>
            }
          />
          <Route
            path="/myRequests"
            element={
              <Private>
                <Chamados
                  visualizacaoChamado={VisualizarChamado.MEUS_CHAMADOS}
                />
              </Private>
            }
          />
          <Route
            path="/requests"
            element={
              <Private>
                <Chamados
                  visualizacaoChamado={VisualizarChamado.TODOS_CHAMADOS}
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
            path="/newUser"
            element={
              <Private>
                <CadastroUsuarios />
              </Private>
            }
          />
          <Route
            path="/newGroup"
            element={
              <Private>
                <CadastroGrupo />
              </Private>
            }
          />
          <Route
            path="/users"
            element={
              <Private>
                <ListagemUsuarios />
              </Private>
            }
          />
          <Route
            path="/editUser"
            element={
              <Private>
                <EdicaoUsuarios />
              </Private>
            }
          />
          <Route
            path="/newTeam"
            element={
              <Private>
                <CadastroEquipe />
              </Private>
            }
          />
          <Route
            path="/teams"
            element={
              <Private>
                <ListagemEquipe />
              </Private>
            }
          />
          <Route
            path="/editTeam"
            element={
              <Private>
                <EdicaoEquipe />
              </Private>
            }
          />
          <Route
            path="/groups"
            element={
              <Private>
                <ListagemGrupos />
              </Private>
            }
          />
          <Route
            path="/editGroup"
            element={
              <Private>
                <EdicaoGrupo />
              </Private>
            }
          />
          <Route 
            path='/history'
            element={
              <Private>
                <HistoricoAvaliacao />
              </Private>
            }
          />
          <Route
            path="/StatusAlinhamento"
            element={
              <Private>
                <PersonalizacaoAlinhamento />
              </Private>
            }
          />
          <Route
            path="/StatusAnalise"
            element={
              <Private>
                <PersonalizacaoAnalise />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
