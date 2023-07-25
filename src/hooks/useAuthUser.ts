import { useQuery, useMutation } from '@apollo/client';
import { SIGN_UP, LOGIN } from '../apollo/auth';
import { AuthResult, MutationSignupArgs, QueryLoginArgs } from '../apollo/types';
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch } from './useTypedDispatch';
import { setCurrentUser } from '../store/authSlice';

export function useAuthUser(email: string, password: string) {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [registerUser] = useMutation<{ signup: AuthResult }, MutationSignupArgs>(SIGN_UP);
  const { error: loginError, data: loginData } = useQuery<{ login: AuthResult }, QueryLoginArgs>(LOGIN, {
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
      const user = data?.signup?.user;
      if (token && user) {
        dispatch(setCurrentUser(user));
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
        return { error: null };
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
      const user = loginData?.login?.user;
      if (token && user) {
        dispatch(setCurrentUser(user));
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
        return { error: null };
      } else {
        return { error: 'Login failed: No token received.' };
      }
    } catch (err) {
      return { data: null, error: 'Error during login.' };
    }
  };

  return { handleRegistration, handleLogin };
}
