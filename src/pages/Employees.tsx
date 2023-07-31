import React from 'react';
import { EmployeesTable } from '../components/tables/EmployeesTable';
import BreadcrumbsNav from '../components/BreadcrumbsNav';

export default function Employees() {
  return (
    <>
      <BreadcrumbsNav paths={[{ text: 'Employees', route: '' }]} />
      <EmployeesTable />
    </>
  );
}
