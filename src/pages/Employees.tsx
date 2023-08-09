import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_USERS } from '../apollo/operations';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { usersSelectors, setUsers } from '../store/usersSlice';
import { BreadcrumbsNav, EmployeesTable, Loader, InfoBar } from '../components';
import type { User } from '../apollo/types';

interface QueryResult {
  users: User[];
}

export default function Employees() {
  const dispatch = useTypedDispatch();
  const users = useTypedSelector(usersSelectors.selectAll);
  const [getUsers, { loading, error, data }] = useLazyQuery<QueryResult>(GET_USERS);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setUsers(data.users));
    }
  }, [data]);

  const dataExist = users.length > 0;

  if (loading && !dataExist) {
    return <Loader />;
  }

  return (
    <>
      <BreadcrumbsNav paths={[{ text: 'Employees' }]} />
      <EmployeesTable users={users} />
      {error && !dataExist ? <InfoBar text={error.message} status="error" /> : null}
    </>
  );
}
