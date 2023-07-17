import React, { useState } from 'react';
import AuthForm from './AuthForm';
import Loader from '../Loader';

export default function Register() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AuthForm
      handleFormSubmit={handleSubmit}
      error={error}
      setError={setError}
      buttonTitle="register"
      title="Registration"
    />
  );
}
