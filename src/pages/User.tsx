import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import last from 'lodash/last';
import capitalize from 'lodash/capitalize';
import routes from '../constants/routes';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BreadcrumbsNav from '../components/BreadcrumbsNav';
import LinkTab from '../components/LinkTab';

export default function Profile() {
  const user = useTypedSelector(state => state.auth.currentUser!);
  const { pathname } = useLocation();

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
        <Tabs sx={{ color: 'text.primary' }} value={currentTab}>
          <LinkTab route={routes.employee(user.id)} label="Profile" value="profile" />
          <LinkTab route={routes.employeeSkills(user.id)} label="Skills" value="skills" />
          <LinkTab route={routes.employeeLanguages(user.id)} label="Languages" value="languages" />
          <LinkTab route={routes.employeeCv(user.id)} label="CVs" value="cvs" />
        </Tabs>

        <Outlet />
      </Box>
    </>
  );
}
