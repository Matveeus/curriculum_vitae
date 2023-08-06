import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import type { Project } from '../../apollo/types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import startCase from 'lodash/startCase';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm, Controller } from 'react-hook-form';
import { Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

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
  const currentUser = useTypedSelector(state => state.auth.currentUser);
  const readOnly = currentUser?.role !== 'admin';

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
    getValues,
    formState: { isDirty },
  } = useForm<InputValues>({
    values: initialValues,
  });

  const TextInput = ({ name }: TextInputProps) => (
    <TextField id={name} label={startCase(name)} {...register(name)} inputProps={{ readOnly: !readOnly }} fullWidth />
  );

  const DateInput = ({ name }: DateInputProps) => (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker
          label={startCase(name)}
          readOnly={!readOnly}
          slotProps={{ textField: { fullWidth: true } }}
          value={getValues(name)}
          onChange={date => field.onChange(date)}
        />
      )}
    />
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: 720, position: 'absolute', top: '50%', right: '50%', transform: 'translate(50%,-50%)' }}>
        <Grid container component="form" columnSpacing={3} rowSpacing={6}>
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
          {readOnly && (
            <Grid item xs={12} md={6} ml="auto">
              <Button variant="contained" disabled={!isDirty} fullWidth>
                Update
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}
