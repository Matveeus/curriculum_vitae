import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import routes from '../constants/routes';
import AuthForm from '../components/auth/AuthForm';

export default function Register() {
  const user = useTypedSelector(state => state.auth.currentUser);
  return user ? <Navigate to={routes.employees()} /> : <AuthForm buttonTitle="register" title="Registration" />;
}
