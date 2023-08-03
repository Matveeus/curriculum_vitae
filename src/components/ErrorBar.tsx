import React, { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

interface ErrorBarProps {
  error: string;
}

export default function ErrorBar({ error }: ErrorBarProps) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity="error">{error}</Alert>
    </Snackbar>
  );
}
