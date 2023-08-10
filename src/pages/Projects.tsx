import React, { useEffect } from 'react';
import { BreadcrumbsNav, Loader, ProjectsTable } from '../components';
import { useLazyQuery } from '@apollo/client';
import { Project } from '../apollo/types';
import { GET_PROJECTS } from '../apollo/operations';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { projectsSelectors, setProjects } from '../store/projectsSlice';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import InfoBar from '../components/InfoBar';

export default function Projects() {
  const dispatch = useTypedDispatch();
  const projects = useTypedSelector(projectsSelectors.selectAll);
  const [getProjects, { loading, error, data }] = useLazyQuery<{ projects: Project[] }>(GET_PROJECTS);

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setProjects(data.projects));
    }
  }, [data]);

  const dataExist = projects.length > 0;

  if (loading && !dataExist) {
    return <Loader />;
  }

  return (
    <>
      <BreadcrumbsNav paths={[{ text: 'Projects' }]} />
      <ProjectsTable projects={projects} />
      {error && !dataExist ? <InfoBar text={error.message} status="error" /> : null}
    </>
  );
}
