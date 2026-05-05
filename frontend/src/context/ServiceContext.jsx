import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { servicesAPI } from '@/lib/api';
import { STORAGE_KEYS, SERVICE_CATEGORIES } from '@/config/constants';

const ServiceContext = createContext(null);

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within ServiceProvider');
  }
  return context;
};

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load services on mount
  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const loadedServices = await servicesAPI.getAll();
        
        // Initialize with sample services if empty
        if (loadedServices.length === 0) {
          const sampleServices = [
            {
              name: 'Web Development',
              description: 'Pembuatan website profesional dengan teknologi terkini',
              category: 'web-development',
              price: 5000000,
              priceUnit: 'project',
              features: ['Responsive Design', 'SEO Optimized', 'CMS Integration', 'Performance Optimization'],
              status: 'active',
              image: 'https://images.unsplash.com/photo-1547658719-da2b51169166',
            },
            {
              name: 'Mobile App Development',
              description: 'Pengembangan aplikasi mobile untuk Android dan iOS',
              category: 'mobile-development',
              price: 8000000,
              priceUnit: 'project',
              features: ['Cross-platform', 'Native Performance', 'Offline Support', 'Push Notifications'],
              status: 'active',
              image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
            },
            {
              name: 'UI/UX Design',
              description: 'Desain antarmuka pengguna yang menarik dan intuitif',
              category: 'ui-ux-design',
              price: 3000000,
              priceUnit: 'project',
              features: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
              status: 'active',
              image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
            },
          ];

          for (const service of sampleServices) {
            await servicesAPI.create(service);
          }
          
          const refreshedServices = await servicesAPI.getAll();
          setServices(refreshedServices);
        } else {
          setServices(loadedServices);
        }
      } catch (err) {
        console.error('Failed to load services:', err);
        setError('Gagal memuat data layanan');
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  // Create service
  const createService = useCallback(async (serviceData) => {
    setIsLoading(true);
    setError(null);
    try {
      const newService = await servicesAPI.create({
        ...serviceData,
        status: serviceData.status || 'active',
        features: serviceData.features || [],
      });
      
      setServices(prev => [newService, ...prev]);
      return { success: true, service: newService };
    } catch (err) {
      console.error('Failed to create service:', err);
      setError('Gagal membuat layanan');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update service
  const updateService = useCallback(async (serviceId, updates) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedService = await servicesAPI.update(serviceId, updates);
      setServices(prev => prev.map(s => s.id === serviceId ? updatedService : s));
      return { success: true, service: updatedService };
    } catch (err) {
      console.error('Failed to update service:', err);
      setError('Gagal memperbarui layanan');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete service
  const deleteService = useCallback(async (serviceId) => {
    setIsLoading(true);
    setError(null);
    try {
      await servicesAPI.delete(serviceId);
      setServices(prev => prev.filter(s => s.id !== serviceId));
      return { success: true };
    } catch (err) {
      console.error('Failed to delete service:', err);
      setError('Gagal menghapus layanan');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete multiple services
  const deleteMultipleServices = useCallback(async (serviceIds) => {
    setIsLoading(true);
    setError(null);
    try {
      await servicesAPI.deleteMultiple(serviceIds);
      setServices(prev => prev.filter(s => !serviceIds.includes(s.id)));
      return { success: true, deletedCount: serviceIds.length };
    } catch (err) {
      console.error('Failed to delete services:', err);
      setError('Gagal menghapus layanan');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get service by ID
  const getServiceById = useCallback((serviceId) => {
    return services.find(s => s.id === serviceId);
  }, [services]);

  // Get services by category
  const getServicesByCategory = useCallback((category) => {
    return services.filter(s => s.category === category);
  }, [services]);

  // Get active services
  const getActiveServices = useCallback(() => {
    return services.filter(s => s.status === 'active');
  }, [services]);

  // Refresh services
  const refreshServices = useCallback(async () => {
    setIsLoading(true);
    try {
      const loadedServices = await servicesAPI.getAll();
      setServices(loadedServices);
    } catch (err) {
      console.error('Failed to refresh services:', err);
      setError('Gagal memuat ulang data layanan');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    services,
    isLoading,
    error,
    categories: SERVICE_CATEGORIES,
    createService,
    updateService,
    deleteService,
    deleteMultipleServices,
    getServiceById,
    getServicesByCategory,
    getActiveServices,
    refreshServices,
  };

  return <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>;
};
