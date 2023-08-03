import React from 'react';
import { GET_CVS } from '../../apollo/operations';
import { useQuery } from '@apollo/client';
import InitialTable from './InitialTable';
import { Loader } from '../';
import routes from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import type { Cv } from '../../apollo/types';
import type { MenuItemData } from '../MoreMenu';
import type { Column } from './InitialTable';
import ErrorBar from '../ErrorBar';

interface Data {
  id: string;
  name: string;
  description: string;
  email: string;
  projects: string[];
  menuItems?: MenuItemData[];
}

export default function CVsTable() {
  const navigate = useNavigate();
  const currentUser = useTypedSelector(state => state.auth.currentUser);
  const { loading, error, data } = useQuery<{ cvs: Cv[] }>(GET_CVS);

  if (loading) return <Loader />;

  const cvs = data?.cvs || [];

  const columns: Column[] = [
    { id: 'name', label: 'Name', align: 'center', searchable: true, sortable: true },
    { id: 'description', label: 'Description', align: 'center' },
    { id: 'email', label: 'Employee email', align: 'center' },
    { id: 'projects', label: 'Employee projects', align: 'left' },
    { id: 'menuItems', label: '', align: 'center' },
  ];

  const rows: Data[] = cvs.map(cv => ({
    id: cv.id ?? '',
    name: cv.name || '',
    description: cv.description ?? '',
    email: cv.user?.email ?? '',
    projects: cv.projects?.map(project => project.name) ?? [],
    menuItems: [
      {
        text: 'View CV',
        onClick: () => navigate(routes.cv(cv.id)),
        disabled: false,
      },
      {
        text: 'Delete CV',
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
