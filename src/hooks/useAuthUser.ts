import { useLazyQuery, useMutation } from '@apollo/client';
import { SIGN_UP, LOGIN } from '../apollo/auth';
import { AuthResult, MutationSignupArgs, QueryLoginArgs, User } from '../apollo/types';
import routes from '../constants/routes';
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch } from './useTypedDispatch';
import { setCurrentUser } from '../store/authSlice';

export function useAuthUser() {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [registerUser] = useMutation<{ signup: AuthResult }, MutationSignupArgs>(SIGN_UP);
  const [loginUser] = useLazyQuery<{ login: AuthResult }, QueryLoginArgs>(LOGIN);

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
        return { error: errors[0].message };
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
      if (err.message === 'duplicate key value violates unique constraint "UQ_e12875dfb3b1d92d7d7c5377e22"') {
        return { error: 'Such user already exists' };
      } else {
        return { error: err.message };
      }
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
        return { error: error.message };
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
      return { error: err.message };
    }
  };

  return { handleRegistration, handleLogin };
}
