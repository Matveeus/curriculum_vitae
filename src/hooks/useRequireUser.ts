import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { AUTH } from '../apollo/userData';
import { useQuery } from '@apollo/client';
import { User, QueryUserArgs } from '../apollo/types';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { setCurrentUser } from '../store/authSlice';

export default function useRequireUser() {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [userId, setUserId] = useState<string>('');

  const { data: userData } = useQuery<{ user: User }, QueryUserArgs>(AUTH, {
    variables: {
      id: userId,
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      if (typeof token === 'string') {
        const decoded: { sub: string } = jwt_decode(token);
        setUserId(decoded.sub);
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (userData) {
      dispatch(setCurrentUser(userData?.user));
    }
  }, [userData, dispatch]);
}
