import React from 'react';
import Search from '../components/Search';
import EmployeesTable from '../components/tables/EmployeesTable';

export default function Employees() {
  return (
    <>
      <Search />
      <EmployeesTable />
    </>
  );
}
