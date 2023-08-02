import React, { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

interface ErrorBarProps {
  error: string | null;
}

export default function ErrorBar({ error }: ErrorBarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity="error">{error}</Alert>
    </Snackbar>
  );
}
