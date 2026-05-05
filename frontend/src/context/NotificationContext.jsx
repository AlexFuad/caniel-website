import React, { createContext, useContext, useCallback, useState } from 'react';

const NotificationContext = createContext(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [toastQueue, setToastQueue] = useState([]);

  const showSuccess = useCallback((title, description, options = {}) => {
    const notification = {
      id: Date.now(),
      type: 'success',
      title,
      description,
      ...options,
    };

    setNotifications(prev => [...prev, notification]);
    setToastQueue(prev => [...prev, { ...notification, duration: options.duration || 3000 }]);

    // Auto-remove after duration
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, options.duration || 3000);

    return notification.id;
  }, []);

  const showError = useCallback((title, description, options = {}) => {
    const notification = {
      id: Date.now(),
      type: 'error',
      title,
      description,
      ...options,
    };

    setNotifications(prev => [...prev, notification]);
    setToastQueue(prev => [...prev, { ...notification, duration: options.duration || 5000 }]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, options.duration || 5000);

    return notification.id;
  }, []);

  const showWarning = useCallback((title, description, options = {}) => {
    const notification = {
      id: Date.now(),
      type: 'warning',
      title,
      description,
      ...options,
    };

    setNotifications(prev => [...prev, notification]);
    setToastQueue(prev => [...prev, { ...notification, duration: options.duration || 4000 }]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, options.duration || 4000);

    return notification.id;
  }, []);

  const showInfo = useCallback((title, description, options = {}) => {
    const notification = {
      id: Date.now(),
      type: 'info',
      title,
      description,
      ...options,
    };

    setNotifications(prev => [...prev, notification]);
    setToastQueue(prev => [...prev, { ...notification, duration: options.duration || 3000 }]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, options.duration || 3000);

    return notification.id;
  }, []);

  const dismissNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const value = {
    notifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    dismissNotification,
    clearNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
