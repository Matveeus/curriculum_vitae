import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthSwitch from './AuthSwitch';
import { Loader, ErrorBar } from '../';
import { useAuthUser } from '../../hooks/useAuthUser';
import routes from '../../constants/routes';

interface AuthFormProps {
  buttonTitle: string;
  title: string;
}

export default function AuthForm({ buttonTitle, title }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordRepeat] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { handleRegistration, handleLogin } = useAuthUser();

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
  } = useForm({ mode: 'onSubmit' });

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (title === 'Sign in') {
        const { error } = await handleLogin(email, password);
        if (error) {
          setErr(error);
        }
      } else {
        const { error } = await handleRegistration(email, password);
        if (error) {
          setErr(error);
        }
      }
    } catch (err) {
      setErr(err.message);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container
        maxWidth="sm"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Box
          sx={{
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
          <ErrorBar error={err} setError={setErr} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {buttonTitle}
          </Button>
        </Box>
        <AuthSwitch
          text={title === 'Sign in' ? "Don't have an account? Register!" : 'Already have an account? Sign In!'}
          href={title === 'Sign in' ? routes.register() : routes.login()}
        />
      </Container>
    </form>
  );
}
