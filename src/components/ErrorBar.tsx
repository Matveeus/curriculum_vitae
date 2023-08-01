import React from 'react';
import Alert from '@mui/material/Alert';

interface ErrorBarProps {
  error: string | null;
  setError: (error: string | null) => void;
}

export default function ErrorBar({ error, setError }: ErrorBarProps) {
  return (
    error && (
      <Alert severity="error" onClose={() => setError(null)} sx={{ width: '94%' }}>
        {error}
      </Alert>
    )
  );
}
