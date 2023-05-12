import { Logo } from "@/presentation/components";
import Styles from "./header-styles.scss";

import React, { useContext } from "react";
import { AuthContext } from "@/main/contexts/authcontext";
import { useAlert } from "@/main/services";
import { ProSidebarProvider } from "react-pro-sidebar";
import NotificationBell from "../NotificationBell/notificationBell";

const Header: React.FC = () => {
  const { logout, user } = useContext(AuthContext);
  const alert = useAlert();
  const notifications = user.notifications ? user.notifications.filter((item: any) => !item.hasRead) : [];

  const handleLogout = (e: any) => {
    e.preventDefault();

    alert.criarConfirmacao({
      title: "Aviso",
      html: "Deseja sair?",
      confirmAction: () => {
        logout();
      },
    });
  };

  return (
    <ProSidebarProvider>
      <div className={Styles.nav}>
        <div className={Styles.logo}>
          <Logo></Logo>
        </div>
        <div className={Styles.userConnected}>
          <p>Bem vindo, {user.name} </p>
          <hr />
        </div>
        <div className={Styles.notification}>
          <NotificationBell notifications={notifications} />
        </div>
        <div className={Styles.logout}>
          <i
            onClick={handleLogout}
            id={Styles.logout}
            className="material-icons"
          >
            exit_to_app
          </i>
        </div>
      </div>
    </ProSidebarProvider>
  );
};

export default Header;
