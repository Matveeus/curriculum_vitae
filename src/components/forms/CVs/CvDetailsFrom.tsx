import React from 'react';
import type { Cv, Language, Skill } from '../../../apollo/types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Controller, SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import Button from '@mui/material/Button';
import { useQuery } from '@apollo/client';
import { GET_CV_LISTS } from '../../../apollo/operations';
import { Loader } from '../../index';
import MenuItem from '@mui/material/MenuItem';
import { InputValues } from './cvFormInterfaces';
import Typography from '@mui/material/Typography';
import InfoBar from '../../InfoBar';
import Divider from '@mui/material/Divider';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const {
    remove: removeLanguage,
    append: appendLanguage,
    fields: languageFields,
  } = useFieldArray({
    control,
    name: 'languages',
  });

  const {
    remove: removeSkill,
    append: appendSkill,
    fields: skillFields,
  } = useFieldArray({
    control,
    name: 'skills',
  });

  const handleAddLanguage = () => {
    appendLanguage({ language_name: '', proficiency: '' });
  };

  const handleAddSkill = () => {
    appendSkill({ skill_name: '', mastery: '' });
  };

  const handleRemoveLanguage = (languageIndex: number) => {
    removeLanguage(languageIndex);
  };

  const handleRemoveSkill = (skillIndex: number) => {
    removeSkill(skillIndex);
  };

  const renderLanguageFields = () => {
    return languageFields.map((language, index) => (
      <Box key={language.id} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 3 }}>
        <Button onClick={() => handleRemoveLanguage(index)} variant="outlined">
          <DeleteForeverIcon />
        </Button>
        <Controller
          name={`languages.${index}.language_name`}
          control={control}
          defaultValue={language.language_name}
          rules={{ required: 'Language is required' }}
          render={({ field }) => (
            <TextField
              sx={{ width: '55%' }}
              select
              label="Language"
              fullWidth
              {...field}
              error={!!errors.languages?.[index]?.language_name}
              helperText={errors.languages?.[index]?.language_name?.message}
            >
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
          defaultValue={language.proficiency}
          rules={{ required: 'Proficiency is required' }}
          render={({ field }) => (
            <TextField
              sx={{ width: '23%' }}
              select
              label="Proficiency"
              fullWidth
              {...field}
              error={!!errors.languages?.[index]?.proficiency}
              helperText={errors.languages?.[index]?.proficiency?.message}
            >
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
    return skillFields.map((skill, index) => (
      <Box key={skill.id} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 3 }}>
        <Button onClick={() => handleRemoveSkill(index)} variant="outlined">
          <DeleteForeverIcon />
        </Button>
        <Controller
          name={`skills.${index}.skill_name`}
          control={control}
          defaultValue={skill.skill_name}
          rules={{ required: 'Skill is required' }}
          render={({ field }) => (
            <TextField
              sx={{ width: '55%' }}
              select
              label="Skill"
              fullWidth
              {...field}
              error={!!errors.skills?.[index]?.skill_name}
              helperText={errors.skills?.[index]?.skill_name?.message}
            >
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
          defaultValue={skill.mastery}
          rules={{ required: 'Mastery is required' }}
          render={({ field }) => (
            <TextField
              sx={{ width: '23%' }}
              select
              label="Mastery"
              fullWidth
              {...field}
              error={!!errors.skills?.[index]?.mastery}
              helperText={errors.skills?.[index]?.mastery?.message}
            >
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
          <Button variant="outlined" onClick={handleAddLanguage} fullWidth sx={{ mt: 3 }}>
            Add Language
          </Button>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ width: '32%' }}>
          <Typography variant="h6">Skills</Typography>
          {renderSkillFields()}
          <Button variant="outlined" onClick={handleAddSkill} fullWidth sx={{ mt: 3 }}>
            Add Skill
          </Button>
        </Box>
      </Box>
      {error ? <InfoBar text={error.message} status="error" /> : null}
    </>
  );
}
