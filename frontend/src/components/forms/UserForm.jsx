import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { userCreateSchema, userUpdateSchema } from '@/lib/validators';
import { useUsers } from '@/context/UserContext';
import { ROLES } from '@/config/constants';
import { ImageUploader } from '@/components/common/ImageUploader';

/**
 * UserForm Component - Form for creating/editing users
 */
export default function UserForm({ user, onSuccess, onCancel }) {
  const { createUser, updateUser, isLoading } = useUsers();
  const isEditing = !!user;

  const form = useForm({
    resolver: zodResolver(isEditing ? userUpdateSchema : userCreateSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      role: ROLES.EDITOR,
      status: 'active',
      avatar: '',
    },
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = form;

  // Load user data if editing
  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || '',
        email: user.email || '',
        password: '', // Don't populate password
        role: user.role || ROLES.EDITOR,
        status: user.status || 'active',
        avatar: user.avatar || '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    // Remove password if empty when editing
    if (isEditing && !data.password) {
      delete data.password;
    }

    const result = isEditing
      ? await updateUser(user.id, data)
      : await createUser(data);

    if (result.success) {
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Avatar Upload */}
      <div>
        <Label>Foto Profil</Label>
        <div className="mt-2">
          <ImageUploader
            value={watch('avatar')}
            onChange={(url) => setValue('avatar', url)}
            onRemove={() => setValue('avatar', '')}
          />
        </div>
        {errors.avatar && (
          <p className="text-sm text-red-600 mt-1">{errors.avatar.message}</p>
        )}
      </div>

      {/* Full Name */}
      <div>
        <Label htmlFor="fullName">Nama Lengkap *</Label>
        <Input
          id="fullName"
          {...register('fullName')}
          placeholder="Masukkan nama lengkap"
          className={errors.fullName ? 'border-red-500' : ''}
        />
        {errors.fullName && (
          <p className="text-sm text-red-600 mt-1">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="contoh@email.com"
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <Label htmlFor="password">
          Password {isEditing && '(kosongkan jika tidak ingin mengubah)'}
          {!isEditing && ' *'}
        </Label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          placeholder="Minimal 8 karakter"
          className={errors.password ? 'border-red-500' : ''}
        />
        {errors.password && (
          <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Role */}
      <div>
        <Label htmlFor="role">Peran *</Label>
        <Select
          value={watch('role')}
          onValueChange={(value) => setValue('role', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih peran" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ROLES.ADMIN}>Admin</SelectItem>
            <SelectItem value={ROLES.EDITOR}>Editor</SelectItem>
            <SelectItem value={ROLES.VIEWER}>Viewer</SelectItem>
          </SelectContent>
        </Select>
        {errors.role && (
          <p className="text-sm text-red-600 mt-1">{errors.role.message}</p>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div>
          <Label>Status Aktif</Label>
          <p className="text-sm text-gray-500 mt-1">
            Pengguna aktif dapat login dan mengakses sistem
          </p>
        </div>
        <Switch
          checked={watch('status') === 'active'}
          onCheckedChange={(checked) =>
            setValue('status', checked ? 'active' : 'inactive')
          }
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Batal
        </Button>
        <Button type="submit" disabled={isSubmitting || isLoading}>
          {isSubmitting || isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>{isEditing ? 'Perbarui' : 'Buat'} Pengguna</>
          )}
        </Button>
      </div>
    </form>
  );
}
