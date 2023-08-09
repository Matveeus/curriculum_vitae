import React, { useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import last from 'lodash/last';
import capitalize from 'lodash/capitalize';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_SELECT_LISTS } from '../apollo/operations';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { usersSelectors } from '../store/usersSlice';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { addUser } from '../store/usersSlice';
import routes from '../constants/routes';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { InfoBar, Loader, LinkTab, BreadcrumbsNav } from '../components';
import type { User, Department, Position } from '../apollo/types';

interface UserQueryResult {
  user: User;
}

interface ListsQueryResult {
  departments: Department[];
  positions: Position[];
}

export default function User() {
  const { id } = useParams();
  const storedUser = useTypedSelector(state => usersSelectors.selectById(state, id as string));
  const listsQuery = useQuery<ListsQueryResult>(GET_SELECT_LISTS);
  const userQuery = useQuery<UserQueryResult>(GET_USER, {
    variables: { id },
    skip: !!storedUser,
  });
  const { pathname } = useLocation();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (userQuery.data) {
      dispatch(addUser(userQuery.data.user));
    }
  }, [userQuery.data]);

  const loading = userQuery.loading || listsQuery.loading;
  const error = userQuery.error || listsQuery.error;

  if (loading) {
    return <Loader />;
  }

  const user = (storedUser || userQuery.data?.user) as User;
  const departments = listsQuery.data?.departments ?? [];
  const positions = listsQuery.data?.positions ?? [];
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

      {error ? <InfoBar text={error.message} status="error" /> : null}
    </>
  );
}
