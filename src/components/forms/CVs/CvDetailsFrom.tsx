import React from 'react';
import { Cv } from '../../../apollo/types';
import Box from '@mui/material/Box';

interface CvFormProps {
  cv: Cv;
}

export default function CvDetailsForm({ cv }: CvFormProps) {
  return <Box>{cv.name}</Box>;
}
