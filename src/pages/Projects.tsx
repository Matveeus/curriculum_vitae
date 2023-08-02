import React from 'react';
import { BreadcrumbsNav, ProjectsTable } from '../components';

export default function Projects() {
  return (
    <>
      <BreadcrumbsNav paths={[{ text: 'Projects' }]} />
      <ProjectsTable />
    </>
  );
}
