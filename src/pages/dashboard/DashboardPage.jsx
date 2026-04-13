import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Package,
  Briefcase,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Calendar,
  Eye,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MainLayout } from '@/components/layout/MainLayout';
import { useBlog } from '@/context/BlogContext';
import { useProducts } from '@/context/ProductContext';
import { useServices } from '@/context/ServiceContext';
import { useUsers } from '@/context/UserContext';
import { formatDate, formatNumber } from '@/lib/utils';

/**
 * StatCard Component - Display statistics with icon and trend
 */
function StatCard({ title, value, icon: Icon, trend, trendValue, color = 'blue', link }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
            {trend === 'up' ? (
              <TrendingUp className="h-3 w-3 text-green-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500" />
            )}
            <span className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>
              {trendValue}%
            </span>
            <span>dari bulan lalu</span>
          </div>
        )}
        {link && (
          <Link to={link} className="text-xs text-blue-600 hover:underline mt-2 inline-block">
            Lihat detail →
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * ActivityItem Component - Display recent activity
 */
function ActivityItem({ title, description, date, type = 'blog' }) {
  const typeColors = {
    blog: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    product: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    service: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    user: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className={typeColors[type]}>
            {type}
          </Badge>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {title}
          </h4>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <Calendar className="h-3 w-3" />
        <span>{formatDate(date)}</span>
      </div>
    </div>
  );
}

/**
 * Dashboard Page
 */
export default function DashboardPage() {
  const { posts } = useBlog();
  const { products } = useProducts();
  const { services } = useServices();
  const { users } = useUsers();

  // Calculate statistics
  const stats = {
    totalBlogPosts: posts.length,
    publishedPosts: posts.filter(p => p.published).length,
    totalProducts: products.length,
    publishedProducts: products.filter(p => p.status === 'published').length,
    totalServices: services.length,
    activeServices: services.filter(s => s.status === 'active').length,
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalViews: posts.reduce((sum, p) => sum + (p.views || 0), 0) || posts.length * 150,
  };

  // Recent activities (combine recent items from all sections)
  const recentActivities = [
    ...posts.slice(0, 3).map(p => ({
      title: p.title,
      description: p.published ? 'Dipublikasikan' : 'Draft',
      date: p.updatedAt || p.createdAt,
      type: 'blog',
    })),
    ...products.slice(0, 2).map(p => ({
      title: p.name,
      description: `Status: ${p.status}`,
      date: p.updatedAt || p.createdAt,
      type: 'product',
    })),
    ...services.slice(0, 2).map(s => ({
      title: s.name,
      description: `Status: ${s.status}`,
      date: s.updatedAt || s.createdAt,
      type: 'service',
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 7);

  return (
    <MainLayout title="Dashboard" subtitle="Selamat datang di panel admin">
      <div className="space-y-6">
        {/* CMS Quick Access Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Kelola Konten Blog?</h3>
              <p className="text-blue-100">Akses CMS untuk membuat dan mengelola artikel blog dengan mudah.</p>
            </div>
            <Link to="/admin/cms">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                <FileText className="h-4 w-4 mr-2" />
                Buka CMS
              </Button>
            </Link>
          </div>
        </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Artikel"
          value={stats.totalBlogPosts}
          icon={FileText}
          trend="up"
          trendValue={12}
          color="blue"
          link="/admin/cms"
        />
        <StatCard
          title="Total Produk"
          value={stats.totalProducts}
          icon={Package}
          trend="up"
          trendValue={8}
          color="green"
          link="/admin/products"
        />
        <StatCard
          title="Total Layanan"
          value={stats.totalServices}
          icon={Briefcase}
          trend="up"
          trendValue={5}
          color="purple"
          link="/admin/services"
        />
        <StatCard
          title="Total Pengguna"
          value={stats.totalUsers}
          icon={Users}
          trend="up"
          trendValue={15}
          color="orange"
          link="/admin/users"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Artikel Dipublikasikan</CardTitle>
            <CardDescription>Status publikasi konten</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.publishedPosts}</div>
            <p className="text-xs text-gray-500 mt-2">
              dari {stats.totalBlogPosts} total artikel
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${(stats.publishedPosts / stats.totalBlogPosts) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Produk Aktif</CardTitle>
            <CardDescription>Produk yang dipublikasikan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.publishedProducts}</div>
            <p className="text-xs text-gray-500 mt-2">
              dari {stats.totalProducts} total produk
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
              <div
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `${(stats.publishedProducts / stats.totalProducts) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <CardDescription>Semua konten</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {formatNumber(stats.totalViews)}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              views keseluruhan
            </p>
            <div className="flex items-center gap-1 mt-3 text-xs text-green-500">
              <TrendingUp className="h-3 w-3" />
              <span>+23% dari bulan lalu</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>Aktivitas terbaru dari semua konten</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivities.length > 0 ? (
              <div className="space-y-2">
                {recentActivities.map((activity, index) => (
                  <ActivityItem key={index} {...activity} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Eye className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Belum ada aktivitas</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
            <CardDescription>Akses cepat ke fitur utama</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/admin/cms">
              <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <FileText className="h-4 w-4 mr-2" />
                Buka CMS
              </Button>
            </Link>
            <Link to="/admin/blog">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Kelola Blog
              </Button>
            </Link>
            <Link to="/admin/products">
              <Button variant="outline" className="w-full justify-start">
                <Package className="h-4 w-4 mr-2" />
                Kelola Produk
              </Button>
            </Link>
            <Link to="/admin/services">
              <Button variant="outline" className="w-full justify-start">
                <Briefcase className="h-4 w-4 mr-2" />
                Kelola Layanan
              </Button>
            </Link>
            <Link to="/admin/users">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Kelola Pengguna
              </Button>
            </Link>
            <Link to="/admin/settings">
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="h-4 w-4 mr-2" />
                Pengaturan
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
    </MainLayout>
  );
}
