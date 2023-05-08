import { Logo } from '@/presentation/components'
import Styles from './header-styles.scss'

import React, { useContext, useState } from 'react'
import { AuthContext } from '@/main/contexts/authcontext'
import { useAlert } from '@/main/services'
import { Avatar, Badge, Divider, ListItemIcon, Menu } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { MenuItem, ProSidebarProvider } from 'react-pro-sidebar'
import { MdPersonAdd, MdSettings } from 'react-icons/md'

const Header: React.FC = () => {
  const { logout, user } = useContext(AuthContext)
  const alert = useAlert()
  const notifications = user.notifications.filter((item: any) => !item.hasRead)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  let open = false;

  const handleLogout = (e: any) => {
    e.preventDefault()
 
    alert.criarConfirmacao({
      title: "Aviso",
      html: 'Deseja sair?',
      confirmAction: () => {
        logout();
      }
    })
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    open = true;
  };
  const handleClose = () => {
    setAnchorEl(null);
    open = false;
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
        <div
          onClick={handleClick}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}>
          <Badge  
            className={Styles.notification} badgeContent={notifications.length} color="primary">
            <NotificationsIcon />
          </Badge>
        </div>
        <div className={Styles.logout}>
          <i onClick={handleLogout} id={Styles.logout} className="material-icons">exit_to_app</i>
        </div>
      </div>
      <Menu           
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
      <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <MdPersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <MdSettings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </ProSidebarProvider>
  )
}

export default Header
