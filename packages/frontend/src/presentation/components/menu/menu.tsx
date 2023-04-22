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
import HomeIcon from '@mui/icons-material/Home';
import Styles from "./menuStyle.scss"
import { Link } from "react-router-dom";

const SideMenu = () => {
  const { collapseSidebar } = useProSidebar();

  return (
    <div id="app" style={{ height: "100vh", display:"flex", position:"relative", left: "0" }}>
      <Sidebar
        style={{ height: "108vh",color: "#4FB4BC" , border:"none", textAlign: "left"}}
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
            style={{padding:"10px"}}
            id={Styles.menuList}
            >
          </MenuItem>
          <MenuItem
            icon={<HomeIcon />}
            style={{padding:"10px"}}
            id={Styles.menuList}
            component={<Link to="/home" />}
            >
              <p>Home</p>
          </MenuItem>
          <SubMenu
            id={Styles.menuList}
            icon={<AddCircleIcon />}
            label="Chamados"
            style={{ color: "#4FB4BC", padding:"10px" }}
          >
            <MenuItem style={{ color: "#4FB4BC", backgroundColor: "#333333" }} component={<Link to="/newHotfix" />}>
              Hotfix
            </MenuItem>
            <MenuItem style={{ color: "#4FB4BC", backgroundColor: "#333333" }} component={<Link to="/newFeature" />}>
              Nova feature
            </MenuItem>
            <MenuItem style={{ color: "#4FB4BC", backgroundColor: "#333333" }} component={<Link to="/myRequests" />}>
              Meus chamados
            </MenuItem>
          </SubMenu>
          <SubMenu
            icon={<PersonAddAltRoundedIcon />}
            label="Cadastros"
            style={{ color: "#4FB4BC", padding:"10px" }}
            id={Styles.menuList}
          >
            <MenuItem style={{ color: "#4FB4BC", backgroundColor: "#333333" }} component={<Link to="/newTeam" />}>
              Equipe
            </MenuItem>
            <MenuItem style={{ color: "#4FB4BC", backgroundColor: "#333333" }} component={<Link to="/groups" />}>
              Grupo
            </MenuItem>
            <MenuItem style={{ color: "#4FB4BC", backgroundColor: "#333333" }} component={<Link to="/newUser" />}>
              Usuário
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
        <main>
        </main>
    </div>
  );
};

export default SideMenu;
