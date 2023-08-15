import React, { useCallback } from 'react';
import { Cv } from '../../../apollo/types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import startCase from 'lodash/startCase';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import roles from '../../../constants/roles';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { InputValues, TextInputProps } from './cvFormInterfaces';

interface CvFormProps {
  cv: Cv;
}

export default function CvDetailsForm({ cv }: CvFormProps) {
  const currentUser = useTypedSelector(state => state.auth.currentUser);
  const isAdmin = currentUser?.role === roles.ADMIN;

  const initialValues: InputValues = {
    name: cv.name ?? '',
    description: cv.description ?? '',
  };

  const {
    register,
    formState: { isDirty, errors },
  } = useForm<InputValues>({
    values: initialValues,
  });

  const TextInput = useCallback(
    ({ name, rows }: TextInputProps) => (
      <TextField
        id={name}
        label={startCase(name)}
        {...register(name, {
          ...{ required: `${startCase(name)} is required` },
        })}
        inputProps={{ readOnly: !isAdmin }}
        fullWidth
        multiline={rows !== undefined}
        rows={rows !== undefined ? rows : 1}
        error={!!errors[name]}
        helperText={errors[name] ? errors[name]?.message : ''}
      />
    ),
    [errors],
  );

  return (
    <Box sx={{ maxWidth: 720, position: 'absolute', top: '50%', right: '50%', transform: 'translate(50%,-50%)' }}>
      <TextInput name="name" />
      <TextInput name="description" rows={3} />
      <Button type="submit" variant="contained" disabled={!isDirty} fullWidth>
        Update
      </Button>
    </Box>
  );
}
