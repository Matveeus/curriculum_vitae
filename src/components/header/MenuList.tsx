import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface MenuListItem {
  icon: React.ReactElement;
  text: string;
  route: string;
}

interface MenuListProps {
  items: MenuListItem[];
}

export default function MenuList({ items }: MenuListProps) {
  return (
    <List disablePadding>
      {items.map(({ icon, text, route }) => (
        <ListItem key={text} disablePadding>
          <ListItemButton component={Link} to={route}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
