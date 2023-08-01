import { useLazyQuery, useMutation } from '@apollo/client';
import { SIGN_UP, LOG_IN } from '../apollo/operations';
import routes from '../constants/routes';
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch } from './useTypedDispatch';
import { setCurrentUser } from '../store/authSlice';
import type { AuthResult, MutationSignupArgs, QueryLoginArgs, User } from '../apollo/types';

export function useAuthUser() {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [registerUser] = useMutation<{ signup: AuthResult }, MutationSignupArgs>(SIGN_UP);
  const [loginUser] = useLazyQuery<{ login: AuthResult }, QueryLoginArgs>(LOG_IN);

  const saveTokenAndUser = (token: string, user: User) => {
    dispatch(setCurrentUser(user));
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleRegistration = async (email: string, password: string) => {
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
        saveTokenAndUser(token, user);
        navigate(routes.employees());
        return { error: null };
      } else {
        return { error: 'Signup was successful, but no token received.' };
      }
    } catch (err) {
      return { data: null, error: 'Such user already exists' };
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data, error } = await loginUser({
        variables: {
          auth: {
            email: email,
            password: password,
          },
        },
      });

      if (error) {
        return { data: null, error: error.message };
      }
      const token = data?.login?.access_token;
      const user = data?.login?.user;
      if (token && user) {
        saveTokenAndUser(token, user);
        navigate(routes.employees());
        return { error: null };
      } else {
        return { error: 'Login was successful, but no token received.' };
      }
    } catch (err) {
      return { data: null, error: 'An error occurred during login.' };
    }
  };

  return { handleRegistration, handleLogin };
}
