import React from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import last from 'lodash/last';
import capitalize from 'lodash/capitalize';
import { useQuery } from '@apollo/client';
import { GET_SELECT_LISTS } from '../apollo/operations';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { usersSelectors } from '../store/usersSlice';
import routes from '../constants/routes';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { ErrorBar, Loader, LinkTab, BreadcrumbsNav } from '../components';
import type { Department, Position } from '../apollo/types';

interface QueryResult {
  departments: Department[];
  positions: Position[];
}

export default function User() {
  const { id } = useParams();
  const user = useTypedSelector(state => usersSelectors.selectById(state, id as string))!;
  const { loading, error, data } = useQuery<QueryResult>(GET_SELECT_LISTS);
  const { pathname } = useLocation();

  if (loading) {
    return <Loader />;
  }

  const departments = data?.departments ?? [];
  const positions = data?.positions ?? [];
  const currentTab = last(pathname.split('/'));

  return (
    <>
      <Box mb={2}>
        <BreadcrumbsNav
          paths={[
            {
              text: 'Employees',
              route: routes.employees(),
            },
            {
              icon: <PersonOutlineIcon />,
              text: user.profile.full_name || user.email,
              color: 'primary',
              route: routes.employee(user.id),
            },
            {
              text: capitalize(currentTab),
            },
          ]}
        />
      </Box>

      <Box sx={{ px: 4 }}>
        <Tabs sx={{ mb: 8, color: 'text.primary' }} value={currentTab}>
          <LinkTab route={routes.employee(user.id)} label="Profile" value="profile" />
          <LinkTab route={routes.employeeSkills(user.id)} label="Skills" value="skills" />
          <LinkTab route={routes.employeeLanguages(user.id)} label="Languages" value="languages" />
          <LinkTab route={routes.employeeCv(user.id)} label="CVs" value="cvs" />
        </Tabs>

        <Outlet context={{ user, departments, positions }} />
      </Box>

      {error ? <ErrorBar error={error.message} /> : null}
    </>
  );
}
