import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar } from '@mui/material';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  format?: (value: number) => string;
}

interface InitialTableProps<RowType extends { id: string }> {
  columns: Column[];
  rows: RowType[];
}

function InitialTable<RowType extends { id: string }>({ columns, rows }: InitialTableProps<RowType>) {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
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
                    console.log(row[column.id as keyof RowType]);
                    return (
                      <TableCell key={column.id} align={column.align || 'center'}>
                        {column.id === 'avatar' ? (
                          <Avatar src={row[column.id as keyof RowType]} alt={`avatar`}>
                            {row[column.id as keyof RowType]}
                          </Avatar>
                        ) : (
                          row[column.id as keyof RowType]
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

export default InitialTable;
