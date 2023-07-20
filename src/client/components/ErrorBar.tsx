import React, { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { ApolloError } from '@apollo/client';

interface ErrorBarProps {
  error: ApolloError | undefined;
}

export default function ErrorBar({ error }: ErrorBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(error !== undefined);

    if (error !== undefined) {
      const timeoutId = setTimeout(() => {
        setIsOpen(false);
      }, 6000);

      return () => {
        clearTimeout(timeoutId);
      };
    }

    return undefined;
  }, [error]);

  return (
    <Snackbar open={isOpen} autoHideDuration={6000}>
      <Alert severity="error" sx={{ width: '100%' }}>
        {error?.message}
      </Alert>
    </Snackbar>
  );
}
