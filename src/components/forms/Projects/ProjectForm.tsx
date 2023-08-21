import React, { useCallback, useMemo } from 'react';
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
import { CREATE_PROJECT, UPDATE_PROJECT } from '../../../apollo/operations';
import { useMutation } from '@apollo/client';
import InfoBar from '../../InfoBar';
import { DateInputProps, InputValues, NumberInputProps, TextInputProps } from './projectFormInterfaces';
import { Project } from '../../../apollo/types';
import { useTypedDispatch } from '../../../hooks/useTypedDispatch';
import { addProject, updateProject } from '../../../store/projectsSlice';
export type FormType = 'create' | 'update';

interface ProjectFormProps {
  project: Project | null;
  type: FormType;
  onSubmit: () => void;
  onReset: () => void;
}

export default function ProjectForm({ project, type, onReset, onSubmit }: ProjectFormProps) {
  const dispatch = useTypedDispatch();
  const [update, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_PROJECT);
  const [create, { loading: createLoading, error: createError }] = useMutation(CREATE_PROJECT);
  const initialStartDate = useMemo(() => dayjs(), []);

  const initialValues: InputValues = {
    name: project?.name ?? '',
    internalName: project?.internal_name ?? '',
    description: project?.description ?? '',
    domain: project?.domain ?? '',
    teamSize: project?.team_size ?? 1,
    startDate: project?.start_date ? dayjs(project?.start_date) : initialStartDate,
    endDate: project?.end_date ? dayjs(project.end_date) : null,
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

  const onUpdate: SubmitHandler<InputValues> = async values => {
    const { name, internalName, description, domain, startDate, endDate, teamSize } = values;
    try {
      await update({
        variables: {
          id: project!.id,
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
      dispatch(
        updateProject({
          id: project!.id,
          changes: {
            name: name,
            internal_name: internalName,
            description: description,
            domain: domain,
            team_size: Number(teamSize),
            start_date: startDate ? startDate.format('YYYY-MM-DD') : '',
            end_date: endDate ? endDate.format('YYYY-MM-DD') : '',
          },
        }),
      );
      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  const onCreate: SubmitHandler<InputValues> = async values => {
    const { name, internalName, description, domain, startDate, endDate, teamSize } = values;
    try {
      const { data } = await create({
        variables: {
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
      const project = data.createProject;
      dispatch(addProject(project));
      onSubmit();
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
            slotProps={{ textField: { fullWidth: true } }}
            value={getValues(name)}
            onChange={date => field.onChange(date)}
          />
        )}
      />
    ),
    [],
  );

  const handlers = {
    create: onCreate,
    update: onUpdate,
  };

  const error = createError?.message || updateError?.message;

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(handlers[type])} onReset={onReset}>
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
          <Grid item xs={12} md={6}>
            <Button type="reset" variant="outlined" fullWidth>
              cancel
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button type="submit" variant="contained" disabled={!isDirty || updateLoading || createLoading} fullWidth>
              {type}
            </Button>
          </Grid>
        </Grid>
      </Box>
      {error && <InfoBar text={error} status="error" />}
    </>
  );
}
