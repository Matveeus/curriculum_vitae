import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import routes from '../../constants/routes';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface LinkTabProps {
  route: string;
  label: string;
  value: string;
}

function LinkTab({ route, ...props }: LinkTabProps) {
  return <Tab sx={{ color: 'inherit' }} component={Link} to={route} {...props} />;
}

export default function AuthTabs() {
  const { pathname } = useLocation();

  return (
    <Box sx={{ width: 300, m: 'auto', mb: 0 }}>
      <Tabs sx={{ color: 'common.white' }} variant="fullWidth" value={pathname}>
        <LinkTab route={routes.login()} label="Login" value={routes.login()} />
        <LinkTab route={routes.register()} label="Signup" value={routes.register()} />
      </Tabs>
    </Box>
  );
}
