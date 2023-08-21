import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import omit from 'lodash/omit';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../apollo/operations';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { addProject, projectsSelectors } from '../store/projectsSlice';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import routes from '../constants/routes';
import FolderIcon from '@mui/icons-material/FolderCopyOutlined';
import { BreadcrumbsNav, Loader, InfoBar, Details } from '../components';
import type { Project } from '../apollo/types';

interface QueryResult {
  project: Project;
}

export default function ProjectDetails() {
  const { id } = useParams();
  const dispatch = useTypedDispatch();
  const storedProject = useTypedSelector(state => projectsSelectors.selectById(state, id as string));
  const { data, error, loading } = useQuery<QueryResult>(GET_PROJECT, {
    variables: { id },
    skip: !!storedProject,
  });

  const project = (storedProject || data?.project) as Project;

  useEffect(() => {
    if (data) {
      dispatch(addProject(data.project));
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <BreadcrumbsNav
        paths={[
          { text: 'Projects', route: routes.projects() },
          { icon: <FolderIcon />, text: project?.name, route: routes.project(project?.id) },
        ]}
      />
      <Details entity={omit(project, 'id')} mt={4} />
      {error ? <InfoBar text={error.message} status="error" /> : null}
    </>
  );
}
