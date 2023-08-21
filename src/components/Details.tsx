import React from 'react';
import capitalize from 'lodash/capitalize';
import startCase from 'lodash/startCase';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import type { BoxProps } from '@mui/material/Box';
import type { TypographyProps } from '@mui/material/Typography';

type DetailsProps = BoxProps & {
  entity: object;
};

interface EnumerationProps {
  list: string[];
}

const Enumeration = ({ list }: EnumerationProps) => (
  <Stack direction="row" spacing={1}>
    {list.map(val => (
      <Chip sx={{ fontSize: '1.5rem' }} key={val} label={val} variant="outlined" color="primary" />
    ))}
  </Stack>
);

const Text = (props: TypographyProps) => <Typography component="span" fontSize="1.5rem" {...props} />;

export default function Details({ entity, ...props }: DetailsProps) {
  return (
    <Box width={1} maxWidth={0.7} margin="auto" bgcolor="background.paper" {...props}>
      <List>
        {Object.entries(entity).map(([key, value]) => (
          <ListItem key={key}>
            <ListItemText
              sx={{ display: 'flex', gap: 1 }}
              disableTypography
              primary={
                <>
                  <Text>{capitalize(startCase(key))}:</Text>
                  {Array.isArray(value) ? <Enumeration list={value} /> : <Text color="primary">{value}</Text>}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
