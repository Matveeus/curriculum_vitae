import React, { useState } from 'react';
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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { InfoBar, Search, UserForm } from '../';
import type { MenuItemData } from '../MoreMenu';
import type { Column } from './InitialTable';
import type { User, Department, Position } from '../../apollo/types';
import type { FormType } from '../forms/Employees/UserForm';

interface EmployeesTableProps {
  users: User[];
  departments: Department[];
  positions: Position[];
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

const modalTitles: Record<FormType, string> = {
  create: 'Create user',
  update: 'Update user',
};

export default function EmployeesTable({ departments, positions, users }: EmployeesTableProps) {
  const currentUser = useTypedSelector(state => state.auth.currentUser!);
  const [searchInput, setSearchInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>('update');
  const [userToUpdate, setUserToUpdate] = useState<User | null>(null);
  const [mutate, { error, data }] = useMutation(DELETE_USER);
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const isAdmin = currentUser.role === roles.ADMIN;

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value.toLowerCase());
  };

  const openModal = (type: FormType) => {
    setIsModalOpen(true);
    setFormType(type);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserToUpdate(null);
  };

  const handleUpdateButtonClick = (user: User) => {
    setUserToUpdate(user);
    openModal('update');
  };

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
        text: 'Update user',
        onClick: () => handleUpdateButtonClick(user),
        disabled: !isAdmin,
      },
      {
        text: 'Delete user',
        onClick: () => handleUserDeletion(user.id),
        disabled: !isAdmin,
      },
    ],
  }));

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Search onSearchInputChange={handleSearchInputChange} />
        {isAdmin && (
          <Button sx={{ borderRadius: 0 }} variant="outlined" onClick={() => openModal('create')}>
            Create user
          </Button>
        )}
      </Box>

      <InitialTable columns={columns} rows={rows} filterBy={searchInput} />

      <Dialog open={isModalOpen} onClose={closeModal} fullWidth maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle>{modalTitles[formType]}</DialogTitle>
          <Box sx={{ px: 2 }}>
            <IconButton onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <DialogContent>
          <UserForm
            type={formType}
            departments={departments}
            positions={positions}
            user={userToUpdate}
            onSubmit={closeModal}
            onReset={closeModal}
          />
        </DialogContent>
      </Dialog>

      {error ? <InfoBar text={error.message} status="error" /> : null}
      {data ? <InfoBar text="User deleted successfully" status="success" /> : null}
    </>
  );
}
