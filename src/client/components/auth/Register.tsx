import React from 'react';
import AuthForm from './AuthForm';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../../../apollo/auth';
import { MutationSignupArgs, AuthResult } from '../../../apollo/types';
import Loader from '../Loader';

export default function Register() {
  const [registerUser, { loading, error }] = useMutation<{ signup: AuthResult }, MutationSignupArgs>(SIGN_UP);

  if (loading) {
    return <Loader />;
  }

  return <AuthForm operation={registerUser} error={error} buttonTitle="register" title="Registration" />;
}
