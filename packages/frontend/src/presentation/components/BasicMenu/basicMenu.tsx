import React, { useContext } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Styles from "./basicMenuStyles.scss";
import moment from "moment";
import { AuthContext } from "@/main/contexts/authcontext";
import { readAllNotifications } from "@/main/api/api";

const BasicMenu: React.FC<{
  children: any[];
  anchorEl: null;
  handleClose: () => void;
  open: boolean;
  MenuItems: any[];
}> = (props) => {
  
  const { user } = useContext(AuthContext);

  const handleRead = () => {
      if (props.MenuItems.length > 0){
        readAllNotifications(user.user_id)
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
         backgroundColor: '#333333'
        }
       }}
      >
      <MenuItem
        onClick={handleRead}
        sx={{
            display:'flex',
            justifyContent: "flex-end",
            fontSize: 12,
        }}>
        <button className={Styles.button}>Marcar notificações como lida</button>
      </MenuItem>
      {props.MenuItems.map((item: any) => (
          <MenuItem
          onClick={props.handleClose}
          key={item.id}
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
            cursor: "default"
          }}
        >
          <p style={{color:"#4fb4bc"}}>{item.title} - {moment(item.created_at).format('DD/MM/YYYY HH:mm')}</p>
          <p>{item.message}</p>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default BasicMenu;
