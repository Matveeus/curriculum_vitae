import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar } from '@mui/material';
import { MenuItemData, MoreMenu } from '../MoreMenu';

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  format?: (value: number) => string;
}

interface Row {
  id: string;
}

interface InitialTableProps {
  columns: Column[];
  rows: Row[];
}

export function InitialTable({ columns, rows }: InitialTableProps) {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '80vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow key="header-row">
              {columns.map(column => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth }} align={column.align || 'center'}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const cellValue = row[column.id as keyof Row];
                    return (
                      <TableCell key={column.id} align={column.align || 'center'}>
                        {column.id === 'avatar' ? (
                          <Avatar src={cellValue} alt="avatar">
                            {cellValue}
                          </Avatar>
                        ) : column.id === 'menuItems' ? (
                          Array.isArray(cellValue) ? (
                            <MoreMenu menuItems={cellValue as MenuItemData[]} />
                          ) : (
                            cellValue
                          )
                        ) : (
                          cellValue
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
