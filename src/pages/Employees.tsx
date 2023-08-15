import React, { useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_USERS, GET_SELECT_LISTS } from '../apollo/operations';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { usersSelectors, setUsers } from '../store/usersSlice';
import Box from '@mui/material/Box';
import { BreadcrumbsNav, EmployeesTable, Loader, InfoBar } from '../components';
import type { User, Department, Position } from '../apollo/types';

interface UsersQueryResult {
  users: User[];
}

interface ListsQueryResult {
  departments: Department[];
  positions: Position[];
}

export default function Employees() {
  const dispatch = useTypedDispatch();
  const users = useTypedSelector(usersSelectors.selectAll);
  const [getUsers, usersQuery] = useLazyQuery<UsersQueryResult>(GET_USERS);
  const listsQuery = useQuery<ListsQueryResult>(GET_SELECT_LISTS);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (usersQuery.data) {
      dispatch(setUsers(usersQuery.data.users));
    }
  }, [usersQuery.data]);

  const loading = usersQuery.loading || listsQuery.loading;
  const error = usersQuery.error || listsQuery.error;

  const departments = listsQuery.data?.departments ?? [];
  const positions = listsQuery.data?.positions ?? [];

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <BreadcrumbsNav paths={[{ text: 'Employees' }]} />
      </Box>

      <EmployeesTable departments={departments} positions={positions} users={users} />

      {error ? <InfoBar text={error.message} status="error" /> : null}
    </>
  );
}
