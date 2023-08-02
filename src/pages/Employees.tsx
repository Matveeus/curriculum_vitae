import React from 'react';
import { BreadcrumbsNav, EmployeesTable } from '../components';

export default function Employees() {
  return (
    <>
      <BreadcrumbsNav paths={[{ text: 'Employees' }]} />
      <EmployeesTable />
    </>
  );
}
