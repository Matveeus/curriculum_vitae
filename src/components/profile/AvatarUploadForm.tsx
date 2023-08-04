import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import UploadIcon from '@mui/icons-material/FileUploadOutlined';

export default function AvatarUploadForm() {
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  return (
    <Box sx={{ m: 'auto' }} component="form">
      <InputLabel sx={{ cursor: 'pointer' }} htmlFor="avatar-upload">
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            color: 'text.primary',
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          <UploadIcon fontSize="large" /> Upload avatar image
        </Typography>
        <Typography>png, jpg or gif no more than 0.5MB</Typography>
      </InputLabel>
      <Input
        sx={{ display: 'none' }}
        id="avatar-upload"
        type="file"
        inputProps={{ accept: '.png, .jpeg, .jpg, .gif' }}
        onChange={handleAvatarUpload}
      />
    </Box>
  );
}
