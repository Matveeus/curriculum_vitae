import React, { useState, useRef } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface MenuItemData {
  text: string;
  onClick?: () => void;
  disabled: boolean;
}

interface MoreMenuProps {
  menuItems: MenuItemData[];
}

export default function MoreMenu({ menuItems }: MoreMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const handleMenuItemClick = (onClick?: () => void) => {
    closeMenu();
    if (onClick) onClick();
  };

  return (
    <>
      <IconButton ref={buttonRef} onClick={openMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        MenuListProps={{ sx: { minWidth: 200 } }}
        anchorEl={buttonRef.current}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        open={isOpen}
        onClose={closeMenu}
      >
        {menuItems.map(item => (
          <MenuItem key={item.text} onClick={() => handleMenuItemClick(item.onClick)} disabled={item.disabled}>
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
