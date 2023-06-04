import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import HomeIcon from "@mui/icons-material/Home";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import Styles from "./menuStyle.scss";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "@/main/contexts/authcontext";

const SideMenu = () => {
  const { collapseSidebar } = useProSidebar();
  const { user } = useContext(AuthContext);
  const [aberto, setAberto] = useState<boolean>(false);
  

  function handleMenu() {
    if (aberto) {
      collapseSidebar();
      setAberto(!aberto);
    }
  }

  return (
    <div
      id="app"
      style={{
        height: "90vh",
        display: "flex",
        position: "relative",
        left: "0",
      }}
    >
      <Sidebar
        style={{
          height: "90vh",
          color: "#4FB4BC",
          border: "none",
          textAlign: "left",
        }}
        backgroundColor="#333333"
        transitionDuration={1000}
        defaultCollapsed={true}
        collapsedWidth={"60px"}
      >
        <Menu transitionDuration={1000} closeOnClick={true}>
          <MenuItem
            onClick={() => {
              collapseSidebar();
              setAberto(!aberto);
            }}
            icon={<MenuOutlinedIcon />}
            style={{ padding: "10px" }}
            id={Styles.menuList}
          ></MenuItem>
          <MenuItem
            onClick={() => {
              handleMenu();
            }}
            icon={<HomeIcon />}
            style={{ padding: "10px" }}
            id={Styles.menuList}
            component={<Link to="/home" />}
          >
            <p>Home</p>
          </MenuItem>

          {user.group.canRequestHotfix ||
          user.group.canRequestFeatures ||
          user.group.canRateAnalise ||
          user.group.canRateAnalinhamento ? (
            <SubMenu
              id={Styles.menuList}
              icon={<AddCircleIcon />}
              label="Chamados"
              style={{ color: "#4FB4BC", padding: "10px" }}
            >
              {user.group.canRequestHotfix ? (
                <MenuItem
                  onClick={() => {
                    handleMenu();
                  }}
                  style={{ color: "#4FB4BC", backgroundColor: "#333333" }}
                  component={<Link to="/newHotfix" />}
                >
                  Hotfix
                </MenuItem>
              ) : (
                <></>
              )}
              {user.group.canRequestFeatures ? (
                <MenuItem
                  onClick={() => {
                    handleMenu();
                  }}
                  style={{ color: "#4FB4BC", backgroundColor: "#333333" }}
                  component={<Link to="/newFeature" />}
                >
                  Nova feature
                </MenuItem>
              ) : (
                <></>
              )}
              {user.group.canRequestHotfix || user.group.canRequestFeatures ? (
                <MenuItem
                  onClick={() => {
                    handleMenu();
                  }}
                  style={{ color: "#4FB4BC", backgroundColor: "#333333" }}
                  component={<Link to="/myRequests" />}
                >
                  Meus chamados
                </MenuItem>
              ) : (
                <></>
              )}
              {user.group.canRateAnalise || user.group.canRateAnalinhamento ? (
                <MenuItem
                  onClick={() => {
                    handleMenu();
                  }}
                  style={{ color: "#4FB4BC", backgroundColor: "#333333" }}
                  component={<Link to="/requests" />}
                >
                  Avaliar chamados
                </MenuItem>
              ) : (
                <></>
              )}
              {user.team.permissionUnarchiveRequests ? (
                <MenuItem
                  onClick={() =>{
                    handleMenu();

                  }}
                  style={{color:"#4FB4BC", backgroundColor: "#333333" }}
                  component={<Link to="/archiveRequests"/>}
                >
                  Arquivados
                </MenuItem>
              ) : (
                <></>
              )} 
              
               
            </SubMenu>
          ) : (
            <></>
          )}
          {user.team.permissionConfigureStatus ? (
            <SubMenu
              id={Styles.menuList}
              icon={<BorderColorIcon />}
              label="Personalizar status"
              style={{ color: "#4FB4BC", padding: "10px" }}
            >
              <MenuItem
                onClick={() => {
                  handleMenu();
                }}
                style={{ color: "#4FB4BC", backgroundColor: "#333333" }}
                component={<Link to="/StatusAnalise" />}
              >
                Status de risco
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenu();
                }}
                style={{ color: "#4FB4BC", backgroundColor: "#333333" }}
                component={<Link to="/StatusAlinhamento" />}
              >
                Status de alinhamento
              </MenuItem>
            </SubMenu>
          ) : (
            <></>
          )}
          {user.team.permissionCreateUsers ? (
            <SubMenu
              id={Styles.menuList}
              icon={<PersonAddAltRoundedIcon />}
              label="Usuários"
              style={{ color: "#4FB4BC", padding: "10px" }}
            >
              <MenuItem
                onClick={() => {
                  handleMenu();
                }}
                style={{ color: "#4FB4BC", backgroundColor: "#333333" }}
                component={<Link to="/newUser" />}
              >
                Cadastrar
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenu();
                }}
                style={{ color: "#4FB4BC", backgroundColor: "#333333" }}
                component={<Link to="/users" />}
              >
                Usuários cadastrados
              </MenuItem>
            </SubMenu>
          ) : (
            <></>
          )}
          {user.team.permissionCreateTeams ? (
            <SubMenu
              id={Styles.menuList}
              icon={<GroupAddIcon />}
              label="Equipes"
              style={{ color: "#4FB4BC", padding: "10px" }}
            >
              <MenuItem
                onClick={() => {
                  handleMenu();
                }}
                style={{ color: "#4FB4BC", backgroundColor: "#333333" }}
                component={<Link to="/newTeam" />}
              >
                Cadastrar
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenu();
                }}
                style={{ color: "#4FB4BC", backgroundColor: "#333333" }}
                component={<Link to="/teams" />}
              >
                Equipes cadastradas
              </MenuItem>
            </SubMenu>
          ) : (
            <></>
          )}
          {user.team.permissionCreateGroups ? (
            <SubMenu
              icon={<GroupsIcon />}
              label="Grupos"
              style={{ color: "#4FB4BC", padding: "10px" }}
              id={Styles.menuList}
            >
              <MenuItem
                onClick={() => {
                  handleMenu();
                }}
                style={{ color: "#4FB4BC", backgroundColor: "#333333" }}
                component={<Link to="/newGroup" />}
              >
                Cadastrar
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenu();
                }}
                style={{ color: "#4FB4BC", backgroundColor: "#333333" }}
                component={<Link to="/groups" />}
              >
                Grupos cadastrados
              </MenuItem>
            </SubMenu>
          ) : (
            <></>
          )}

          <MenuItem
            onClick={() => {
              handleMenu();
            }}
            icon={<ViewKanbanIcon />}
            style={{ padding: "10px" }}
            id={Styles.menuList}
            component={<Link to="/kanban" />}
          >
            <p>Kanban</p>
          </MenuItem>
        </Menu>
      </Sidebar>
      <main></main>
    </div>
  );
};

export default SideMenu;
