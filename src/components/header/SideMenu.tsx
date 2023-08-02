import React, { useState } from 'react';
import routes from '../../constants/routes';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import PeopleIcon from '@mui/icons-material/People';
import FolderIcon from '@mui/icons-material/FolderCopyOutlined';
import ContactIcon from '@mui/icons-material/ContactPageOutlined';
import DomainIcon from '@mui/icons-material/Domain';
import WorkIcon from '@mui/icons-material/WorkOutline';
import MovingIcon from '@mui/icons-material/Moving';
import TranslateIcon from '@mui/icons-material/Translate';
import MenuList from './MenuList';

const menuLinks = {
  primary: [
    { icon: <PeopleIcon />, text: 'Employees', route: routes.employees() },
    { icon: <FolderIcon />, text: 'Projects', route: routes.projects() },
    { icon: <ContactIcon />, text: 'CVs', route: routes.cvs() },
  ],
  secondary: [
    { icon: <DomainIcon />, text: 'Departments', route: routes.departments() },
    { icon: <WorkIcon />, text: 'Positions', route: routes.positions() },
    { icon: <MovingIcon />, text: 'Skills', route: routes.skills() },
    { icon: <TranslateIcon />, text: 'Languages', route: routes.languages() },
  ],
};

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
            minWidth: 250,
            height: 65,
            mb: 1,
            px: 3,
            bgcolor: '#2e2e2e',
          }}
        >
          <IconButton color="primary" onClick={closeMenu}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box onClick={closeMenu}>
          <MenuList items={menuLinks.primary} />
          <Divider />
          <MenuList items={menuLinks.secondary} />
        </Box>
      </Drawer>
    </>
  );
}
