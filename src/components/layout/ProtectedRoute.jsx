import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

/**
 * ProtectedRoute - Wrapper for authenticated routes
 */
export default function ProtectedRoute({ children, requiredPermission = null }) {
  const { isAuthenticated, isLoading, hasPermission } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check permission if required
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            403
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Anda tidak memiliki izin untuk mengakses halaman ini
          </p>
        </div>
      </div>
    );
  }

  return children;
}
