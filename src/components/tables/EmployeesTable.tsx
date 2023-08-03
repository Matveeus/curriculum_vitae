import React from 'react';
import { GET_USERS } from '../../apollo/operations';
import { useQuery } from '@apollo/client';
import InitialTable from './InitialTable';
import { Loader } from '../';
import routes from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getUserNameAbbreviation } from '../../utils';
import type { User } from '../../apollo/types';
import type { MenuItemData } from '../MoreMenu';
import type { Column } from './InitialTable';
import ErrorBar from '../ErrorBar';

interface Data {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  menuItems?: MenuItemData[];
}

export default function EmployeesTable() {
  const navigate = useNavigate();
  const currentUser = useTypedSelector(state => state.auth.currentUser);
  const { loading, error, data } = useQuery<{ users: User[] }>(GET_USERS);

  if (loading) return <Loader />;

  const users = data?.users || [];

  const columns: Column[] = [
    { id: 'avatar', label: '', align: 'center' },
    { id: 'firstName', label: 'First Name', align: 'center', searchable: true, sortable: true },
    { id: 'lastName', label: 'Last Name', align: 'center', searchable: true, sortable: true },
    { id: 'email', label: 'Email', align: 'center', sortable: true },
    { id: 'department', label: 'Department', align: 'center', sortable: true },
    { id: 'position', label: 'Position', align: 'center', sortable: true },
    { id: 'menuItems', label: '', align: 'center' },
  ];

  const rows: Data[] = users.map(user => ({
    id: user.id ?? '',
    avatar: user.profile.avatar || getUserNameAbbreviation(user),
    firstName: user.profile.first_name ?? '',
    lastName: user.profile.last_name ?? '',
    email: user.email ?? '',
    department: user.department_name ?? '',
    position: user.position_name ?? '',
    menuItems: [
      {
        text: 'Profile',
        onClick: () => navigate(routes.employee(user.id)),
        disabled: false,
      },
      {
        text: 'Delete user',
        onClick: () => console.log('deleted'),
        disabled: currentUser?.role !== 'admin',
      },
    ],
  }));

  return (
    <>
      <InitialTable columns={columns} rows={rows} />
      {error ? <ErrorBar error={error.message || ''} /> : null}
    </>
  );
}
