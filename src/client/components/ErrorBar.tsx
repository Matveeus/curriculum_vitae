import * as React from 'react';
import { Alert, Snackbar } from '@mui/material';

interface ErrorBarProps {
  error: string | null;
  setError: (error: string | null) => void;
}

export default function ErrorBar({ error, setError }: ErrorBarProps) {
  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={() => setError(null)}>
      <Alert severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
}
