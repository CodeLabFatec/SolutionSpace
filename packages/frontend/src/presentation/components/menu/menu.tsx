import { TipoChamado } from "@/main/enums/tipo-chamado";
import { FormularioChamados } from "@/presentation/pages";
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from "react-pro-sidebar";

const SideMenu = () => {
    const { collapseSidebar } = useProSidebar();

    return (
        <div id="app" style={({ height: "100vh", display: "flex" })}>
            <Sidebar style={{ height: "100vh" }}>
                <Menu>
                    <MenuItem
                        // icon={<MenuOutlinedIcon />}
                        onClick={() => {
                            collapseSidebar();
                        }}
                        style={{ textAlign: "center" }}
                    >
                        <h2>Admin</h2>
                    </MenuItem>
                    <MenuItem>Team</MenuItem>
                    <SubMenu label="Home">
                        <MenuItem>Item 1</MenuItem>
                        <MenuItem>Item 2</MenuItem>
                        <MenuItem>Item 3</MenuItem>
                    </SubMenu>
                    <MenuItem>Contacts</MenuItem>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                    <MenuItem>Calendar</MenuItem>
                </Menu>
            </Sidebar>
            <main>
                <FormularioChamados tipoChamado={TipoChamado.FEATURE}></FormularioChamados>
            </main>
        </div>
    );
}

export default SideMenu;