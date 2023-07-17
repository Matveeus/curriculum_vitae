import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

export default function AuthSwitch({ text, href }: { text: string; href: string }) {
  return (
    <Link to={href} style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
      <Typography sx={{ color: 'primary.main', marginTop: '20px' }}>{text}</Typography>
    </Link>
  );
}
