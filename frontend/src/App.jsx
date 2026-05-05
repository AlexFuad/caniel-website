import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { UserProvider } from '@/context/UserContext';
import { ProductProvider } from '@/context/ProductContext';
import { ServiceProvider } from '@/context/ServiceContext';
import { BlogProvider } from '@/context/BlogContext';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Portfolio from '@/pages/Portfolio';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Contact from '@/pages/Contact';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import UsersPage from '@/pages/users/UsersPage';
import ProductsPage from '@/pages/products/ProductsPage';
import ServicesPage from '@/pages/services/ServicesPage';
import Cms from '@/pages/admin/Cms';
import BlogPage from '@/pages/blog/BlogPage';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const Layout = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin/');

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      {!isAdminPage && <Navbar />}
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog"
            element={
              <ProtectedRoute>
                <BlogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <ProtectedRoute>
                <ServicesPage />
              </ProtectedRoute>
            }
          />

          {/* Legacy CMS Route (keeping for backward compatibility) */}
          <Route
            path="/admin/cms"
            element={
              <ProtectedRoute>
                <Cms />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <WhatsAppButton />}
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <LanguageProvider>
              <NotificationProvider>
                <BlogProvider>
                  <UserProvider>
                    <ProductProvider>
                      <ServiceProvider>
                        <Layout />
                      </ServiceProvider>
                    </ProductProvider>
                  </UserProvider>
                </BlogProvider>
              </NotificationProvider>
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
