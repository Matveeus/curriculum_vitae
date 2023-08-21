import React, { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

interface ErrorBarProps {
  text: string | undefined;
  status: 'success' | 'info' | 'warning' | 'error';
}

export default function InfoBar({ text, status }: ErrorBarProps) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity={status}>{text}</Alert>
    </Snackbar>
  );
}
