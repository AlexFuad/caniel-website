/**
 * Application Constants
 * Centralized configuration and constant values
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
  RETRY: 3,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'cms_auth_token',
  CURRENT_USER: 'cms_current_user',
  USERS: 'cms_users',
  BLOG_POSTS: 'blogPosts',
  PRODUCTS: 'cms_products',
  SERVICES: 'cms_services',
  THEME: 'cms_theme',
  SETTINGS: 'cms_settings',
};

// User Roles & Permissions
export const ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
};

export const PERMISSIONS = {
  // Blog permissions
  CREATE_BLOG: 'create_blog',
  EDIT_BLOG: 'edit_blog',
  DELETE_BLOG: 'delete_blog',
  PUBLISH_BLOG: 'publish_blog',
  
  // Product permissions
  CREATE_PRODUCT: 'create_product',
  EDIT_PRODUCT: 'edit_product',
  DELETE_PRODUCT: 'delete_product',
  
  // Service permissions
  CREATE_SERVICE: 'create_service',
  EDIT_SERVICE: 'edit_service',
  DELETE_SERVICE: 'delete_service',
  
  // User management permissions
  MANAGE_USERS: 'manage_users',
  ASSIGN_ROLES: 'assign_roles',
  
  // Settings permissions
  MANAGE_SETTINGS: 'manage_settings',
};

// Role-based permissions mapping
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: Object.values(PERMISSIONS), // All permissions
  [ROLES.EDITOR]: [
    PERMISSIONS.CREATE_BLOG,
    PERMISSIONS.EDIT_BLOG,
    PERMISSIONS.DELETE_BLOG,
    PERMISSIONS.PUBLISH_BLOG,
    PERMISSIONS.CREATE_PRODUCT,
    PERMISSIONS.EDIT_PRODUCT,
    PERMISSIONS.CREATE_SERVICE,
    PERMISSIONS.EDIT_SERVICE,
  ],
  [ROLES.VIEWER]: [
    PERMISSIONS.EDIT_BLOG,
    PERMISSIONS.EDIT_PRODUCT,
    PERMISSIONS.EDIT_SERVICE,
  ],
};

// Default admin user
export const DEFAULT_ADMIN = {
  id: 'admin-001',
  fullName: 'Admin Caniel',
  email: 'admin@caniel.my.id',
  password: '4dL14@23#02', // In production, this should be hashed
  role: ROLES.ADMIN,
  status: 'active',
  avatar: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Blog categories
export const BLOG_CATEGORIES = [
  { id: 'web-development', name: 'Web Development' },
  { id: 'digital-marketing', name: 'Digital Marketing' },
  { id: 'business', name: 'Business' },
  { id: 'technology', name: 'Technology' },
  { id: 'tips', name: 'Tips & Tricks' },
];

// Product categories
export const PRODUCT_CATEGORIES = [
  { id: 'website', name: 'Website' },
  { id: 'mobile-app', name: 'Mobile App' },
  { id: 'ecommerce', name: 'E-Commerce' },
  { id: 'dashboard', name: 'Dashboard' },
  { id: 'landing-page', name: 'Landing Page' },
];

// Service categories
export const SERVICE_CATEGORIES = [
  { id: 'web-development', name: 'Web Development' },
  { id: 'mobile-development', name: 'Mobile Development' },
  { id: 'ui-ux-design', name: 'UI/UX Design' },
  { id: 'digital-marketing', name: 'Digital Marketing' },
  { id: 'consulting', name: 'Consulting' },
];

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
};

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'dd MMM yyyy',
  DATETIME: 'dd MMM yyyy, HH:mm',
  INPUT: 'yyyy-MM-dd',
};

// Validation rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};
