import React from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { usersSelectors } from '../store/usersSlice';
import { BreadcrumbsNav, EmployeesTable } from '../components';

export default function Employees() {
  const users = useTypedSelector(usersSelectors.selectAll);

  return (
    <>
      <BreadcrumbsNav paths={[{ text: 'Employees' }]} />
      <EmployeesTable users={users} />
    </>
  );
}
