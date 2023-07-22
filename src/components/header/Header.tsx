import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AuthTabs from './AuthTabs';
import SideMenu from './SideMenu';
import UserMenu from './UserMenu';

export default function Header() {
  const user = useTypedSelector(state => state.auth.currentUser);

  return (
    <AppBar sx={{ minHeight: 65, bgcolor: '#2e2e2e' }} position="sticky">
      <Container maxWidth="xl">
        <Toolbar>
          {user ? (
            <>
              <SideMenu />
              <UserMenu />
            </>
          ) : (
            <AuthTabs />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
