import React from 'react';
import type { Cv, Language, Skill } from '../../../apollo/types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { useQuery } from '@apollo/client';
import { GET_CV_LISTS } from '../../../apollo/operations';
import { Loader } from '../../index';
import MenuItem from '@mui/material/MenuItem';
import { InputValues } from './cvFormInterfaces';
import Typography from '@mui/material/Typography';
import InfoBar from '../../InfoBar';
import Divider from '@mui/material/Divider';

interface CvFormProps {
  cv: Cv;
}

interface QueryResult {
  languages: Language[];
  skills: Skill[];
}

export default function CvDetailsForm({ cv }: CvFormProps) {
  const { loading, error, data } = useQuery<QueryResult>(GET_CV_LISTS);
  const allLanguages = data?.languages ?? [];
  const allSkills = data?.skills ?? [];
  const proficienciesList = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2', 'native'];
  const masteryList = ['novice', 'advanced', 'competent', 'proficient', 'expert'];

  const initialValues = {
    name: cv.name ?? '',
    description: cv.description ?? '',
    languages: cv.languages ?? [],
    skills: cv.skills ?? [],
  };

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: initialValues,
  });

  const renderLanguageFields = () => {
    return initialValues.languages.map((language, index) => (
      <Box key={language.language_name} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 3 }}>
        <Controller
          name={`languages.${index}.language_name`}
          control={control}
          render={({ field }) => (
            <TextField sx={{ width: '70%' }} select label="Language" fullWidth {...field}>
              {allLanguages.map(({ id, name }) => (
                <MenuItem value={name} key={id}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name={`languages.${index}.proficiency`}
          control={control}
          render={({ field }) => (
            <TextField sx={{ width: '27%' }} select label="Proficiency" fullWidth {...field}>
              {proficienciesList.map(proficiency => (
                <MenuItem value={proficiency} key={proficiency}>
                  {proficiency}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>
    ));
  };

  const renderSkillFields = () => {
    return initialValues.languages.map((language, index) => (
      <Box key={language.language_name} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 3 }}>
        <Controller
          name={`skills.${index}.skill_name`}
          control={control}
          render={({ field }) => (
            <TextField sx={{ width: '70%' }} select label="Skill" fullWidth {...field}>
              {allSkills.map(({ id, name }) => (
                <MenuItem value={name} key={id}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name={`skills.${index}.mastery`}
          control={control}
          render={({ field }) => (
            <TextField sx={{ width: '27%' }} select label="Mastery" fullWidth {...field}>
              {masteryList.map(mastery => (
                <MenuItem value={mastery} key={mastery}>
                  {mastery}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>
    ));
  };

  const onSubmit: SubmitHandler<InputValues> = async values => {
    console.log(values);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mt: '50px' }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={{ width: '32%' }}>
          <Typography variant="h6">General info</Typography>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <TextField sx={{ mt: 3 }} label="Name" fullWidth {...field} />}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField sx={{ mt: 3 }} label="Description" fullWidth multiline rows={3} {...field} />
            )}
          />
          <Button sx={{ mt: 3 }} type="submit" variant="contained" disabled={!isDirty} fullWidth>
            Update
          </Button>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ width: '32%' }}>
          <Typography variant="h6">Languages</Typography>
          {renderLanguageFields()}
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ width: '32%' }}>
          <Typography variant="h6">Skills</Typography>
          {renderSkillFields()}
        </Box>
      </Box>
      {error ? <InfoBar text={error.message} status="error" /> : null}
    </>
  );
}
