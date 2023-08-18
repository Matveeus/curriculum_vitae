import React, { useState } from 'react';
import type { Column } from './InitialTable';
import InitialTable from './InitialTable';
import routes from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import type { Cv } from '../../apollo/types';
import type { MenuItemData } from '../MoreMenu';
import Search from '../Search';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import roles from '../../constants/roles';
import { useMutation } from '@apollo/client';
import { DELETE_CV } from '../../apollo/operations';
import InfoBar from '../InfoBar';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { deleteCv } from '../../store/cvsSlice';
import Dialog from '@mui/material/Dialog';
import CvForm from '../forms/CVs/CvFrom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import type { FormType } from '../forms/CVs/CvFrom';

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
  const dispatch = useTypedDispatch();
  const currentUser = useTypedSelector(state => state.auth.currentUser);
  const isAdmin = currentUser?.role === roles.ADMIN;
  const [mutate, { error, data }] = useMutation(DELETE_CV);
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState<FormType>('update');
  const [cvToUpdate, setCvToUpdate] = useState<Cv | null>(null);
  const [searchInput, setSearchInput] = React.useState('');

  const handleOpenModal = (type: FormType) => {
    setShowModal(true);
    setFormType(type);
  };

  const handleUpdateButtonClick = (cv: Cv) => {
    setCvToUpdate(cv);
    handleOpenModal('update');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCvToUpdate(null);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value.toLowerCase());
  };

  const handleCVDeletion = async (id: string) => {
    await mutate({ variables: { id } });
    dispatch(deleteCv(id));
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
        text: 'Update CV',
        onClick: () => handleUpdateButtonClick(cv),
        disabled: !(isAdmin || cv.user?.id === currentUser?.id),
      },
      {
        text: 'Delete CV',
        onClick: () => handleCVDeletion(cv.id),
        disabled: !(isAdmin || cv.user?.id === currentUser?.id),
      },
    ],
  }));

  return (
    <>
      <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Search onSearchInputChange={handleSearchInputChange} />
        <Button sx={{ borderRadius: 0 }} variant="outlined" onClick={() => handleOpenModal('create')}>
          Create cv
        </Button>
      </Box>
      <InitialTable columns={columns} rows={rows} filterBy={searchInput} />
      <Dialog fullScreen open={showModal} onClose={handleCloseModal}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" textAlign="center">
              {`${formType} cv`}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ m: '0 20px' }}>
          <CvForm type={formType} cv={cvToUpdate} onReset={handleCloseModal} />
        </Box>
      </Dialog>
      {error ? <InfoBar text={error.message} status="error" /> : null}
      {data ? <InfoBar text="CV deleted successfully" status="success" /> : null}
    </>
  );
}
