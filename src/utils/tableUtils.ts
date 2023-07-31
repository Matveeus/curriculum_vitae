import { Column, Row, Order } from '../components/tables/InitialTable';

export function sortRows(rows: Row[], orderBy: string, order: Order, columns: Column[]): Row[] {
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
}

export function filterRows(rows: Row[], searchInput: string, columns: Column[]): Row[] {
  if (!searchInput || !columns.some(col => col.searchable)) {
    return rows;
  }

  return rows.filter(row => {
    return columns.some(column => {
      if (column.searchable) {
        const cellValue = String(row[column.id as keyof Row]).toLowerCase();
        return cellValue.includes(searchInput);
      }
      return false;
    });
  });
}
