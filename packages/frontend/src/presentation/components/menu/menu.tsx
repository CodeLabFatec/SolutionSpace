import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu
} from "react-pro-sidebar";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Styles from "./menuStyle.scss"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/main/contexts/authcontext";

const SideMenu = () => {
  const { collapseSidebar } = useProSidebar();
  const { user } = useContext(AuthContext)

  return (
    <div id="app" style={{ height: "100vh", display:"flex", position:"relative", left: "0" }}>
      <Sidebar
        style={{ height: "169vh",color: "#4FB4BC" , border:"none", textAlign: "left"}}
        backgroundColor="#333333"
        transitionDuration={1000}
        defaultCollapsed={true}
        collapsedWidth={"60px"}
        >
        <Menu transitionDuration={1000} closeOnClick={true} >
          <MenuItem
            onClick={() => {
                collapseSidebar();
            }}
            icon={<MenuOutlinedIcon />}
            style={ { padding:"10px" } }
            id={Styles.menuList}
            >
          </MenuItem>
          <MenuItem
            icon={<HomeIcon />}
            style={ { padding:"10px" } }
            id={Styles.menuList}
            component={<Link to="/home" />}
            >
              <p>Home</p>
          </MenuItem>
          <MenuItem
            icon={<BorderColorIcon />}
            style={ { padding:"10px" } }
            id={Styles.menuList}
            component={<Link to="/editStatus" />}
            >
              <p>Status</p>
          </MenuItem>
          {user.group.canRequestHotfix || user.group.canRequestFeatures || user.group.canRateAnalise || user.group.canRateAnalinhamento ? 
          (
            <SubMenu
              id={Styles.menuList}
              icon={<AddCircleIcon />}
              label="Chamados"
              style={{ color: "#4FB4BC", padding:"10px" }}
            >
              {user.group.canRequestHotfix ? (
                <MenuItem style={{ color: "#4FB4BC", backgroundColor: "#333333" }} component={<Link to="/newHotfix" />}>
                  Hotfix
                </MenuItem>
              ): <></>}
              {user.group.canRequestFeatures ? (
                <MenuItem style={{ color: "#4FB4BC", backgroundColor: "#333333" }} component={<Link to="/newFeature" />}>
                  Nova feature
                </MenuItem>
              ) : <></>}
              {user.group.canRequestHotfix || user.group.canRequestFeatures ? (
                <MenuItem style={{ color: "#4FB4BC", backgroundColor: "#333333" }} component={<Link to="/myRequests" />}>
                  Meus chamados
                </MenuItem>
              ) : <></>}
              {user.group.canRateAnalise || user.group.canRateAnalinhamento ? (
                <MenuItem style={{ color: "#4FB4BC", backgroundColor: "#333333" }} component={<Link to="/requests" />}>
                  Avaliar chamados
                </MenuItem>
              ) : <></>}
            </SubMenu>
          ) : <></>}
          {user.team.permissionCreateUsers ? (
            <SubMenu
              id={Styles.menuList}
              icon={<PersonAddAltRoundedIcon />}
              label="Usuários"
              style={{ color: "#4FB4BC", padding:"10px" }}
            >
              <MenuItem style={{ color: "#4FB4BC", backgroundColor: "#333333" }} component={<Link to="/newUser" />}>
                Cadastrar
              </MenuItem>
              <MenuItem style={{ color: "#4FB4BC", backgroundColor: "#333333" }} component={<Link to="/users" />}>
                Usuários cadastrados
              </MenuItem>
            </SubMenu>
          ) : <></>}
          {user.team.permissionCreateTeams ? (
            <SubMenu
              id={Styles.menuList}
              icon={<GroupAddIcon />}
              label="Equipes"
              style={{ color: "#4FB4BC", padding:"10px" }}
            >
              <MenuItem style={{ color: "#4FB4BC", backgroundColor: "#333333" }} component={<Link to="/newTeam" />}>
                Cadastrar
              </MenuItem>
              <MenuItem style={{ color: "#4FB4BC", backgroundColor: "#333333" }} component={<Link to="/teams" />}>
                Equipes cadastradas
              </MenuItem>
            </SubMenu>
          ) : <></>}
          {user.team.permissionCreateGroups ? (
            <SubMenu
              icon={<GroupsIcon />}
              label="Grupos"
              style={{ color: "#4FB4BC", padding:"10px" }}
              id={Styles.menuList}
            >
              <MenuItem style={{ color: "#4FB4BC", backgroundColor: "#333333" }} component={<Link to="/newGroup" />}>
                Cadastrar
              </MenuItem>
              <MenuItem style={{ color: "#4FB4BC", backgroundColor: "#333333" }} component={<Link to="/groups" />}>
                Grupos cadastrados
              </MenuItem>
            </SubMenu>
          ) : <></>}
        </Menu>
      </Sidebar>
        <main>
        </main>
    </div>
  );
};

export default SideMenu;
