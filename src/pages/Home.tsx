import React from 'react';
import { Navigate } from 'react-router-dom';
import routes from '../constants/routes';

export default function Home() {
  return <Navigate to={routes.login()} />;
}
