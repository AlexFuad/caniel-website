import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes without conflicts
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to readable string
 */
export function formatDate(date, format = 'dd MMM yyyy') {
  if (!date) return 'N/A';
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'N/A';
  
  return d.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format datetime to readable string
 */
export function formatDateTime(date) {
  if (!date) return 'N/A';
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'N/A';
  
  return d.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Generate unique ID
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text, length = 50) {
  if (!text) return '';
  return text.length > length ? `${text.substring(0, length)}...` : text;
}

/**
 * Get initials from name
 */
export function getInitials(name) {
  if (!name) return '';
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

/**
 * Format number with separator
 */
export function formatNumber(number) {
  if (!number) return '0';
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Calculate percentage change
 */
export function percentageChange(oldValue, newValue) {
  if (!oldValue) return 0;
  return Math.round(((newValue - oldValue) / oldValue) * 100);
}

/**
 * Check if value is empty or null
 */
export function isEmpty(value) {
  return value === null || value === undefined || value === '';
}

/**
 * Capitalize first letter
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert to title case
 */
export function toTitleCase(str) {
  if (!str) return '';
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

/**
 * Sleep function for async operations
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
