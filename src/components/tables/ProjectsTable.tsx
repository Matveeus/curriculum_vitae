import React, { useState } from 'react';
import type { Column } from './InitialTable';
import InitialTable from './InitialTable';
import { DELETE_PROJECT } from '../../apollo/operations';
import { deleteProject } from '../../store/projectsSlice';
import routes from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import roles from '../../constants/roles';
import ProjectCreationForm from '../forms/Projects/ProjectCreationForm';
import Search from '../Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import type { MenuItemData } from '../MoreMenu';
import type { Project } from '../../apollo/types';
import { useMutation } from '@apollo/client';
import InfoBar from '../InfoBar';
import type { FormType } from '../forms/Projects/ProjectForm';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import ProjectForm from '../forms/Projects/ProjectForm';

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

const modalTitles: Record<FormType, string> = {
  create: 'Create project',
  update: 'Update project',
};

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const currentUser = useTypedSelector(state => state.auth.currentUser);
  const isAdmin = currentUser?.role === roles.ADMIN;
  const [mutate, { error, data }] = useMutation(DELETE_PROJECT);
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState<FormType>('update');
  const [projectToUpdate, setProjectToUpdate] = useState<Project | null>(null);
  const [searchInput, setSearchInput] = React.useState('');

  const handleOpenModal = (type: FormType) => {
    setShowModal(true);
    setFormType(type);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProjectToUpdate(null);
  };

  const handleUpdateButtonClick = (project: Project) => {
    setProjectToUpdate(project);
    handleOpenModal('update');
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value.toLowerCase());
  };

  const handleProjectDeletion = async (id: string) => {
    await mutate({ variables: { id } });
    dispatch(deleteProject(id));
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
        text: 'Update project',
        onClick: () => handleUpdateButtonClick(project),
        disabled: !isAdmin,
      },
      {
        text: 'Delete project',
        onClick: () => handleProjectDeletion(project.id),
        disabled: !isAdmin,
      },
    ],
  }));

  return (
    <>
      <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Search onSearchInputChange={handleSearchInputChange} />
        {isAdmin ? (
          <Button sx={{ borderRadius: 0 }} variant="outlined" onClick={() => handleOpenModal('create')}>
            Create project
          </Button>
        ) : null}
      </Box>
      <InitialTable columns={columns} rows={rows} filterBy={searchInput} />

      <Dialog open={showModal} onClose={handleCloseModal} fullWidth maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle>{modalTitles[formType]}</DialogTitle>
          <Box sx={{ px: 2 }}>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <DialogContent>
          <ProjectForm type={formType} project={projectToUpdate} onReset={handleCloseModal} />
        </DialogContent>
      </Dialog>
      <Modal open={showModal} onClose={handleCloseModal}>
        <Box>
          <ProjectCreationForm handleCloseModal={handleCloseModal} />
        </Box>
      </Modal>
      {error ? <InfoBar text={error.message} status="error" /> : null}
      {data ? <InfoBar text="Project deleted successfully" status="success" /> : null}
    </>
  );
}
