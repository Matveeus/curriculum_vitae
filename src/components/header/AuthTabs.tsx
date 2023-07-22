import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
        <LinkTab route="/login" label="Login" value="/login" />
        <LinkTab route="/register" label="Signup" value="/register" />
      </Tabs>
    </Box>
  );
}
