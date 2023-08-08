import React from 'react';
import FolderIcon from '@mui/icons-material/FolderCopyOutlined';
import { BreadcrumbsNav, Loader } from '../components';
import routes from '../constants/routes';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../apollo/operations';
import InfoBar from '../components/InfoBar';
import ProjectDetailsForm from '../components/forms/Projects/ProjectDetailsForm';

export default function ProjectDetails() {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_PROJECT, { variables: { id } });
  const project = data?.project;

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
      <ProjectDetailsForm project={project} />
      {error ? <InfoBar text={error.message} status="error" /> : null}
    </>
  );
}
