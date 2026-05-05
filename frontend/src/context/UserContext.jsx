import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usersAPI } from '@/lib/api';
import { STORAGE_KEYS, DEFAULT_ADMIN, ROLES } from '@/config/constants';

const UserContext = createContext(null);

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load users from localStorage on mount
  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        } else {
          // Initialize with default admin
          await usersAPI.create(DEFAULT_ADMIN);
          const loadedUsers = await usersAPI.getAll();
          setUsers(loadedUsers);
        }
      } catch (err) {
        console.error('Failed to load users:', err);
        setError('Gagal memuat data pengguna');
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Create user
  const createUser = useCallback(async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const newUser = await usersAPI.create({
        ...userData,
        status: userData.status || 'active',
        avatar: userData.avatar || null,
      });
      
      setUsers(prev => [newUser, ...prev]);
      return { success: true, user: newUser };
    } catch (err) {
      console.error('Failed to create user:', err);
      setError('Gagal membuat pengguna');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update user
  const updateUser = useCallback(async (userId, updates) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedUser = await usersAPI.update(userId, updates);
      setUsers(prev => prev.map(u => u.id === userId ? updatedUser : u));
      return { success: true, user: updatedUser };
    } catch (err) {
      console.error('Failed to update user:', err);
      setError('Gagal memperbarui pengguna');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete user
  const deleteUser = useCallback(async (userId) => {
    setIsLoading(true);
    setError(null);
    try {
      await usersAPI.delete(userId);
      setUsers(prev => prev.filter(u => u.id !== userId));
      return { success: true };
    } catch (err) {
      console.error('Failed to delete user:', err);
      setError('Gagal menghapus pengguna');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete multiple users
  const deleteMultipleUsers = useCallback(async (userIds) => {
    setIsLoading(true);
    setError(null);
    try {
      await usersAPI.deleteMultiple(userIds);
      setUsers(prev => prev.filter(u => !userIds.includes(u.id)));
      return { success: true, deletedCount: userIds.length };
    } catch (err) {
      console.error('Failed to delete users:', err);
      setError('Gagal menghapus pengguna');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get user by ID
  const getUserById = useCallback((userId) => {
    return users.find(u => u.id === userId);
  }, [users]);

  // Refresh users
  const refreshUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const loadedUsers = await usersAPI.getAll();
      setUsers(loadedUsers);
    } catch (err) {
      console.error('Failed to refresh users:', err);
      setError('Gagal memuat ulang data pengguna');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    users,
    isLoading,
    error,
    createUser,
    updateUser,
    deleteUser,
    deleteMultipleUsers,
    getUserById,
    refreshUsers,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
