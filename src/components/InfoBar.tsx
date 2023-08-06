import React, { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

interface ErrorBarProps {
  text: string;
  status: string;
}

type AlertColor = 'success' | 'info' | 'warning' | 'error';

const getStatusAsColor = (status: string): AlertColor => {
  switch (status) {
    case 'success':
      return 'success';
    case 'info':
      return 'info';
    case 'warning':
      return 'warning';
    case 'error':
      return 'error';
    default:
      return 'info';
  }
};

export default function InfoBar({ text, status }: ErrorBarProps) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const alertColor: AlertColor = getStatusAsColor(status);

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity={alertColor}>{text}</Alert>
    </Snackbar>
  );
}
