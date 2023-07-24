import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { logOut } from '../../store/authSlice';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const openMenu = () => setIsOpen(true);

  const closeMenu = () => setIsOpen(false);

  const handleLogOut = () => {
    navigate('/login');
    dispatch(logOut());
  };

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

        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
