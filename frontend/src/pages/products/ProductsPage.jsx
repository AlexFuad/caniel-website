import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DataTable } from '@/components/common/DataTable';
import { useTable } from '@/hooks/useTable';
import { useProducts } from '@/context/ProductContext';
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
import ProductForm from '@/components/forms/ProductForm';
import { formatDate } from '@/lib/utils';

/**
 * Products Management Page
 */
export default function ProductsPage() {
  const { products, isLoading, deleteProduct, deleteMultipleProducts } = useProducts();
  const { showSuccess, showError, showWarning } = useNotification();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const table = useTable({
    data: products,
    initialPageSize: 10,
  });

  const handleDelete = async () => {
    if (!productToDelete) return;

    const result = await deleteProduct(productToDelete.id);
    if (result.success) {
      showSuccess('Berhasil', 'Produk berhasil dihapus');
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    } else {
      showError('Gagal', result.error || 'Gagal menghapus produk');
    }
  };

  const handleBulkDelete = async () => {
    if (table.selectedRows.length === 0) {
      showWarning('Peringatan', 'Pilih produk yang ingin dihapus');
      return;
    }

    const result = await deleteMultipleProducts(table.selectedRows);
    if (result.success) {
      showSuccess('Berhasil', `${result.deletedCount} produk berhasil dihapus`);
      table.clearSelection();
    } else {
      showError('Gagal', result.error || 'Gagal menghapus produk');
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
      header: 'Nama Produk',
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
          variant={value === 'published' ? 'default' : 'secondary'}
          className={
            value === 'published'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : value === 'draft'
              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
          }
        >
          {value === 'published' ? 'Dipublikasi' : value === 'draft' ? 'Draft' : 'Diarsipkan'}
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
      <Link to={`/admin/products/edit/${row.id}`}>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-red-600 hover:text-red-700"
        onClick={() => {
          setProductToDelete(row);
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
      <Button onClick={() => { setSelectedProduct(null); setIsFormOpen(true); }}>
        <Plus className="h-4 w-4 mr-2" />
        Tambah Produk
      </Button>
    </>
  );

  return (
    <MainLayout title="Manajemen Produk" subtitle="Kelola semua produk Anda">
      <DataTable
        columns={columns}
        data={table.data}
        tableState={table}
        isLoading={isLoading}
        emptyMessage="Belum ada produk"
        headerActions={headerActions}
        rowActions={rowActions}
      />

      {/* Product Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedProduct ? 'Edit Produk' : 'Tambah Produk Baru'}</DialogTitle>
            <DialogDescription>
              {selectedProduct
                ? 'Perbarui informasi produk'
                : 'Buat produk baru dengan detail lengkap'}
            </DialogDescription>
          </DialogHeader>
          <ProductForm
            product={selectedProduct}
            onSuccess={() => {
              setIsFormOpen(false);
              setSelectedProduct(null);
              showSuccess(
                'Berhasil',
                selectedProduct ? 'Produk berhasil diperbarui' : 'Produk berhasil dibuat'
              );
            }}
            onCancel={() => {
              setIsFormOpen(false);
              setSelectedProduct(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Produk?</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus produk "{productToDelete?.name}"? 
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
