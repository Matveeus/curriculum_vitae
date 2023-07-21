import React from 'react';
import { Typography } from '@mui/material';
import useRequireAuth from '../hooks/useRequireAuth';

const Home = () => {
  useRequireAuth();
  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        Curriculum Vitae !
      </Typography>
    </div>
  );
};

export default Home;
