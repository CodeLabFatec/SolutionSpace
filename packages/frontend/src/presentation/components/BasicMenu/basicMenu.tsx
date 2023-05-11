import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Styles from './basicMenuStyles.scss'

const BasicMenu: React.FC<{ children: any[], anchorEl: null, handleClose: () => void, open: boolean, MenuItems: any[] }> = (props) => {
    return (
        <Menu
            id="basic-menu"
            anchorEl={props.anchorEl}
            open={props.open}
            onClose={props.handleClose}
        >
            <div
                className={Styles.menuItem}
            >
                {props.MenuItems.map((item: any) => (
                    <div key={item.id} className={Styles.menuItem}>
                        <MenuItem
                            className={Styles.menu}
                            onClick={props.handleClose}
                            key={item.id}
                        >
                            {item.title}
                            {item.created_At}
                            {item.message}
                        </MenuItem>

                    </div>
                ))}

            </div>

        </Menu>

    )
}

export default BasicMenu