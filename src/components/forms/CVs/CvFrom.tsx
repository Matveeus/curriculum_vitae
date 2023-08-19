import React from 'react';
import type { Cv } from '../../../apollo/types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_CV, GET_CV_LISTS, UPDATE_CV } from '../../../apollo/operations';
import { Loader } from '../../index';
import MenuItem from '@mui/material/MenuItem';
import { InputValues, QueryResult } from './cvFormInterfaces';
import Typography from '@mui/material/Typography';
import InfoBar from '../../InfoBar';
import Divider from '@mui/material/Divider';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useTypedDispatch } from '../../../hooks/useTypedDispatch';
import { updateCv, addCv } from '../../../store/cvsSlice';
import { masteryList, proficienciesList } from '../../../constants/cvConsts';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

export type FormType = 'create' | 'update';

interface CvFormProps {
  cv: Cv | null;
  type: FormType;
  onReset: () => void;
}

export default function CvDetailsForm({ type, cv, onReset }: CvFormProps) {
  const dispatch = useTypedDispatch();
  const [update, { loading: updateLoading, error: updateError, data: updateData }] = useMutation(UPDATE_CV);
  const [create, { loading: addLoading, error: addError, data: addData }] = useMutation(CREATE_CV);
  const { loading, error, data } = useQuery<QueryResult>(GET_CV_LISTS);
  const allLanguages = data?.languages ?? [];
  const allSkills = data?.skills ?? [];
  const currentUser = useTypedSelector(state => state.auth.currentUser);

  const initialValues = {
    name: cv?.name ?? '',
    description: cv?.description ?? '',
    languages: cv?.languages ?? [],
    skills: cv?.skills ?? [],
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

  const onUpdate: SubmitHandler<InputValues> = async values => {
    const { name, description, languages, skills } = values;
    try {
      await update({
        variables: {
          id: cv?.id,
          cv: {
            name: name,
            description: description,
            skills: skills,
            languages: languages,
            projectsIds: cv?.projects?.map(project => project.id) ?? [],
            is_template: true,
          },
        },
      });
      dispatch(
        updateCv({
          id: cv!.id,
          changes: {
            name: name,
            description: description,
            skills: skills,
            languages: languages,
          },
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onCreate: SubmitHandler<InputValues> = async values => {
    const { name, description, languages, skills } = values;
    try {
      const { data } = await create({
        variables: {
          cv: {
            name: name,
            description: description,
            userId: currentUser?.id,
            skills: skills,
            languages: languages,
            projectsIds: [],
            is_template: true,
          },
        },
      });
      const cv = data.createCv;
      dispatch(addCv(cv));
    } catch (error) {
      console.error(error);
    }
  };

  const handlers = {
    create: onCreate,
    update: onUpdate,
  };

  if (loading || updateLoading || addLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mt: '50px' }}
        component="form"
        onSubmit={handleSubmit(handlers[type])}
        onReset={onReset}
      >
        <Box sx={{ width: '32%' }}>
          <Typography variant="h6">General info</Typography>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <TextField
                sx={{ mt: 3 }}
                label="Name"
                fullWidth
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <TextField
                sx={{ mt: 3 }}
                label="Description"
                fullWidth
                multiline
                rows={3}
                {...field}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
          <Button sx={{ mt: 3 }} type="submit" variant="contained" disabled={!isDirty || loading} fullWidth>
            {type}
          </Button>
          <Button sx={{ mt: 3 }} type="reset" variant="outlined" fullWidth>
            exit
          </Button>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ width: '32%' }}>
          <Typography variant="h6">Languages</Typography>
          {languageFields ? renderLanguageFields() : null}
          <Button variant="outlined" onClick={handleAddLanguage} fullWidth sx={{ mt: 3 }}>
            Add Language
          </Button>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ width: '32%' }}>
          <Typography variant="h6">Skills</Typography>
          {skillFields ? renderSkillFields() : null}
          <Button variant="outlined" onClick={handleAddSkill} fullWidth sx={{ mt: 3 }}>
            Add Skill
          </Button>
        </Box>
      </Box>
      {error ? <InfoBar text={error.message} status="error" /> : null}
      {updateError ? <InfoBar text={updateError.message} status="error" /> : null}
      {addError ? <InfoBar text={addError.message} status="error" /> : null}
      {updateData ? <InfoBar text="CV updated successfully" status="success" /> : null}
      {addData ? <InfoBar text="CV created successfully" status="success" /> : null}
    </>
  );
}
