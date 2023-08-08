import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../apollo/operations';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { setUsers } from '../store/usersSlice';
import { InfoBar, Loader } from '../components';
import type { User } from '../apollo/types';

interface QueryResult {
  users: User[];
}

export default function Fetch() {
  const { loading, error, data } = useQuery<QueryResult>(GET_USERS);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setUsers(data.users));
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  return error ? <InfoBar text={error.message} status="error" /> : <Outlet />;
}
