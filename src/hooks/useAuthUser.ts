import { useQuery, useMutation } from '@apollo/client';
import { SIGN_UP, LOGIN } from '../apollo/auth';
import { AuthResult, MutationSignupArgs, QueryLoginArgs } from '../apollo/types';
import { useNavigate } from 'react-router-dom';

export function useAuthUser(email: string, password: string) {
  const navigate = useNavigate();
  const [registerUser, { loading }] = useMutation<{ signup: AuthResult }, MutationSignupArgs>(SIGN_UP);
  const {
    loading: loginLoading,
    error: loginError,
    data: loginData,
  } = useQuery<{ login: AuthResult }, QueryLoginArgs>(LOGIN, {
    variables: {
      auth: {
        email: email,
        password: password,
      },
    },
  });

  const handleRegistration = async () => {
    try {
      const { data, errors } = await registerUser({
        variables: {
          auth: {
            email: email,
            password: password,
          },
        },
      });

      if (errors) {
        return { data: null, error: errors[0].message };
      }

      const token = data?.signup?.access_token;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/');
        return { loading };
      } else {
        return { error: 'Signup was successful, but no token received.' };
      }
    } catch (err) {
      return { data: null, error: 'Such user already exists' };
    }
  };

  const handleLogin = async () => {
    try {
      if (loginError) {
        return { data: null, error: loginError.message };
      }

      const token = loginData?.login?.access_token;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/');
        return { error: null, loading: loginLoading };
      } else {
        return { error: 'Login failed: No token received.' };
      }
    } catch (err) {
      return { data: null, error: 'Error during login.' };
    }
  };

  return { handleRegistration, handleLogin };
}
