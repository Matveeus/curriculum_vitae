import React from 'react';
import AuthForm from './AuthForm';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../../../apollo/auth';
import { AuthResult, MutationSignupArgs } from '../../../apollo/types';
import Loader from '../Loader';

export default function Login() {
  const [addUser, { loading, error }] = useMutation<{ signup: AuthResult }, MutationSignupArgs>(SIGN_UP);

  if (loading) {
    return <Loader />;
  }

  return <AuthForm operation={addUser} error={error} buttonTitle="login" title="Sign in" />;
}
