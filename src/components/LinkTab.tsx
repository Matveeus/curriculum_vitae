import React from 'react';
import { Link } from 'react-router-dom';
import Tab from '@mui/material/Tab';

interface LinkTabProps {
  route: string;
  label: string;
  value: string;
}

export default function LinkTab({ route, ...props }: LinkTabProps) {
  return <Tab sx={{ minWidth: 150, color: 'inherit' }} component={Link} to={route} {...props} />;
}
