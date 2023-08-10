import React, { useState } from 'react';
import InitialTable from './InitialTable';
import routes from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import type { MenuItemData } from '../MoreMenu';
import type { Column } from './InitialTable';
import roles from '../../constants/roles';
import ProjectCreationForm from '../forms/Projects/ProjectCreationForm';
import Search from '../Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Project } from '../../apollo/types';

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

interface ProjectsTableProps {
  projects: Project[];
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const navigate = useNavigate();
  const currentUser = useTypedSelector(state => state.auth.currentUser);
  const isAdmin = currentUser?.role === roles.ADMIN;
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = React.useState('');

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value.toLowerCase());
  };

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
      <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Search onSearchInputChange={handleSearchInputChange} />
        {isAdmin ? (
          <Button sx={{ borderRadius: 0 }} variant="outlined" onClick={handleOpenModal}>
            Create project
          </Button>
        ) : null}
      </Box>
      <InitialTable columns={columns} rows={rows} filterBy={searchInput} />
      <Modal open={showModal} onClose={handleCloseModal}>
        <Box>
          <ProjectCreationForm handleCloseModal={handleCloseModal} />
        </Box>
      </Modal>
    </>
  );
}
