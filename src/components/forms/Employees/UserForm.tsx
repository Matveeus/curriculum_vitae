import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CREATE_USER, UPDATE_USER } from '../../../apollo/operations';
import { useTypedDispatch } from '../../../hooks/useTypedDispatch';
import { addUser, updateUser } from '../../../store/usersSlice';
import startCase from 'lodash/startCase';
import isEmpty from 'lodash/isEmpty';
import repeat from 'lodash/repeat';
import roles from '../../../constants/roles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import { InfoBar } from '../../';
import type { SubmitHandler, RegisterOptions } from 'react-hook-form';
import type { TextFieldProps } from '@mui/material/TextField';
import type { User, Department, Position } from '../../../apollo/types';
import type Roles from '../../../constants/roles';

type FormType = 'create' | 'update';

interface UserFormProps {
  type: FormType;
  departments: Department[];
  positions: Position[];
  user: User | null;
  onSubmit: () => void;
  onReset: () => void;
}

interface InputValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  department: string;
  position: string;
  role: Roles;
}

type FormInputProps = TextFieldProps & {
  name: keyof InputValues;
  rules?: RegisterOptions;
};

export default function UserForm({ type, departments, positions, user, ...props }: UserFormProps) {
  const [create, userCreation] = useMutation(CREATE_USER);
  const [update, userUpdate] = useMutation(UPDATE_USER);
  const dispatch = useTypedDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<InputValues>({
    defaultValues: {
      email: user?.email ?? '',
      password: user ? repeat('*', 6) : '',
      firstName: user?.profile.first_name ?? '',
      lastName: user?.profile.last_name ?? '',
      department: user?.department?.id ?? '',
      position: user?.position?.id ?? '',
      role: (user?.role as Roles) ?? '',
    },
  });

  const FormInput = useCallback(
    ({ name, rules = {}, ...props }: FormInputProps) => (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => <TextField id={name} label={startCase(name)} {...field} {...props} fullWidth />}
      />
    ),
    [],
  );

  const onCreate: SubmitHandler<InputValues> = async values => {
    const { email, password, firstName, lastName, department, position, role } = values;
    const { data } = await create({
      variables: {
        user: {
          auth: { email, password },
          profile: { first_name: firstName, last_name: lastName },
          cvsIds: [],
          departmentId: department,
          positionId: position,
          role,
        },
      },
    });
    const user = data.createUser;
    dispatch(addUser(user));
    props.onSubmit();
  };

  const onUpdate: SubmitHandler<InputValues> = async values => {
    const { firstName, lastName, department, position } = values;
    const { data } = await update({
      variables: {
        id: user!.id,
        user: {
          profile: { first_name: firstName, last_name: lastName },
          departmentId: department,
          positionId: position,
        },
      },
    });
    const { id, ...changes } = data.updateUser;
    dispatch(updateUser({ id, changes }));
    props.onSubmit();
  };

  const handlers = {
    create: onCreate,
    update: onUpdate,
  };

  const loading = userCreation.loading || userUpdate.loading;
  const error = userCreation.error || userUpdate.error;

  const isEditableField = type === 'create';

  return (
    <Box component="form" onSubmit={handleSubmit(handlers[type])} onReset={props.onReset}>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <FormInput
            type="email"
            name="email"
            rules={{
              required: { value: true, message: 'Required field' },
            }}
            error={isEditableField && !isEmpty(errors)}
            helperText={isEditableField && errors.email?.message}
            disabled={!isEditableField}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInput
            type="password"
            name="password"
            rules={{
              required: { value: true, message: 'Required field' },
              minLength: { value: 6, message: 'At least 6 characters' },
            }}
            error={isEditableField && !isEmpty(errors)}
            helperText={isEditableField && errors.password?.message}
            disabled={!isEditableField}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInput name="firstName" />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInput name="lastName" />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInput select name="department">
            {departments.map(({ id, name }) => (
              <MenuItem value={id} key={id}>
                {name}
              </MenuItem>
            ))}
          </FormInput>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInput select name="position">
            {positions.map(({ id, name }) => (
              <MenuItem value={id} key={id}>
                {name}
              </MenuItem>
            ))}
          </FormInput>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInput
            select
            name="role"
            rules={{
              required: { value: true, message: 'Required field' },
            }}
            error={!isEmpty(errors)}
            helperText={errors.role?.message}
            disabled={!isEditableField}
          >
            {Object.values(roles).map(name => (
              <MenuItem value={name} key={name}>
                {name}
              </MenuItem>
            ))}
          </FormInput>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, color: 'grey' }}>
        <Button sx={{ borderRadius: 0 }} type="reset" variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button sx={{ borderRadius: 0 }} type="submit" disabled={!isDirty || loading} variant="contained">
          {loading ? <CircularProgress size={24} color="inherit" /> : type}
        </Button>
      </Box>

      {error ? <InfoBar text={error.message} status="error" /> : null}
    </Box>
  );
}

export type { FormType };
