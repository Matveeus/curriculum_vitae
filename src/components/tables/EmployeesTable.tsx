import React from 'react';
import { GET_USERS_DATA } from '../../apollo/employeesData';
import { useQuery } from '@apollo/client';
import InitialTable from './InitialTable';
import { User } from '../../apollo/types';
import Loader from '../Loader';

export default function EmployeesTable() {
  const { loading, error, data } = useQuery<{ users: User[] }>(GET_USERS_DATA);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  const users = data?.users || [];

  interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    format?: (value: number) => string;
  }

  const columns: Column[] = [
    { id: 'avatar', label: '', align: 'center' },
    { id: 'firstName', label: 'First Name', align: 'center' },
    { id: 'lastName', label: 'Last Name', align: 'center' },
    { id: 'email', label: 'Email', align: 'center' },
    { id: 'department', label: 'Department', align: 'center' },
    { id: 'position', label: 'Position', align: 'center' },
    { id: 'menu', label: '', align: 'center' },
  ];

  interface Data {
    id: string;
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    position: string;
  }

  const rows: Data[] = users.map(user => ({
    id: user.id ?? '',
    avatar: user.profile.avatar ? user.profile.avatar : user.profile.first_name?.charAt(0) ?? user.email.charAt(0),
    firstName: user.profile.first_name ?? '',
    lastName: user.profile.last_name ?? '',
    email: user.email ?? '',
    department: user.department_name ?? '',
    position: user.position_name ?? '',
  }));

  return <InitialTable<Data> columns={columns} rows={rows} />;
}
