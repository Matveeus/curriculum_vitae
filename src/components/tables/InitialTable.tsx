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
import TableSortLabel from '@mui/material/TableSortLabel';

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

type Order = 'asc' | 'desc';

export function InitialTable({ columns, rows }: InitialTableProps) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('');

  const handleRequestSort = (property: string) => {
    const columnToSort = columns.find(column => column.id === property);

    if (columnToSort && columnToSort.label !== '') {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    }
  };

  const sortedRows = React.useMemo(() => {
    if (orderBy && order) {
      return rows.slice().sort((a, b) => {
        const columnToSort = columns.find(column => column.id === orderBy);

        if (!columnToSort) {
          return 0;
        }

        const aValue = a[orderBy as keyof Row];
        const bValue = b[orderBy as keyof Row];

        if (aValue === '' && bValue !== '') return 1;
        if (aValue !== '' && bValue === '') return -1;

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return order === 'asc' ? aValue - bValue : bValue - aValue;
        }

        return order === 'asc'
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });
    }

    return rows;
  }, [order, orderBy, rows, columns]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '80vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow key="header-row">
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                  align={column.align || 'center'}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  {column.label !== '' ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map(row => {
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
