import React from 'react';
import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps {
  onSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Search({ onSearchInputChange }: SearchProps) {
  return (
    <TextField
      sx={{ mt: 2, mb: 2, maxWidth: '320px' }}
      fullWidth
      id="standard-bare"
      variant="outlined"
      placeholder="Search"
      onChange={onSearchInputChange}
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
