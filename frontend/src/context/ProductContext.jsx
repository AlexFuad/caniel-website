import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { productsAPI } from '@/lib/api';
import { STORAGE_KEYS, PRODUCT_CATEGORIES } from '@/config/constants';

const ProductContext = createContext(null);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load products on mount
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const loadedProducts = await productsAPI.getAll();
        setProducts(loadedProducts);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Gagal memuat data produk');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Create product
  const createProduct = useCallback(async (productData) => {
    setIsLoading(true);
    setError(null);
    try {
      const newProduct = await productsAPI.create({
        ...productData,
        status: productData.status || 'draft',
        features: productData.features || [],
        techStack: productData.techStack || [],
      });
      
      setProducts(prev => [newProduct, ...prev]);
      return { success: true, product: newProduct };
    } catch (err) {
      console.error('Failed to create product:', err);
      setError('Gagal membuat produk');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update product
  const updateProduct = useCallback(async (productId, updates) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedProduct = await productsAPI.update(productId, updates);
      setProducts(prev => prev.map(p => p.id === productId ? updatedProduct : p));
      return { success: true, product: updatedProduct };
    } catch (err) {
      console.error('Failed to update product:', err);
      setError('Gagal memperbarui produk');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete product
  const deleteProduct = useCallback(async (productId) => {
    setIsLoading(true);
    setError(null);
    try {
      await productsAPI.delete(productId);
      setProducts(prev => prev.filter(p => p.id !== productId));
      return { success: true };
    } catch (err) {
      console.error('Failed to delete product:', err);
      setError('Gagal menghapus produk');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete multiple products
  const deleteMultipleProducts = useCallback(async (productIds) => {
    setIsLoading(true);
    setError(null);
    try {
      await productsAPI.deleteMultiple(productIds);
      setProducts(prev => prev.filter(p => !productIds.includes(p.id)));
      return { success: true, deletedCount: productIds.length };
    } catch (err) {
      console.error('Failed to delete products:', err);
      setError('Gagal menghapus produk');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get product by ID
  const getProductById = useCallback((productId) => {
    return products.find(p => p.id === productId);
  }, [products]);

  // Get products by category
  const getProductsByCategory = useCallback((category) => {
    return products.filter(p => p.category === category);
  }, [products]);

  // Get published products
  const getPublishedProducts = useCallback(() => {
    return products.filter(p => p.status === 'published');
  }, [products]);

  // Refresh products
  const refreshProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const loadedProducts = await productsAPI.getAll();
      setProducts(loadedProducts);
    } catch (err) {
      console.error('Failed to refresh products:', err);
      setError('Gagal memuat ulang data produk');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    products,
    isLoading,
    error,
    categories: PRODUCT_CATEGORIES,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteMultipleProducts,
    getProductById,
    getProductsByCategory,
    getPublishedProducts,
    refreshProducts,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
