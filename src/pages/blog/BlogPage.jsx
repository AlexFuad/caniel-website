import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Blog Management Page
 */
export default function BlogPage() {
  return (
    <MainLayout title="Blog" subtitle="Kelola artikel dan konten blog">
      <Card>
        <CardHeader>
          <CardTitle>Blog Management</CardTitle>
          <CardDescription>
            Halaman manajemen blog sedang dalam pengembangan. Gunakan CMS untuk mengelola artikel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Silakan akses <a href="/admin/cms" className="text-blue-600 hover:underline">CMS Dashboard</a> untuk mengelola artikel blog.
          </p>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
