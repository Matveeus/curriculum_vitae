import React from 'react';
import Box from '@mui/material/Box';
import { useQuery } from '@apollo/client';
import { QueryResult } from './cvFormInterfaces';
import { GET_CV_LISTS } from '../../../apollo/operations';
import InfoBar from '../../InfoBar';
import { Loader } from '../../index';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

interface CvFormProps {
  handleCloseModal: () => void;
}

export default function CvCreationForm({ handleCloseModal }: CvFormProps) {
  const { loading, error } = useQuery<QueryResult>(GET_CV_LISTS);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Box>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleCloseModal} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Cv creation
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      {error ? <InfoBar text={error.message} status="error" /> : null}
    </>
  );
}
