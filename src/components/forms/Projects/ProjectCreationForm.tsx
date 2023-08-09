import React, { useCallback, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import startCase from 'lodash/startCase';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Box } from '@mui/material';
import { CREATE_PROJECT } from '../../../apollo/operations';
import { useMutation } from '@apollo/client';
import InfoBar from '../../InfoBar';
import { DateInputProps, InputValues, NumberInputProps, TextInputProps } from './ProjectFormInterfaces';
import dayjs from 'dayjs';

interface ProjectFormProps {
  handleCloseModal: () => void;
}

export default function ProjectCreationForm({ handleCloseModal }: ProjectFormProps) {
  const [createProject, { loading, error, data }] = useMutation(CREATE_PROJECT);
  const initialStartDate = useMemo(() => dayjs(), []);

  const initialValues: InputValues = {
    name: '',
    internalName: '',
    description: '',
    domain: '',
    teamSize: 1,
    startDate: initialStartDate,
    endDate: null,
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<InputValues>({
    values: initialValues,
  });

  const onSubmit: SubmitHandler<InputValues> = async values => {
    const { name, internalName, description, domain, startDate, endDate, teamSize } = values;
    try {
      await createProject({
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
      handleCloseModal();
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
        inputProps={{ min: 1 }}
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
            value={field.value}
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
        sx={{
          maxWidth: 720,
          position: 'absolute',
          top: '50%',
          right: '50%',
          transform: 'translate(50%,-50%)',
          background: '#ffffff',
          padding: '30px',
          borderRadius: '5px',
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        onReset={handleCloseModal}
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
          <Grid item xs={12} md={3} ml="auto">
            <Button type="reset" fullWidth>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button type="submit" variant="contained" disabled={!isDirty || loading} fullWidth>
              Create
            </Button>
          </Grid>
        </Grid>
      </Box>
      {error ? <InfoBar text={error.message} status="error" /> : null}
      {data !== undefined ? <InfoBar text="Project added successfully" status="success" /> : null}
    </>
  );
}
