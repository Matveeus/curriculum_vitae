import React, { useMemo } from 'react';
import { MoreMenu } from '../';
import { sortRows, filterRows } from '../../utils';
import type { MenuItemData } from '../MoreMenu';
import {
  Avatar,
  TableSortLabel,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
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
  filterBy?: string;
}

export type Order = 'asc' | 'desc';

export default function InitialTable({ columns, rows, filterBy = '' }: InitialTableProps) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('');

  const handleRequestSort = (property: string) => {
    const columnToSort = columns.find(column => column.id === property);

    if (columnToSort && columnToSort.sortable) {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    }
  };

  const sortedRows = useMemo(() => sortRows(rows, orderBy, order, columns), [order, orderBy, rows, columns]);

  const filteredRows = useMemo(() => filterRows(sortedRows, filterBy, columns), [filterBy, sortedRows, columns]);

  return (
    <>
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
