import { useState, useCallback, useEffect } from 'react';
import { PAGINATION } from '@/config/constants';
import { debounce } from '@/lib/utils';

/**
 * Custom hook for table management with pagination, sorting, and filtering
 */
export function useTable(options = {}) {
  const {
    initialPage = 1,
    initialPageSize = PAGINATION.DEFAULT_PAGE_SIZE,
    initialSortBy = null,
    initialSortOrder = 'asc', // 'asc' or 'desc'
    initialFilter = {},
    data = [],
  } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [filters, setFilters] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  // Filter data based on search query and filters
  const filteredData = useCallback(() => {
    let result = [...data];

    // Apply search
    if (searchQuery && result.length > 0) {
      const query = searchQuery.toLowerCase();
      const searchKeys = Object.keys(result[0] || {}).filter(
        key => typeof result[0][key] === 'string' || typeof result[0][key] === 'number'
      );

      result = result.filter(row =>
        searchKeys.some(key =>
          String(row[key]).toLowerCase().includes(query)
        )
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        result = result.filter(row => {
          if (Array.isArray(value)) {
            return value.includes(row[key]);
          }
          return row[key] === value;
        });
      }
    });

    return result;
  }, [data, searchQuery, filters]);

  // Sort data
  const sortedData = useCallback(() => {
    const filtered = filteredData();

    if (!sortBy) return filtered;

    return [...filtered].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      if (aVal === bVal) return 0;

      // Handle null/undefined
      if (aVal === null || aVal === undefined) return sortOrder === 'asc' ? -1 : 1;
      if (bVal === null || bVal === undefined) return sortOrder === 'asc' ? 1 : -1;

      // Handle strings
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      // Handle numbers and dates
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [filteredData, sortBy, sortOrder]);

  // Paginate data
  const paginatedData = useCallback(() => {
    const sorted = sortedData();
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return sorted.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize]);

  // Total pages
  const totalPages = useCallback(() => {
    const filtered = filteredData();
    return Math.ceil(filtered.length / pageSize);
  }, [filteredData, pageSize]);

  // Handle sort
  const handleSort = useCallback((column) => {
    if (sortBy === column) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  }, [sortBy]);

  // Handle page change
  const handlePageChange = useCallback((page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages())));
  }, [totalPages]);

  // Handle page size change
  const handlePageSizeChange = useCallback((newSize) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page
  }, []);

  // Handle filter change
  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1); // Reset to first page
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({});
    setSearchQuery('');
    setCurrentPage(1);
  }, []);

  // Handle row selection
  const toggleRowSelection = useCallback((id) => {
    setSelectedRows(prev =>
      prev.includes(id)
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  }, []);

  const selectAllRows = useCallback((ids) => {
    setSelectedRows(ids);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedRows([]);
  }, []);

  // Reset table state
  const reset = useCallback(() => {
    setCurrentPage(initialPage);
    setPageSize(initialPageSize);
    setSortBy(initialSortBy);
    setSortOrder(initialSortOrder);
    setFilters(initialFilter);
    setSearchQuery('');
    setSelectedRows([]);
  }, [initialPage, initialPageSize, initialSortBy, initialSortOrder, initialFilter]);

  // Computed values
  const tableData = paginatedData();
  const totalItems = filteredData().length;

  return {
    // Data
    data: tableData,
    totalItems,
    totalPages: totalPages(),
    currentPage,
    pageSize,
    
    // Sorting
    sortBy,
    sortOrder,
    handleSort,
    
    // Pagination
    handlePageChange,
    handlePageSizeChange,
    
    // Filtering
    filters,
    searchQuery,
    setSearchQuery: debounce((value) => {
      setSearchQuery(value);
      setCurrentPage(1);
    }, 300),
    handleFilterChange,
    clearFilters,
    
    // Selection
    selectedRows,
    toggleRowSelection,
    selectAllRows,
    clearSelection,
    isAllSelected: tableData.length > 0 && selectedRows.length === tableData.length,
    isSomeSelected: selectedRows.length > 0 && selectedRows.length < tableData.length,
    
    // Actions
    reset,
  };
}
