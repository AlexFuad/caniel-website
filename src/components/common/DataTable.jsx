import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

/**
 * DataTable Component - Reusable table with sorting, filtering, and pagination
 */
export function DataTable({
  columns,
  data,
  tableState,
  isLoading = false,
  emptyMessage = 'Tidak ada data tersedia',
  className,
  headerActions,
  rowActions,
  onRowClick,
}) {
  const {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    sortBy,
    sortOrder,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
    searchQuery,
    setSearchQuery,
    selectedRows,
    toggleRowSelection,
    isAllSelected,
    isSomeSelected,
  } = tableState;

  // Render sort icon
  const renderSortIcon = (column) => {
    if (sortBy !== column.id) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          {/* Search */}
          <Input
            placeholder="Cari..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          
          {/* Header Actions */}
          {headerActions && (
            <div className="flex items-center gap-2">
              {typeof headerActions === 'function' ? headerActions() : headerActions}
            </div>
          )}
        </div>

        {/* Page size selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Tampilkan:</span>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm bg-transparent"
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                {/* Selection checkbox */}
                {toggleRowSelection && (
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={input => {
                        if (input) {
                          input.indeterminate = isSomeSelected;
                        }
                      }}
                      onChange={(e) => {
                        if (isAllSelected) {
                          tableState.clearSelection();
                        } else {
                          tableState.selectAllRows(data.map(row => row.id));
                        }
                      }}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                  </th>
                )}

                {/* Column headers */}
                {columns.map((column) => (
                  <th
                    key={column.id}
                    className={cn(
                      'px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
                      column.sortable && 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800',
                      column.className
                    )}
                    onClick={() => column.sortable && handleSort(column.id)}
                  >
                    <div className="flex items-center">
                      {column.header}
                      {column.sortable && renderSortIcon(column)}
                    </div>
                  </th>
                ))}

                {/* Row actions */}
                {rowActions && (
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Aksi
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length + (toggleRowSelection ? 1 : 0) + (rowActions ? 1 : 0)} className="px-4 py-12 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Memuat data...</p>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (toggleRowSelection ? 1 : 0) + (rowActions ? 1 : 0)} className="px-4 py-12 text-center">
                    <p className="text-sm text-gray-500">{emptyMessage}</p>
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr
                    key={row.id || index}
                    className={cn(
                      'hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors',
                      onRowClick && 'cursor-pointer',
                      selectedRows.includes(row.id) && 'bg-blue-50 dark:bg-blue-900/20'
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {/* Selection checkbox */}
                    {toggleRowSelection && (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleRowSelection(row.id);
                          }}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                      </td>
                    )}

                    {/* Row data */}
                    {columns.map((column) => (
                      <td key={column.id} className="px-4 py-3 text-sm">
                        {column.render
                          ? column.render(row[column.id], row)
                          : row[column.id] ?? '-'}
                      </td>
                    ))}

                    {/* Row actions */}
                    {rowActions && (
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {typeof rowActions === 'function'
                            ? rowActions(row)
                            : rowActions}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Total {totalItems} item
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm text-gray-500 dark:text-gray-400 px-4">
            Halaman {currentPage} dari {totalPages || 1}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage >= totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
