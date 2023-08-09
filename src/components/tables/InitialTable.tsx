import React, { useMemo } from 'react';
import { Search, MoreMenu } from '../';
import { sortRows, filterRows } from '../../utils';
import type { MenuItemData } from '../MoreMenu';
import {
  Box,
  Avatar,
  TableSortLabel,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  Button,
} from '@mui/material';

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  searchable?: boolean;
  sortable?: boolean;
}

export interface Row {
  id: string;
}

interface InitialTableProps {
  columns: Column[];
  rows: Row[];
  openModal?: () => void;
  allowedToCreate?: boolean;
}

export type Order = 'asc' | 'desc';

export default function InitialTable({ columns, rows, openModal, allowedToCreate }: InitialTableProps) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('');
  const [searchInput, setSearchInput] = React.useState('');

  const handleRequestSort = (property: string) => {
    const columnToSort = columns.find(column => column.id === property);

    if (columnToSort && columnToSort.sortable) {
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
      <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Search onSearchInputChange={handleSearchInputChange} />
        {allowedToCreate ? (
          <Button variant="outlined" onClick={openModal}>
            Create new
          </Button>
        ) : null}
      </Box>
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
                    {column.sortable ? (
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
                          ) : column.id === 'projects' ? (
                            <>
                              {Array.isArray(cellValue) ? (
                                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                                  {cellValue.map((project: string, index: number) => (
                                    <li key={index}>{project}</li>
                                  ))}
                                </ul>
                              ) : (
                                cellValue
                              )}
                            </>
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
    </>
  );
}
