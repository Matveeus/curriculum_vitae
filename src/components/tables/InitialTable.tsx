import React, { useMemo } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Avatar from '@mui/material/Avatar';
import { Search, MoreMenu } from '../';
import { sortRows, filterRows } from '../../utils';
import type { MenuItemData } from '../MoreMenu';
import ErrorBar from '../ErrorBar';

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  format?: (value: number) => string;
  searchable?: boolean;
}

export interface Row {
  id: string;
}

interface InitialTableProps {
  columns: Column[];
  rows: Row[];
  error?: string;
}

export type Order = 'asc' | 'desc';

export default function InitialTable({ columns, rows, error }: InitialTableProps) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('');
  const [searchInput, setSearchInput] = React.useState('');

  const handleRequestSort = (property: string) => {
    const columnToSort = columns.find(column => column.id === property);

    if (columnToSort) {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    }
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value.toLowerCase());
  };

  const sortedRows = useMemo(() => sortRows(rows, orderBy, order, columns), [order, orderBy, rows, columns]);

  const filteredRows = useMemo(() => filterRows(sortedRows, searchInput, columns), [searchInput, sortedRows, columns]);

  return (
    <>
      <Search onSearchInputChange={handleSearchInputChange} />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '70vh' }}>
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
              {filteredRows.map(row => {
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
      <ErrorBar error={error || ''} />
    </>
  );
}
