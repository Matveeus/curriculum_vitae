import React from 'react';
import { BreadcrumbsNav } from '../components';
import ProjectsTable from '../components/tables/ProjectsTable';

export default function Projects() {
  return (
    <>
      <BreadcrumbsNav paths={[{ text: 'Projects' }]} />
      <ProjectsTable />
    </>
  );
}
