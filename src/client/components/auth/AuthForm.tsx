import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import AuthSwitch from './AuthSwitch';
import ErrorBar from '../ErrorBar';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface AuthFormProps {
  error: string | null;
  setError: (error: string | null) => void;
  buttonTitle: string;
  title: string;
  handleFormSubmit: () => void;
}

export default function AuthForm({ handleFormSubmit, error, setError, buttonTitle, title }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordRepeat] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordRepeat(e.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const renderPasswordField = () => (
    <TextField
      {...register('password', {
        required: 'Wrong password',
        minLength: { value: 6, message: 'Enter 6+ symbols' },
      })}
      name="password"
      error={!!errors?.password}
      helperText={errors?.password && (errors?.password.message as string)}
      margin="normal"
      fullWidth
      label="Password"
      type={showPassword ? 'text' : 'password'}
      id="password"
      onChange={handlePasswordChange}
      value={password}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );

  const renderPasswordConfirmField = () => (
    <TextField
      {...register('passwordConfirm', {
        required: 'Password and password confirmation do not match',
        validate: value => value === password,
      })}
      name="passwordConfirm"
      error={!!errors?.passwordConfirm}
      helperText={errors?.passwordConfirm && 'Password and password confirmation do not match'}
      margin="normal"
      fullWidth
      label="Repeat password"
      type={showPassword ? 'text' : 'password'}
      id="passwordConfirm"
      onChange={handlePasswordConfirmChange}
      value={passwordConfirm}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '2px solid',
          borderColor: 'primary.main',
          borderRadius: '10px',
          padding: '20px',
        }}
      >
        <Typography component="h1" variant="h5" color={'black'} sx={{ padding: '10px 0' }}>
          {title}
        </Typography>
        <TextField
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address',
            },
          })}
          name="email"
          error={!!errors?.email}
          helperText={!!errors?.email && (errors?.email?.message as string)}
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          onChange={handleEmailChange}
          value={email}
        />
        {renderPasswordField()}
        {title === 'Registration' && renderPasswordConfirmField()}
        <Button
          onClick={handleSubmit(handleFormSubmit)}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {buttonTitle}
        </Button>
      </Box>
      <AuthSwitch
        text={title === 'Sign in' ? "Don't have an account? Register!" : 'Already have an account? Sign In!'}
        href={title === 'Sign in' ? '/register' : '/login'}
      />
      <ErrorBar error={error} setError={setError} />
    </Container>
  );
}
