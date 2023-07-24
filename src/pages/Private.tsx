import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function Private() {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" />;
}
