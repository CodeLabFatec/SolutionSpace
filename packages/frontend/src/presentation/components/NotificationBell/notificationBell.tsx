import { Badge } from "@mui/material";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip'
import { grey } from '@mui/material/colors';



import React, { useState } from 'react'
import BasicMenu from "../BasicMenu/basicMenu";

const NotificationBell: React.FC<{ notifications: any[]}> = (props) => {
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    
    const newNotification = `Você possui ${props.notifications.length > 1 ? `${props.notifications.length} novas notificações`: `${props.notifications.length} nova notificação`}` 
    const noNotification = 'Sem notificações'



    const handleOpen = (event: any) => {
        if (props.notifications.length > 0){
            setAnchorEl(event.currentTarget);
            setOpen(true)
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title={props.notifications.length ? newNotification : noNotification}>
                <IconButton onClick={handleOpen} sx={{ color: grey[500] }} >
                    <Badge badgeContent={props.notifications.length} color="error" >
                        <NotificationsNoneOutlinedIcon color="inherit"/>
                    </Badge>
                </IconButton>
            </Tooltip>
            <BasicMenu
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                MenuItems={props.notifications}
            >   

            </BasicMenu>
        </div>
    )
}

export default NotificationBell; 