import React, { useState } from 'react';
import { GET_PROJECTS } from '../../apollo/operations';
import { useQuery } from '@apollo/client';
import InitialTable from './InitialTable';
import { Loader } from '../';
import routes from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import type { Project } from '../../apollo/types';
import type { MenuItemData } from '../MoreMenu';
import type { Column } from './InitialTable';
import InfoBar from '../InfoBar';
import roles from '../../constants/roles';
import ProjectCreationForm from '../forms/Projects/ProjectCreationForm';

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
  const isAdmin = currentUser?.role === roles.ADMIN;
  const { loading, error, data } = useQuery<{ projects: Project[] }>(GET_PROJECTS);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) return <Loader />;

  const projects = data?.projects || [];

  const columns: Column[] = [
    { id: 'name', label: 'Name', align: 'center', searchable: true, sortable: true },
    { id: 'internalName', label: 'Internal Name', align: 'center', searchable: true, sortable: true },
    { id: 'startDate', label: 'Start Date', align: 'center', sortable: true },
    { id: 'endDate', label: 'End Date', align: 'center', sortable: true },
    { id: 'domain', label: 'Domain', align: 'center', sortable: true },
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
        disabled: !isAdmin,
      },
    ],
  }));

  return (
    <>
      <InitialTable columns={columns} rows={rows} openModal={handleOpenModal} allowedToCreate={isAdmin} />
      <ProjectCreationForm showModal={showModal} handleCloseModal={handleCloseModal} />
      {error ? <InfoBar text={error.message} status="error" /> : null}
    </>
  );
}
