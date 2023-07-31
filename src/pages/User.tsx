import React from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import last from 'lodash/last';
import capitalize from 'lodash/capitalize';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_SELECT_LISTS } from '../apollo/operations';
import routes from '../constants/routes';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BreadcrumbsNav from '../components/BreadcrumbsNav';
import LinkTab from '../components/LinkTab';
import Loader from '../components/Loader';

export default function User() {
  const { id } = useParams();
  const userQuery = useQuery(GET_USER, { variables: { id } });
  const listsQuery = useQuery(GET_SELECT_LISTS);
  const { pathname } = useLocation();

  const loading = userQuery.loading || listsQuery.loading;

  if (loading) {
    return <Loader />;
  }

  const { user } = userQuery.data;
  const { departments, positions } = listsQuery.data;
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
    </>
  );
}
