import React, { useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import startCase from 'lodash/startCase';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../apollo/operations';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { ErrorBar } from '../';
import type { SubmitHandler } from 'react-hook-form';
import type { User, Department, Position } from '../../apollo/types';

interface FormProps {
  readOnly: boolean;
}

interface InputValues {
  firstName: string;
  lastName: string;
  department: string;
  position: string;
}

interface TextInputProps {
  name: 'firstName' | 'lastName';
  error: boolean;
  readOnly: boolean;
}

interface SelectInputProps {
  name: 'department' | 'position';
  options: Department[] | Position[];
  error: boolean;
  readOnly: boolean;
}

interface OutletContext {
  user: User;
  departments: Department[];
  positions: Position[];
}

export default function ProfileUpdateForm({ readOnly }: FormProps) {
  const { user, departments, positions } = useOutletContext<OutletContext>();
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER);

  const initialValues: InputValues = {
    firstName: user.profile.first_name ?? '',
    lastName: user.profile.last_name ?? '',
    department: user.department?.id ?? '',
    position: user.position?.id ?? '',
  };

  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<InputValues>({ values: initialValues });

  const onSubmit: SubmitHandler<InputValues> = values => {
    const { firstName, lastName, department, position } = values;
    updateUser({
      variables: {
        id: user.id,
        user: {
          profile: { first_name: firstName, last_name: lastName },
          departmentId: department,
          positionId: position,
        },
      },
    });
  };

  const TextInput = useCallback(
    ({ name, error, readOnly }: TextInputProps) => (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            id={name}
            type="text"
            label={startCase(name)}
            inputProps={{ readOnly }}
            error={error}
            {...field}
            fullWidth
          />
        )}
      />
    ),
    [],
  );

  const SelectInput = useCallback(
    ({ name, options, error, readOnly }: SelectInputProps) => (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            select
            id={name}
            label={startCase(name)}
            inputProps={{ readOnly }}
            error={error}
            {...field}
            fullWidth
          >
            {options.map(({ id, name }) => (
              <MenuItem value={id} key={id}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    ),
    [],
  );

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={3} rowSpacing={6}>
        <Grid item xs={12} md={6}>
          <TextInput name="firstName" error={!!error} readOnly={readOnly} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput name="lastName" error={!!error} readOnly={readOnly} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectInput name="department" options={departments} error={!!error} readOnly={readOnly} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectInput name="position" options={positions} error={!!error} readOnly={readOnly} />
        </Grid>
        {!readOnly && (
          <Grid item xs={12} md={6} ml="auto">
            <Button type="submit" disabled={!isDirty || loading} variant="contained" fullWidth>
              Update
            </Button>
          </Grid>
        )}
      </Grid>
      {error ? <ErrorBar error={error.message} /> : null}
    </Box>
  );
}
