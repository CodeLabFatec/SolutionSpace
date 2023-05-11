import { Badge } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip'

import React, { useState } from 'react'
import BasicMenu from "../BasicMenu/basicMenu";
 
const NotificationBell: React.FC<{ notifications: any[] }> = (props) => {
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const newNotification = "teste"
    const noNotification = 'no new'

    const handleOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
        setOpen(true)
    };
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title={props.notifications.length ? newNotification : noNotification}>
                <IconButton onClick={handleOpen} >
                    <Badge badgeContent={props.notifications.length} color="error">
                        <NotificationsIcon />
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