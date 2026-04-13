import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DataTable } from '@/components/common/DataTable';
import { useTable } from '@/hooks/useTable';
import { useServices } from '@/context/ServiceContext';
import { useNotification } from '@/context/NotificationContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ServiceForm from '@/components/forms/ServiceForm';
import { formatDate } from '@/lib/utils';

/**
 * Services Management Page
 */
export default function ServicesPage() {
  const { services, isLoading, deleteService, deleteMultipleServices } = useServices();
  const { showSuccess, showError, showWarning } = useNotification();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const table = useTable({
    data: services,
    initialPageSize: 10,
  });

  const handleDelete = async () => {
    if (!serviceToDelete) return;

    const result = await deleteService(serviceToDelete.id);
    if (result.success) {
      showSuccess('Berhasil', 'Layanan berhasil dihapus');
      setIsDeleteDialogOpen(false);
      setServiceToDelete(null);
    } else {
      showError('Gagal', result.error || 'Gagal menghapus layanan');
    }
  };

  const handleBulkDelete = async () => {
    if (table.selectedRows.length === 0) {
      showWarning('Peringatan', 'Pilih layanan yang ingin dihapus');
      return;
    }

    const result = await deleteMultipleServices(table.selectedRows);
    if (result.success) {
      showSuccess('Berhasil', `${result.deletedCount} layanan berhasil dihapus`);
      table.clearSelection();
    } else {
      showError('Gagal', result.error || 'Gagal menghapus layanan');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const columns = [
    {
      id: 'name',
      header: 'Nama Layanan',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
            {row.category?.replace('-', ' ')}
          </p>
        </div>
      ),
    },
    {
      id: 'price',
      header: 'Harga',
      sortable: true,
      render: (value) => (
        <span className="font-medium text-green-600">{formatPrice(value)}</span>
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
              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
          }
        >
          {value === 'active' ? 'Aktif' : 'Nonaktif'}
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
      <Link to={`/admin/services/edit/${row.id}`}>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-red-600 hover:text-red-700"
        onClick={() => {
          setServiceToDelete(row);
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
      <Button onClick={() => { setSelectedService(null); setIsFormOpen(true); }}>
        <Plus className="h-4 w-4 mr-2" />
        Tambah Layanan
      </Button>
    </>
  );

  return (
    <MainLayout title="Manajemen Layanan" subtitle="Kelola semua layanan Anda">
      <DataTable
        columns={columns}
        data={table.data}
        tableState={table}
        isLoading={isLoading}
        emptyMessage="Belum ada layanan"
        headerActions={headerActions}
        rowActions={rowActions}
      />

      {/* Service Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedService ? 'Edit Layanan' : 'Tambah Layanan Baru'}</DialogTitle>
            <DialogDescription>
              {selectedService
                ? 'Perbarui informasi layanan'
                : 'Buat layanan baru dengan detail lengkap'}
            </DialogDescription>
          </DialogHeader>
          <ServiceForm
            service={selectedService}
            onSuccess={() => {
              setIsFormOpen(false);
              setSelectedService(null);
              showSuccess(
                'Berhasil',
                selectedService ? 'Layanan berhasil diperbarui' : 'Layanan berhasil dibuat'
              );
            }}
            onCancel={() => {
              setIsFormOpen(false);
              setSelectedService(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Layanan?</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus layanan "{serviceToDelete?.name}"? 
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
