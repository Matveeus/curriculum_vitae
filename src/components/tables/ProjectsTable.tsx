import React from 'react';
import { GET_PROJECTS } from '../../apollo/operations/projects';
import { useQuery } from '@apollo/client';
import InitialTable from './InitialTable';
import { Loader } from '../';
import routes from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import type { Project } from '../../apollo/types';
import type { MenuItemData } from '../MoreMenu';
import type { Column } from './InitialTable';

interface Data {
  id: string;
  name: string;
  internalName: string;
  startDate: string;
  endDate: string;
  domain: string;
  teamSize: number;
  menuItems?: MenuItemData[];
}

export default function ProjectsTable() {
  const navigate = useNavigate();
  const currentUser = useTypedSelector(state => state.auth.currentUser);
  const { loading, error, data } = useQuery<{ projects: Project[] }>(GET_PROJECTS);

  if (loading) return <Loader />;

  const projects = data?.projects || [];

  const columns: Column[] = [
    { id: 'name', label: 'Name', align: 'center', searchable: true },
    { id: 'internalName', label: 'Internal Name', align: 'center', searchable: true },
    { id: 'startDate', label: 'Start Date', align: 'center' },
    { id: 'endDate', label: 'End Date', align: 'center' },
    { id: 'domain', label: 'Domain', align: 'center' },
    { id: 'teamSize', label: 'Team Size', align: 'center' },
    { id: 'menuItems', label: '', align: 'center' },
  ];

  const rows: Data[] = projects.map(project => ({
    id: project.id ?? '',
    name: project.name ?? '',
    internalName: project.internal_name ?? '',
    startDate: project.start_date ?? '',
    endDate: project.end_date ?? 'Till now',
    domain: project.domain ?? '',
    teamSize: project.team_size ?? null,
    menuItems: [
      {
        text: 'View project',
        onClick: () => navigate(routes.project(project.id)),
        disabled: false,
      },
      {
        text: 'Delete project',
        onClick: () => console.log('deleted'),
        disabled: currentUser?.role !== 'admin',
      },
    ],
  }));

  return <InitialTable columns={columns} rows={rows} error={error?.message || ''} />;
}
