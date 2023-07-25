import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import routes from '../constants/routes';

export default function Private() {
  const user = useTypedSelector(state => state.auth.currentUser);
  return user ? <Outlet /> : <Navigate to={routes.login()} />;
}
