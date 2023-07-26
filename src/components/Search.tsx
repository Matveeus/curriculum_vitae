import React from 'react';
import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
  return (
    <TextField
      sx={{ mt: 2, mb: 2, maxWidth: '320px' }}
      fullWidth
      id="standard-bare"
      variant="outlined"
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <IconButton>
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
}
