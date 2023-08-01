import React from 'react';
import { GET_USERS } from '../../apollo/operations';
import { useQuery } from '@apollo/client';
import { InitialTable, Column } from './InitialTable';
import { MenuItemData } from '../MoreMenu';
import { User } from '../../apollo/types';
import Loader from '../Loader';
import routes from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getUserNameAbbreviation } from '../../utils';

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

export function EmployeesTable() {
  const navigate = useNavigate();
  const currentUser = useTypedSelector(state => state.auth.currentUser);
  const { loading, error, data } = useQuery<{ users: User[] }>(GET_USERS);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  const users = data?.users || [];

  const columns: Column[] = [
    { id: 'avatar', label: '', align: 'center' },
    { id: 'firstName', label: 'First Name', align: 'center', searchable: true },
    { id: 'lastName', label: 'Last Name', align: 'center', searchable: true },
    { id: 'email', label: 'Email', align: 'center' },
    { id: 'department', label: 'Department', align: 'center' },
    { id: 'position', label: 'Position', align: 'center' },
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

  return <InitialTable columns={columns} rows={rows} />;
}
