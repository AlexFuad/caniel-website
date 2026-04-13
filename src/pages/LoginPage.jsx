import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema } from '@/lib/validators';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';

/**
 * Login Page - Enhanced login with React Hook Form and Zod validation
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const { showError } = useNotification();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password);

    if (result.success) {
      // Login success - will redirect via useEffect
    } else {
      showError('Login Gagal', result.error || 'Email atau password salah');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600" />
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <span className="text-4xl font-bold">C</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Caniel Agency CMS</h1>
            <p className="text-lg text-white/80 max-w-md">
              Sistem manajemen konten untuk mengelola blog, produk, layanan, dan pengguna
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 grid grid-cols-2 gap-6"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">Blog Management</h3>
              <p className="text-sm text-white/70">Kelola artikel dan konten</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">Produk & Layanan</h3>
              <p className="text-sm text-white/70">Katalog dan pricing</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">User Management</h3>
              <p className="text-sm text-white/70">Kontrol akses dan peran</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">Analytics</h3>
              <p className="text-sm text-white/70">Dashboard dan laporan</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Selamat Datang
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Masuk ke akun Anda untuk melanjutkan
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="nama@email.com"
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    placeholder="Minimal 8 karakter"
                    className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  'Masuk'
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
                Demo Credentials:
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-400">
                Email: admin@caniel.my.id
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-400">
                Password: 4dL14@23#02
              </p>
            </div>

            {/* Quick Access Links */}
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => navigate('/admin/cms')}
                className="text-xs text-blue-600 hover:underline"
              >
                Akses CMS →
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-xs text-gray-600 dark:text-gray-400 hover:underline"
              >
                ← Kembali ke Beranda
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
