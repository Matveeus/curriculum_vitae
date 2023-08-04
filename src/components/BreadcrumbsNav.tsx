import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import routes from '../constants/routes';
import type { LinkProps } from '@mui/material';

interface BreadcrumbsLink {
  text: string;
  color?: string;
  route?: string;
  icon?: React.ReactElement;
}

interface BreadcrumbsNavProps {
  paths: BreadcrumbsLink[];
}

interface NavLinkProps extends LinkProps {
  route: string;
}

function NavLink({ route, ...props }: NavLinkProps) {
  return (
    <Link
      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      component={RouterLink}
      to={route}
      color="inherit"
      underline="hover"
      {...props}
    />
  );
}

export default function BreadcrumbsNav({ paths }: BreadcrumbsNavProps) {
  return (
    <Breadcrumbs sx={{ px: 4 }} separator={<KeyboardArrowRightIcon fontSize="small" />}>
      <NavLink route={routes.employees()}>
        <HomeOutlinedIcon /> Home
      </NavLink>

      {paths.map(({ text, color, route, icon }, index) => {
        const linkInner = icon ? [icon, text] : text;

        return route ? (
          <NavLink route={route} color={color || 'inherit'} key={index}>
            {linkInner}
          </NavLink>
        ) : (
          <Typography color="text.primary" key={index}>
            {linkInner}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
}
