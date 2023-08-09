import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps {
  onSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Search({ onSearchInputChange }: SearchProps) {
  return (
    <TextField
      sx={{ maxWidth: '320px' }}
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
