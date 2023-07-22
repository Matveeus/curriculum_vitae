import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const openMenu = () => setIsOpen(true);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <IconButton sx={{ ml: 'auto' }} ref={buttonRef} onClick={openMenu}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>A</Avatar>
      </IconButton>
      <Menu
        MenuListProps={{ sx: { minWidth: 200 } }}
        anchorEl={buttonRef.current}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        open={isOpen}
        onClick={closeMenu}
        onClose={closeMenu}
      >
        <MenuItem component={Link} to="/profile">
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <Typography>Profile</Typography>
        </MenuItem>

        <Divider />

        <MenuItem>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
