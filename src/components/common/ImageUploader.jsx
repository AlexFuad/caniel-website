import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * ImageUploader Component - Drag & drop image upload with preview
 */
export function ImageUploader({
  value,
  onChange,
  maxFiles = 1,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
  },
  disabled = false,
  className,
  showPreview = true,
  onRemove,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback(
    async (acceptedFiles, rejectedFiles) => {
      setError(null);

      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0]?.code === 'file-too-large') {
          setError(`Ukuran file terlalu besar. Maksimal ${maxSize / 1024 / 1024}MB`);
        } else if (rejection.errors[0]?.code === 'file-invalid-type') {
          setError('Tipe file tidak valid. Gunakan format gambar (PNG, JPG, JPEG, GIF, WEBP)');
        } else {
          setError('File tidak valid');
        }
        return;
      }

      // Handle accepted files
      if (acceptedFiles.length > 0) {
        setIsUploading(true);
        try {
          // For now, we'll create a local URL
          // In production, this should upload to server and return URL
          const file = acceptedFiles[0];
          const localUrl = URL.createObjectURL(file);
          
          // Simulate upload delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          onChange?.(localUrl);
        } catch (err) {
          setError('Gagal mengupload gambar');
          console.error('Upload error:', err);
        } finally {
          setIsUploading(false);
        }
      }
    },
    [onChange, maxSize]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept,
    disabled: disabled || isUploading,
    multiple: maxFiles > 1,
  });

  const handleRemove = () => {
    if (value && typeof value === 'string' && value.startsWith('blob:')) {
      URL.revokeObjectURL(value);
    }
    onRemove?.();
    onChange?.('');
    setError(null);
  };

  return (
    <div className={cn('space-y-2', className)}>
      {/* Preview */}
      {showPreview && value && (
        <div className="relative group">
          <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
              }}
            />
          </div>
          <Button
            variant="destructive"
            size="icon"
            onClick={handleRemove}
            className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Dropzone */}
      {!value && (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
            isDragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500',
            disabled && 'opacity-50 cursor-not-allowed',
            error && 'border-red-500 bg-red-50 dark:bg-red-900/20'
          )}
        >
          <input {...getInputProps()} />
          
          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-12 w-12 text-gray-400 animate-spin" />
              <p className="text-sm text-gray-500">Mengupload...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className={cn(
                'p-4 rounded-full',
                isDragActive ? 'bg-blue-100 dark:bg-blue-900/40' : 'bg-gray-100 dark:bg-gray-800'
              )}>
                <ImageIcon className={cn(
                  'h-8 w-8',
                  isDragActive ? 'text-blue-600' : 'text-gray-400'
                )} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {isDragActive ? 'Lepaskan file di sini' : 'Drag & drop gambar di sini'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  atau <span className="text-blue-600 underline">pilih file</span>
                </p>
              </div>
              <p className="text-xs text-gray-400">
                PNG, JPG, JPEG, GIF, WEBP (Maks. {maxSize / 1024 / 1024}MB)
              </p>
            </div>
          )}
        </div>
      )}

      {/* URL Input */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Atau masukkan URL gambar
        </label>
        <input
          type="url"
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={disabled}
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

export default ImageUploader;
