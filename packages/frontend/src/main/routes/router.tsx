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
  HistoricoAvaliacao,
  VisualizarEquipe,
  VisualizarGrupo,
  VisualizarUsuario,
  PersonalizacaoAlinhamento,
  KanbanPage,
  
} from "@/presentation/pages";
import { TipoChamado, VisualizarChamado } from "../enums";
import { BlockProvider } from "../contexts/blockcontext";
import EdicaoChamados from "@/presentation/pages/chamados/edicao/edicaochamado";

const Router: React.FC = () => {


  const Private = ({ children }: any) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <></>;
    }

    if (authenticated) {
      return children;
    }

    return <Navigate to="/login" />;
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

  return (
    <BrowserRouter>
      <AuthProvider>
        <BlockProvider>
          <Menu />
          <Routes>
            <Route
              index
              element={
                <Private>
                  <Navigate to="/home" />
                </Private>
              }
            />
            <Route
              path="*"
              element={
                <Private>
                  <Navigate to="/home" />
                </Private>
              }
            />
            <Route path="/login" element={<Login />} />
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
              path="/archiveRequests"
              element={
                <Private>
                  <Chamados
                    visualizacaoChamado={VisualizarChamado.CHAMADOS_ARQUIVADOS}
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
            <Route
              path="/visualizarEquipe"
              element={
                <Private>
                  <VisualizarEquipe />
                </Private>
              }
            />
            <Route
              path="/visualizarGrupo"
              element={
                <Private>
                  <VisualizarGrupo />
                </Private>
              }
            />
            <Route
              path="/visualizarUsuario"
              element={
                <Private>
                  <VisualizarUsuario />
                </Private>
              }
            />
            <Route
              path="/kanban"
              element={
                <Private>
                  <KanbanPage />
                </Private>
              }
            />
            <Route
              path="/editRequest"
              element={
                <Private>
                  <Home
                  />
                </Private>
              }
            />
          </Routes>
        </BlockProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
