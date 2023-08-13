import React, { useState } from 'react';
import InitialTable from './InitialTable';
import routes from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import type { Cv } from '../../apollo/types';
import type { MenuItemData } from '../MoreMenu';
import type { Column } from './InitialTable';
import Search from '../Search';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import roles from '../../constants/roles';

interface Data {
  id: string;
  name: string;
  description: string;
  email: string;
  projects: string[];
  menuItems?: MenuItemData[];
}

interface CVsTableProps {
  cvs: Cv[];
}

export default function CVsTable({ cvs }: CVsTableProps) {
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
    { id: 'description', label: 'Description', align: 'center' },
    { id: 'email', label: 'Employee email', align: 'center' },
    { id: 'projects', label: 'Employee projects', align: 'left' },
    { id: 'menuItems', label: '', align: 'center' },
  ];

  const rows: Data[] = cvs.map(cv => ({
    id: cv.id ?? '',
    name: cv.name ?? '',
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
        disabled: !(isAdmin || cv.user?.email === currentUser?.email),
      },
    ],
  }));

  return (
    <>
      <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Search onSearchInputChange={handleSearchInputChange} />
        <Button sx={{ borderRadius: 0 }} variant="outlined" onClick={handleOpenModal}>
          Create cv
        </Button>
      </Box>
      <InitialTable columns={columns} rows={rows} filterBy={searchInput} />
      <Modal open={showModal} onClose={handleCloseModal}>
        <Box>CV FORM</Box>
      </Modal>
      {/*{error ? <InfoBar text={error.message} status="error" /> : null}*/}
    </>
  );
}
