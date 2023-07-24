import React from 'react';
import { Typography } from '@mui/material';
import useRequireUser from '../hooks/useRequireUser';

const Home = () => {
  useRequireUser();
  return (
    <Typography variant="h4" sx={{ textAlign: 'center' }}>
      Curriculum Vitae !
    </Typography>
  );
};

export default Home;
