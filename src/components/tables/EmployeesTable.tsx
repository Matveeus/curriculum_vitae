import React from 'react';
import { GET_USERS_DATA } from '../../apollo/employeesData';
import { useQuery } from '@apollo/client';
import { InitialTable, Column } from './InitialTable';
import { MenuItemData } from '../MoreMenu';
import { User } from '../../apollo/types';
import Loader from '../Loader';
import routes from '../../constants/routes';
import { useNavigate } from 'react-router-dom';

interface Data {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
}

export function EmployeesTable() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<{ users: User[] }>(GET_USERS_DATA);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  const users = data?.users || [];

  const columns: Column[] = [
    { id: 'avatar', label: '', align: 'center' },
    { id: 'firstName', label: 'First Name', align: 'center' },
    { id: 'lastName', label: 'Last Name', align: 'center' },
    { id: 'email', label: 'Email', align: 'center' },
    { id: 'department', label: 'Department', align: 'center' },
    { id: 'position', label: 'Position', align: 'center' },
    { id: 'menu', label: '', align: 'center' },
  ];

  const rows: Data[] = users.map(user => ({
    id: user.id ?? '',
    avatar: user.profile.avatar ? user.profile.avatar : user.profile.first_name?.charAt(0) ?? user.email.charAt(0),
    firstName: user.profile.first_name ?? '',
    lastName: user.profile.last_name ?? '',
    email: user.email ?? '',
    department: user.department_name ?? '',
    position: user.position_name ?? '',
  }));

  const handleMenuItemClick = (item: string, rowId: string) => {
    switch (item) {
      case 'Profile':
        navigate(routes.employee(rowId));
        break;
      case 'Delete user':
        console.log('deleted');
        break;
      default:
        break;
    }
  };

  const menuItems: MenuItemData[] = [
    { text: 'Profile', onClick: (rowId: string) => handleMenuItemClick('Profile', rowId), disabled: false },
    { text: 'Delete user', onClick: (rowId: string) => handleMenuItemClick('Delete user', rowId), disabled: true },
  ];

  return <InitialTable columns={columns} rows={rows} menuItems={menuItems} />;
}
