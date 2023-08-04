import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import type { User, Department, Position } from '../../apollo/types';

interface FormProps {
  readOnly: boolean;
}

interface OutletContext {
  user: User;
  departments: Department[];
  positions: Position[];
}

export default function ProfileUpdateForm({ readOnly }: FormProps) {
  const { user, departments, positions } = useOutletContext<OutletContext>();

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  return (
    <Box component="form" onSubmit={handleAvatarUpload}>
      <Grid container columnSpacing={3} rowSpacing={6}>
        <Grid item xs={12} md={6}>
          <TextField
            id="first-name"
            label="First Name"
            value={user.profile.first_name ?? ''}
            inputProps={{ readOnly }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="last-name"
            label="Last Name"
            value={user.profile.last_name ?? ''}
            inputProps={{ readOnly }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            id="department-name"
            label="Department"
            value={user.department_name}
            inputProps={{ readOnly }}
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
            inputProps={{ readOnly }}
            fullWidth
          >
            {positions.map(({ id, name }) => (
              <MenuItem value={name} key={id}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {!readOnly && (
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
