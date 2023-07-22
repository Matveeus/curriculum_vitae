import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openMenu = () => setIsOpen(true);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <IconButton color="primary" onClick={openMenu}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={closeMenu}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            minWidth: 225,
            height: 65,
            px: 3,
            bgcolor: '#2e2e2e',
          }}
        >
          <IconButton color="primary" onClick={closeMenu}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Drawer>
    </>
  );
}
