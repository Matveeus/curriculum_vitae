import React, { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

interface ErrorBarProps {
  error: string | null;
  setError: (error: string | null) => void;
}

export default function ErrorBar({ error, setError }: ErrorBarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const handleClose = () => {
    setError(null);
    setOpen(false);
  };
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity="error">{error}</Alert>
    </Snackbar>
  );
}
