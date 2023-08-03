import React from 'react';
import { BreadcrumbsNav, CVsTable } from '../components';

export default function Cvs() {
  return (
    <>
      <BreadcrumbsNav paths={[{ text: 'CVs' }]} />
      <CVsTable />
    </>
  );
}
