import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_USER } from '../../apollo/operations';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { deleteUser } from '../../store/usersSlice';
import InitialTable from './InitialTable';
import routes from '../../constants/routes';
import roles from '../../constants/roles';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getUserNameAbbreviation } from '../../utils';
import { InfoBar } from '../';
import type { MenuItemData } from '../MoreMenu';
import type { Column } from './InitialTable';
import type { User } from '../../apollo/types';

interface EmployeesTableProps {
  users: User[];
}

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

export default function EmployeesTable({ users }: EmployeesTableProps) {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const currentUser = useTypedSelector(state => state.auth.currentUser);
  const [mutate, { error }] = useMutation(DELETE_USER);

  const handleUserDeletion = async (id: string) => {
    await mutate({ variables: { id } });
    dispatch(deleteUser(id));
  };

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
        onClick: () => handleUserDeletion(user.id),
        disabled: currentUser?.role !== roles.ADMIN,
      },
    ],
  }));

  return (
    <>
      <InitialTable columns={columns} rows={rows} />
      {error ? <InfoBar text={error.message} status="error" /> : null}
    </>
  );
}
