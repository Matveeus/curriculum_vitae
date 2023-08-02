import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AuthTabs from './AuthTabs';
import SideMenu from './SideMenu';
import UserMenu from './UserMenu';

export default function Header() {
  const user = useTypedSelector(state => state.auth.currentUser!);

  return (
    <AppBar sx={{ minHeight: 65, bgcolor: '#2e2e2e' }} position="sticky">
      <Container maxWidth="xl">
        <Toolbar>
          {user ? (
            <>
              <SideMenu />
              <Typography sx={{ mr: 1, ml: 'auto', color: 'inherit' }}>
                {user.profile.full_name || user.email}
              </Typography>
              <UserMenu user={user} />
            </>
          ) : (
            <AuthTabs />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
