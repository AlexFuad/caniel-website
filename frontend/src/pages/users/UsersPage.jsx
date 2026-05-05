import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, MoreVertical, Shield } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DataTable } from '@/components/common/DataTable';
import { useTable } from '@/hooks/useTable';
import { useUsers } from '@/context/UserContext';
import { useNotification } from '@/context/NotificationContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import UserForm from '@/components/forms/UserForm';
import { formatDate, getInitials } from '@/lib/utils';
import { ROLES } from '@/config/constants';

/**
 * Users Management Page
 */
export default function UsersPage() {
  const { users, isLoading, deleteUser, deleteMultipleUsers } = useUsers();
  const { showSuccess, showError, showWarning } = useNotification();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const table = useTable({
    data: users,
    initialPageSize: 10,
  });

  const handleDelete = async () => {
    if (!userToDelete) return;

    const result = await deleteUser(userToDelete.id);
    if (result.success) {
      showSuccess('Berhasil', 'Pengguna berhasil dihapus');
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    } else {
      showError('Gagal', result.error || 'Gagal menghapus pengguna');
    }
  };

  const handleBulkDelete = async () => {
    if (table.selectedRows.length === 0) {
      showWarning('Peringatan', 'Pilih pengguna yang ingin dihapus');
      return;
    }

    const result = await deleteMultipleUsers(table.selectedRows);
    if (result.success) {
      showSuccess('Berhasil', `${result.deletedCount} pengguna berhasil dihapus`);
      table.clearSelection();
    } else {
      showError('Gagal', result.error || 'Gagal menghapus pengguna');
    }
  };

  const columns = [
    {
      id: 'user',
      header: 'Pengguna',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
            {row.avatar ? (
              <img src={row.avatar} alt={row.fullName} className="w-full h-full object-cover" />
            ) : (
              getInitials(row.fullName)
            )}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-gray-900 dark:text-white truncate">
              {row.fullName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {row.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'role',
      header: 'Peran',
      sortable: true,
      render: (value) => (
        <Badge variant="outline" className="capitalize">
          <Shield className="h-3 w-3 mr-1" />
          {value}
        </Badge>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      sortable: true,
      render: (value) => (
        <Badge
          variant={value === 'active' ? 'default' : 'secondary'}
          className={
            value === 'active'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : value === 'inactive'
              ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }
        >
          {value === 'active' ? 'Aktif' : value === 'inactive' ? 'Nonaktif' : 'Ditangguhkan'}
        </Badge>
      ),
    },
    {
      id: 'createdAt',
      header: 'Tanggal Dibuat',
      sortable: true,
      render: (value) => formatDate(value),
    },
  ];

  const rowActions = (row) => (
    <>
      <Link to={`/admin/users/edit/${row.id}`}>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-red-600 hover:text-red-700"
        onClick={() => {
          setUserToDelete(row);
          setIsDeleteDialogOpen(true);
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </>
  );

  const headerActions = () => (
    <>
      {table.selectedRows.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleBulkDelete}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Hapus ({table.selectedRows.length})
        </Button>
      )}
      <Button onClick={() => { setSelectedUser(null); setIsFormOpen(true); }}>
        <Plus className="h-4 w-4 mr-2" />
        Tambah Pengguna
      </Button>
    </>
  );

  return (
    <MainLayout title="Manajemen Pengguna" subtitle="Kelola semua pengguna sistem">
      <DataTable
        columns={columns}
        data={table.data}
        tableState={table}
        isLoading={isLoading}
        emptyMessage="Belum ada pengguna"
        headerActions={headerActions}
        rowActions={rowActions}
      />

      {/* User Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedUser ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}</DialogTitle>
            <DialogDescription>
              {selectedUser
                ? 'Perbarui informasi pengguna'
                : 'Buat akun pengguna baru dengan peran dan izin'}
            </DialogDescription>
          </DialogHeader>
          <UserForm
            user={selectedUser}
            onSuccess={() => {
              setIsFormOpen(false);
              setSelectedUser(null);
              showSuccess(
                'Berhasil',
                selectedUser ? 'Pengguna berhasil diperbarui' : 'Pengguna berhasil dibuat'
              );
            }}
            onCancel={() => {
              setIsFormOpen(false);
              setSelectedUser(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Pengguna?</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus pengguna "{userToDelete?.fullName}"? 
              Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
