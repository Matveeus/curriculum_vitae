import { createTheme } from '@mui/material';
import { red, grey } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: red[800],
    },
    background: {
      default: grey[100],
    },
  },
});
