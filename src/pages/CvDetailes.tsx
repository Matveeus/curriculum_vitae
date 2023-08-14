import React from 'react';
import routes from '../constants/routes';
import { BreadcrumbsNav } from '../components';

export default function ProjectDetails() {
  return (
    <>
      <BreadcrumbsNav paths={[{ text: 'CVs', route: routes.projects() }]} />
    </>
  );
}
