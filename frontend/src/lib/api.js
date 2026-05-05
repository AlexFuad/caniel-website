/**
 * API Layer - Mock backend using localStorage
 * This simulates a real API and can be easily replaced with actual backend
 */

import { STORAGE_KEYS } from '@/config/constants';
import { generateId, sleep } from '@/lib/utils';

/**
 * Generic API wrapper with error handling
 */
class APIError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
    this.name = 'APIError';
  }
}

/**
 * Simulate network delay
 */
const delay = (ms = 300) => sleep(ms);

/**
 * Generic CRUD operations
 */
export const createAPI = (storageKey) => ({
  /**
   * Get all items
   */
  async getAll() {
    await delay();
    try {
      const data = localStorage.getItem(storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      throw new APIError(`Failed to fetch data from ${storageKey}`, 500);
    }
  },

  /**
   * Get item by ID
   */
  async getById(id) {
    await delay();
    try {
      const data = localStorage.getItem(storageKey);
      const items = data ? JSON.parse(data) : [];
      const item = items.find(i => i.id === id);
      
      if (!item) {
        throw new APIError('Item not found', 404);
      }
      
      return item;
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError(`Failed to fetch item from ${storageKey}`, 500);
    }
  },

  /**
   * Create new item
   */
  async create(data) {
    await delay();
    try {
      const items = await this.getAll();
      const newItem = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      items.unshift(newItem);
      localStorage.setItem(storageKey, JSON.stringify(items));
      
      return newItem;
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError(`Failed to create item in ${storageKey}`, 500);
    }
  },

  /**
   * Update existing item
   */
  async update(id, data) {
    await delay();
    try {
      const items = await this.getAll();
      const index = items.findIndex(i => i.id === id);
      
      if (index === -1) {
        throw new APIError('Item not found', 404);
      }
      
      items[index] = {
        ...items[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      
      localStorage.setItem(storageKey, JSON.stringify(items));
      return items[index];
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError(`Failed to update item in ${storageKey}`, 500);
    }
  },

  /**
   * Delete item
   */
  async delete(id) {
    await delay();
    try {
      const items = await this.getAll();
      const filtered = items.filter(i => i.id !== id);
      
      if (filtered.length === items.length) {
        throw new APIError('Item not found', 404);
      }
      
      localStorage.setItem(storageKey, JSON.stringify(filtered));
      return { success: true, id };
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError(`Failed to delete item from ${storageKey}`, 500);
    }
  },

  /**
   * Delete multiple items
   */
  async deleteMultiple(ids) {
    await delay();
    try {
      const items = await this.getAll();
      const filtered = items.filter(i => !ids.includes(i.id));
      
      localStorage.setItem(storageKey, JSON.stringify(filtered));
      return { success: true, deletedCount: ids.length };
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError(`Failed to delete items from ${storageKey}`, 500);
    }
  },
});

/**
 * Specific API instances
 */
export const usersAPI = createAPI(STORAGE_KEYS.USERS);
export const productsAPI = createAPI(STORAGE_KEYS.PRODUCTS);
export const servicesAPI = createAPI(STORAGE_KEYS.SERVICES);

/**
 * Authentication API
 */
export const authAPI = {
  async login(email, password) {
    await delay(500);
    
    try {
      const users = await usersAPI.getAll();
      const user = users.find(u => u.email === email && u.password === password && u.status === 'active');
      
      if (!user) {
        throw new APIError('Invalid credentials', 401);
      }
      
      // Generate mock JWT token
      const token = `mock-jwt-token-${user.id}-${Date.now()}`;
      
      // Store auth data
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      }));
      
      return {
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
        token,
      };
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError('Login failed', 500);
    }
  },

  async logout() {
    await delay();
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    return { success: true };
  },

  async getCurrentUser() {
    await delay();
    const userData = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return userData ? JSON.parse(userData) : null;
  },

  async isAuthenticated() {
    await delay();
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const userData = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return !!(token && userData);
  },
};

export { APIError };
