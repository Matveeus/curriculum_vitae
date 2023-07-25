import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';

export default function Private() {
  const user = useTypedSelector(state => state.auth.currentUser);
  return user ? <Outlet /> : <Navigate to="/login" />;
}
