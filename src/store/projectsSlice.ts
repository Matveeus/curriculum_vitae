import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { State } from './';
import type { Project } from '../apollo/types';

const projectsAdapter = createEntityAdapter<Project>();

const projectsSlice = createSlice({
  name: 'projects',
  initialState: projectsAdapter.getInitialState(),
  reducers: {
    setProjects: projectsAdapter.setAll,
    addProject: projectsAdapter.addOne,
    updateProject: projectsAdapter.updateOne,
    deleteProject: projectsAdapter.removeOne,
  },
});

export const projectsSelectors = projectsAdapter.getSelectors<State>(state => state.projects);
export const { setProjects, addProject, updateProject, deleteProject } = projectsSlice.actions;
export default projectsSlice.reducer;
