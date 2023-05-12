import React, { useContext, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Styles from "./basicMenuStyles.scss";
import moment from "moment";
import { AuthContext } from "@/main/contexts/authcontext";
import { readAllNotifications } from "@/main/api/api";
import { useAlert } from "@/main/services";

const BasicMenu: React.FC<{
  children: any[];
  anchorEl: null;
  handleClose: () => void;
  open: boolean;
  MenuItems: any[];
}> = (props) => {

  const { user, updateUser } = useContext(AuthContext);
  const alert = useAlert()

  const handleRequest = async () => {
    try {

      const response = await readAllNotifications(user.user_id)

      updateUser(response.data)

      props.handleClose()

    } catch (e) {
      alert.criarAlerta({
        icon: 'error',
        html: 'Erro ao ler as notificações.'
      })
    }
  }

  const handleRead = () => {
    if (props.MenuItems.length > 0) {
      handleRequest()
    }
  }

  return (

      <Menu
        id="basic-menu"
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={props.handleClose}
        PaperProps={{
          style: {
            backgroundColor: '#333333',
            maxHeight: 300,
          },
          className: Styles.scroll
        }}
      >
        <MenuItem
          onClick={handleRead}
          sx={{
            display: 'flex',
            justifyContent: "flex-end",
            fontSize: 12,
          }}>
          <button className={Styles.button}>Marcar notificações como lida</button>
        </MenuItem>
        <div className={Styles.hover}>
          {props.MenuItems.map((item: any) => (
            <MenuItem
              onClick={props.handleClose}
              key={item.notification_id}
              divider={true}
              sx={{
                display: "block",
                wordBreak: "break-word",
                maxWidth: 600,
                backgroundColor: "#333333",
                textAlign: "start",
                fontSize: 12,
                whiteSpace: "normal",
                color: "#CCCCCC",
                cursor: "default",
              }}
            >
              <p style={{ color: "#4fb4bc" }}>{item.title} - {moment(item.created_at).format('DD/MM/YYYY HH:mm')}</p>
              <p>{item.message}</p>
            </MenuItem>
          ))}
        </div>
      </Menu>
  );
};

export default BasicMenu;
