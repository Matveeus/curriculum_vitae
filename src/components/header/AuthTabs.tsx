import React from 'react';
import { useLocation } from 'react-router-dom';
import routes from '../../constants/routes';
import Tabs from '@mui/material/Tabs';
import LinkTab from '../LinkTab';

export default function AuthTabs() {
  const { pathname } = useLocation();

  return (
    <Tabs sx={{ m: 'auto', mb: 0, color: 'common.white' }} value={pathname}>
      <LinkTab route={routes.login()} label="Login" value={routes.login()} />
      <LinkTab route={routes.register()} label="Signup" value={routes.register()} />
    </Tabs>
  );
}
