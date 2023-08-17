import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import roles from '../constants/roles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AvatarUploadForm, ProfileUpdateForm } from '../components';
import type { User } from '../apollo/types';

interface OutletContext {
  user: User;
}

export default function UserProfile() {
  const { user } = useOutletContext<OutletContext>();
  const currentUser = useTypedSelector(state => state.auth.currentUser!);

  const dateOfUserCreation = new Date(+user.created_at).toDateString();

  const isProfileOwner = user.id === currentUser.id;
  const isAdmin = currentUser.role === roles.ADMIN;
  const hasWritePermission = isProfileOwner || isAdmin;

  return (
    <Box sx={{ maxWidth: 720, m: 'auto' }}>
      <AvatarUploadForm visible={hasWritePermission} />

      <Box sx={{ mb: 8 }}>
        {user.profile.full_name && (
          <Typography color="inherit" fontSize={24}>
            {user.profile.full_name}
          </Typography>
        )}
        <Typography>{user.email}</Typography>
        <Typography>A member since {dateOfUserCreation}</Typography>
      </Box>

      <ProfileUpdateForm readOnly={!hasWritePermission} />
    </Box>
  );
}
