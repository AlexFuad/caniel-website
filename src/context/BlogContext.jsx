import { createContext, useContext, useState, useEffect } from 'react';
import slugify from 'slugify';

const BlogContext = createContext(null);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within BlogProvider');
  }
  return context;
};

const initialBlogPosts = [
  { 
    id: 1, 
    slug: '10-tren-web-development-terbaru-di-2024', 
    title: '10 Tren Web Development Terbaru di 2024', 
    excerpt: 'Pelajari tren terbaru dalam web development yang akan mendominasi industri teknologi di tahun 2024, mulai dari AI integration hingga progressive web apps.', 
    content: '<p>Ini adalah konten lengkap tentang tren web development terbaru.</p>', 
    category: 'web-development', 
    author: 'Daniel RN', 
    date: '2024-01-15', 
    readTime: '8 menit', 
    image: 'https://images.unsplash.com/photo-1595872018818-97555653a011', 
    tags: ['React', 'Next.js', 'AI', 'PWA', 'Web3'], 
    featured: true, 
    published: true, 
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString() 
  },
  { 
    id: 2, 
    slug: 'strategi-digital-marketing-untuk-umkm', 
    title: 'Strategi Digital Marketing untuk UMKM', 
    excerpt: 'Panduan lengkap strategi digital marketing yang efektif dan terjangkau untuk usaha mikro, kecil, dan menengah di Indonesia.', 
    content: '<p>Ini adalah panduan strategi digital marketing untuk UMKM.</p>', 
    category: 'digital-marketing', 
    author: 'Alex Fuad', 
    date: '2024-01-12', 
    readTime: '6 menit', 
    image: 'https://images.unsplash.com/photo-1595872018818-97555653a011', 
    tags: ['Social Media', 'Google Ads', 'SEO', 'Content Marketing'], 
    featured: true, 
    published: true, 
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString() 
  },
  { 
    id: 3, 
    slug: 'cara-memilih-technology-stack-yang-tepat', 
    title: 'Cara Memilih Technology Stack yang Tepat', 
    excerpt: 'Tips memilih kombinasi teknologi yang tepat untuk proyek web development Anda berdasarkan kebutuhan bisnis dan skalabilitas.', 
    content: '<p>Ini adalah panduan memilih technology stack.</p>', 
    category: 'technology', 
    author: 'Eca Tatianna', 
    date: '2024-01-10', 
    readTime: '10 menit', 
    image: 'https://images.unsplash.com/photo-1595872018818-97555653a011', 
    tags: ['Frontend', 'Backend', 'Database', 'DevOps'], 
    featured: false, 
    published: true, 
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString() 
  },
  { 
    id: 4, 
    slug: 'optimasi-seo-untuk-website-bisnis', 
    title: 'Optimasi SEO untuk Website Bisnis', 
    excerpt: 'Teknik-teknik SEO terbaru yang dapat meningkatkan ranking website bisnis Anda di mesin pencari Google dan Bing.', 
    content: '<p>Ini adalah panduan optimasi SEO untuk website bisnis.</p>', 
    category: 'digital-marketing', 
    author: 'Aprilianti P', 
    date: '2024-01-08', 
    readTime: '7 menit', 
    image: 'https://images.unsplash.com/photo-1595872018818-97555653a011', 
    tags: ['SEO', 'Google', 'Keywords', 'Analytics'], 
    featured: false, 
    published: true, 
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString() 
  },
  { 
    id: 5, 
    slug: 'transformasi-digital-untuk-perusahaan-tradisional', 
    title: 'Transformasi Digital untuk Perusahaan Tradisional', 
    excerpt: 'Langkah-langkah praktis untuk memulai transformasi digital di perusahaan tradisional tanpa mengganggu operasional yang sudah berjalan.', 
    content: '<p>Ini adalah panduan transformasi digital.</p>', 
    category: 'business', 
    author: 'Alex Fuad', 
    date: '2024-01-05', 
    readTime: '12 menit', 
    image: 'https://images.unsplash.com/photo-1595872018818-97555653a011', 
    tags: ['Digital Transformation', 'Business Strategy', 'Change Management'], 
    featured: false, 
    published: true, 
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString() 
  },
];

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let storedPosts = localStorage.getItem('blogPosts');
    
    if (!storedPosts || JSON.parse(storedPosts).length === 0) {
      const postsWithSlugs = initialBlogPosts.map(p => ({
        ...p, 
        slug: p.slug || slugify(p.title, { lower: true, strict: true })
      }));
      localStorage.setItem('blogPosts', JSON.stringify(postsWithSlugs));
      storedPosts = JSON.stringify(postsWithSlugs);
    }
    
    setPosts(JSON.parse(storedPosts));
    setIsInitialized(true);
  }, []);

  const savePost = (post) => {
    const updatedPosts = posts.map(p => {
      if (p.id === post.id) {
        return { ...post, updatedAt: new Date().toISOString() };
      }
      return p;
    });
    
    if (!posts.find(p => p.id === post.id)) {
      updatedPosts.unshift({
        ...post,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const deletePost = (postId) => {
    const updatedPosts = posts.filter(p => p.id !== postId);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const getPublishedPosts = () => {
    return posts.filter(p => p.published);
  };

  const getPostBySlug = (slug) => {
    return posts.find(p => p.slug === slug);
  };

  const getFeaturedPosts = (limit = 2) => {
    return posts.filter(p => p.featured && p.published).slice(0, limit);
  };

  const getRecentPosts = (limit = 5) => {
    return posts
      .filter(p => p.published)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  };

  const generateSlug = (title) => {
    return slugify(title, { lower: true, strict: true });
  };

  const value = {
    posts,
    isInitialized,
    savePost,
    deletePost,
    getPublishedPosts,
    getPostBySlug,
    getFeaturedPosts,
    getRecentPosts,
    generateSlug,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
