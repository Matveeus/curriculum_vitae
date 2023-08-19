import React, { useEffect } from 'react';
import FolderIcon from '@mui/icons-material/FolderCopyOutlined';
import { BreadcrumbsNav, Loader } from '../components';
import routes from '../constants/routes';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../apollo/operations';
import InfoBar from '../components/InfoBar';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { addProject, projectsSelectors } from '../store/projectsSlice';
import { useTypedDispatch } from '../hooks/useTypedDispatch';

export default function ProjectDetails() {
  const dispatch = useTypedDispatch();
  const { id } = useParams();
  const storedProject = useTypedSelector(state => projectsSelectors.selectById(state, id as string));
  const { data, error, loading } = useQuery(GET_PROJECT, { variables: { id }, skip: !!storedProject });
  const project = storedProject || data?.project;

  useEffect(() => {
    if (data) {
      dispatch(addProject(data?.project));
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
      {error ? <InfoBar text={error.message} status="error" /> : null}
    </>
  );
}
