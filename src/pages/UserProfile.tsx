import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { getUserNameAbbreviation } from '../utils';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/FileUploadOutlined';
import type { User, Department, Position } from '../apollo/types';

interface OutletContext {
  user: User;
  departments: Department[];
  positions: Position[];
}

export default function UserProfile() {
  const { user, departments, positions } = useOutletContext<OutletContext>();
  const currentUser = useTypedSelector(state => state.auth.currentUser!);

  const dateOfUserCreation = new Date(+user.created_at).toDateString();
  const isProfileOwner = user.id === currentUser.id;

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  return (
    <Box sx={{ maxWidth: 720, m: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar
          sx={{ width: 120, height: 120, fontSize: 40 }}
          src={user.profile.avatar!}
          alt={user.profile.full_name || user.email}
        >
          {getUserNameAbbreviation(user)}
        </Avatar>

        {isProfileOwner && (
          <Box sx={{ m: 'auto' }} component="form">
            <InputLabel sx={{ cursor: 'pointer' }} htmlFor="avatar-upload">
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  color: 'text.primary',
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                <UploadIcon fontSize="large" /> Upload avatar image
              </Typography>
              <Typography>png, jpg or gif no more than 0.5MB</Typography>
            </InputLabel>
            <Input
              sx={{ display: 'none' }}
              id="avatar-upload"
              type="file"
              inputProps={{ accept: '.png, .jpeg, .jpg, .gif' }}
              onChange={handleAvatarUpload}
            />
          </Box>
        )}
      </Box>

      <Box sx={{ mb: 8 }}>
        {user.profile.full_name && <Typography fontSize={24}>{user.profile.full_name}</Typography>}
        <Typography>{user.email}</Typography>
        <Typography>A member since {dateOfUserCreation}</Typography>
      </Box>

      <Grid container component="form" columnSpacing={3} rowSpacing={6}>
        <Grid item xs={12} md={6}>
          <TextField
            id="first-name"
            label="First Name"
            value={user.profile.first_name ?? ''}
            inputProps={{ readOnly: !isProfileOwner }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="last-name"
            label="Last Name"
            value={user.profile.last_name ?? ''}
            inputProps={{ readOnly: !isProfileOwner }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            id="department-name"
            label="Department"
            value={user.department_name}
            inputProps={{ readOnly: !isProfileOwner }}
            fullWidth
          >
            {departments.map(({ id, name }) => (
              <MenuItem value={name} key={id}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            id="position-name"
            label="Position"
            value={user.position_name}
            inputProps={{ readOnly: !isProfileOwner }}
            fullWidth
          >
            {positions.map(({ id, name }) => (
              <MenuItem value={name} key={id}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {isProfileOwner && (
          <Grid item xs={12} md={6} ml="auto">
            <Button variant="contained" disabled fullWidth>
              Update
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
