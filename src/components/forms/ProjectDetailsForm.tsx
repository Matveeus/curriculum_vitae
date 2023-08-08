import React, { useCallback } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import type { Project } from '../../apollo/types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import startCase from 'lodash/startCase';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { UPDATE_PROJECT } from '../../apollo/operations';
import { useMutation } from '@apollo/client';
import InfoBar from '../InfoBar';

interface ProjectDetailsFormProps {
  project: Project;
}

interface InputValues {
  name: string;
  internalName: string;
  description: string;
  domain: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface TextInputProps {
  name: 'name' | 'internalName' | 'description' | 'domain';
}

interface DateInputProps {
  name: 'startDate' | 'endDate';
}

export default function ProjectDetailsForm({ project }: ProjectDetailsFormProps) {
  const [updateProject, { loading, error, data }] = useMutation(UPDATE_PROJECT);
  const currentUser = useTypedSelector(state => state.auth.currentUser);
  const isAdmin = currentUser?.role === 'Admin';

  const initialValues: InputValues = {
    name: project.name ?? '',
    internalName: project.internal_name ?? '',
    description: project.description ?? '',
    domain: project.domain ?? '',
    startDate: project.start_date ? dayjs(project.start_date) : null,
    endDate: project.end_date ? dayjs(project.end_date) : null,
  };

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { isDirty },
  } = useForm<InputValues>({
    values: initialValues,
  });

  const onSubmit: SubmitHandler<InputValues> = async values => {
    const { name, internalName, description, domain, startDate, endDate } = values;
    try {
      await updateProject({
        variables: {
          id: project.id,
          project: {
            name: name,
            internal_name: internalName,
            description: description,
            domain: domain,
            start_date: startDate?.format('YYYY-MM-DD'),
            end_date: endDate?.format('YYYY-MM-DD'),
            team_size: project.team_size,
            skillsIds: [],
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const TextInput = useCallback(
    ({ name }: TextInputProps) => (
      <TextField id={name} label={startCase(name)} {...register(name)} inputProps={{ readOnly: !isAdmin }} fullWidth />
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{ maxWidth: 720, position: 'absolute', top: '50%', right: '50%', transform: 'translate(50%,-50%)' }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container columnSpacing={3} rowSpacing={6}>
            <Grid item xs={12} md={6}>
              <TextInput name="name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput name="internalName" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput name="description" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput name="domain" />
            </Grid>
            <Grid item xs={12} md={6}>
              <DateInput name="startDate" />
            </Grid>
            <Grid item xs={12} md={6}>
              <DateInput name="endDate" />
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
      </LocalizationProvider>
      {error ? <InfoBar text={error.message} status="error" /> : null}
      {data !== undefined ? <InfoBar text="Project updated successfully" status="success" /> : null}
    </>
  );
}
