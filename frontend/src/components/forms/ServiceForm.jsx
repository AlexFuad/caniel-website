import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { serviceSchema } from '@/lib/validators';
import { useServices } from '@/context/ServiceContext';
import { ImageUploader } from '@/components/common/ImageUploader';
import RichTextEditor from '@/components/blog/RichTextEditor';

/**
 * ServiceForm Component - Form for creating/editing services
 */
export default function ServiceForm({ service, onSuccess, onCancel }) {
  const { createService, updateService, categories, isLoading } = useServices();
  const isEditing = !!service;

  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      price: 0,
      priceUnit: 'project',
      features: [],
      status: 'active',
      image: '',
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

  // Load service data if editing
  useEffect(() => {
    if (service) {
      reset({
        name: service.name || '',
        description: service.description || '',
        category: service.category || '',
        price: service.price || 0,
        priceUnit: service.priceUnit || 'project',
        features: service.features || [],
        status: service.status || 'active',
        image: service.image || '',
      });
    }
  }, [service, reset]);

  const onSubmit = async (data) => {
    const result = isEditing
      ? await updateService(service.id, data)
      : await createService(data);

    if (result.success) {
      onSuccess?.();
    }
  };

  const addFeature = () => {
    const currentFeatures = watch('features') || [];
    setValue('features', [...currentFeatures, '']);
  };

  const removeFeature = (index) => {
    const currentFeatures = watch('features') || [];
    setValue('features', currentFeatures.filter((_, i) => i !== index));
  };

  const updateFeature = (index, value) => {
    const currentFeatures = watch('features') || [];
    const newFeatures = [...currentFeatures];
    newFeatures[index] = value;
    setValue('features', newFeatures);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Service Image */}
      <div>
        <Label>Gambar Layanan</Label>
        <div className="mt-2">
          <ImageUploader
            value={watch('image')}
            onChange={(url) => setValue('image', url)}
            onRemove={() => setValue('image', '')}
          />
        </div>
        {errors.image && (
          <p className="text-sm text-red-600 mt-1">{errors.image.message}</p>
        )}
      </div>

      {/* Service Name */}
      <div>
        <Label htmlFor="name">Nama Layanan *</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Masukkan nama layanan"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Deskripsi *</Label>
        <RichTextEditor
          value={watch('description')}
          onChange={(value) => setValue('description', value)}
        />
        {errors.description && (
          <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Price and Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Price */}
        <div>
          <Label htmlFor="price">Harga *</Label>
          <Input
            id="price"
            type="number"
            {...register('price', { valueAsNumber: true })}
            placeholder="0"
            className={errors.price ? 'border-red-500' : ''}
          />
          {errors.price && (
            <p className="text-sm text-red-600 mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category">Kategori *</Label>
          <Select
            value={watch('category')}
            onValueChange={(value) => setValue('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-red-600 mt-1">{errors.category.message}</p>
          )}
        </div>
      </div>

      {/* Price Unit */}
      <div>
        <Label htmlFor="priceUnit">Satuan Harga</Label>
        <Select
          value={watch('priceUnit')}
          onValueChange={(value) => setValue('priceUnit', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="project">Per Proyek</SelectItem>
            <SelectItem value="hour">Per Jam</SelectItem>
            <SelectItem value="month">Per Bulan</SelectItem>
            <SelectItem value="year">Per Tahun</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Features */}
      <div>
        <Label>Fitur Layanan</Label>
        <div className="mt-2 space-y-2">
          {watch('features')?.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                placeholder={`Fitur ${index + 1}`}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeFeature(index)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addFeature}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah Fitur
          </Button>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div>
          <Label>Status Aktif</Label>
          <p className="text-sm text-gray-500 mt-1">
            Aktifkan layanan agar terlihat oleh pelanggan
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
            <>{isEditing ? 'Perbarui' : 'Buat'} Layanan</>
          )}
        </Button>
      </div>
    </form>
  );
}
