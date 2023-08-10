import React, { useCallback } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import startCase from 'lodash/startCase';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';
import roles from '../../../constants/roles';
import { UPDATE_PROJECT } from '../../../apollo/operations';
import { useMutation } from '@apollo/client';
import InfoBar from '../../InfoBar';
import { DateInputProps, InputValues, NumberInputProps, TextInputProps } from './ProjectFormInterfaces';
import { Project } from '../../../apollo/types';
import { useTypedDispatch } from '../../../hooks/useTypedDispatch';
import { updateProject } from '../../../store/projectsSlice';

interface ProjectFormProps {
  project: Project;
}

export default function ProjectDetailsForm({ project }: ProjectFormProps) {
  const dispatch = useTypedDispatch();
  const [updateProjectData, { loading, error, data }] = useMutation(UPDATE_PROJECT);
  const currentUser = useTypedSelector(state => state.auth.currentUser);
  const isAdmin = currentUser?.role === roles.ADMIN;

  const initialValues: InputValues = {
    name: project.name ?? '',
    internalName: project.internal_name ?? '',
    description: project.description ?? '',
    domain: project.domain ?? '',
    teamSize: project.team_size ?? 0,
    startDate: project.start_date ? dayjs(project.start_date) : null,
    endDate: project.end_date ? dayjs(project.end_date) : null,
  };

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { isDirty, errors },
  } = useForm<InputValues>({
    values: initialValues,
  });

  const onSubmit: SubmitHandler<InputValues> = async values => {
    const { name, internalName, description, domain, startDate, endDate, teamSize } = values;
    try {
      await updateProjectData({
        variables: {
          id: project.id,
          project: {
            name: name,
            internal_name: internalName,
            description: description,
            domain: domain,
            team_size: Number(teamSize),
            start_date: startDate?.format('YYYY-MM-DD'),
            end_date: endDate?.format('YYYY-MM-DD'),
            skillsIds: [],
          },
        },
      });
      dispatch(updateProject({ id: project.id, changes: values }));
    } catch (error) {
      console.error(error);
    }
  };

  const TextInput = useCallback(
    ({ name, isRequired, rows }: TextInputProps) => (
      <TextField
        id={name}
        label={startCase(name)}
        {...register(name, {
          ...(isRequired ? { required: `${startCase(name)} is required` } : {}),
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

  const NumberInput = useCallback(
    ({ name }: NumberInputProps) => (
      <TextField
        type="number"
        id={name}
        label={startCase(name)}
        {...register(name, {
          required: `${startCase(name)} is required`,
        })}
        inputProps={{ readOnly: !isAdmin, min: 1 }}
        fullWidth
      />
    ),
    [],
  );

  const DateInput = useCallback(
    ({ name }: DateInputProps) => (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            label={startCase(name)}
            readOnly={!isAdmin}
            slotProps={{ textField: { fullWidth: true } }}
            value={getValues(name)}
            onChange={date => field.onChange(date)}
          />
        )}
      />
    ),
    [],
  );

  return (
    <>
      <Box
        sx={{ maxWidth: 720, position: 'absolute', top: '50%', right: '50%', transform: 'translate(50%,-50%)' }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container columnSpacing={3} rowSpacing={6}>
          <Grid item xs={12} md={6}>
            <TextInput name="name" isRequired={true} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput name="internalName" isRequired={false} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput name="domain" isRequired={true} />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput name="teamSize" />
          </Grid>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item xs={12} md={6}>
              <DateInput name="startDate" />
            </Grid>
            <Grid item xs={12} md={6}>
              <DateInput name="endDate" />
            </Grid>
          </LocalizationProvider>
          <Grid item xs={12} md={12}>
            <TextInput name="description" isRequired={true} rows={3} />
          </Grid>
          {isAdmin && (
            <Grid item xs={12} md={6} ml="auto">
              <Button type="submit" variant="contained" disabled={!isDirty || loading} fullWidth>
                Update
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
      {error ? <InfoBar text={error.message} status="error" /> : null}
      {data ? <InfoBar text="Project updated successfully" status="success" /> : null}
    </>
  );
}
