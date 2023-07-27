import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from '../components/header/Header';

export default function App() {
  return (
    <>
      <Header />
      <Box sx={{ py: 3 }} component="main">
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </>
  );
}
