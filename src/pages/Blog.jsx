import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar, User, Clock, ArrowRight, Search, Tag, TrendingUp, Code, Users, Settings, Lightbulb, PlusCircle, Edit, Trash2, LogOut, LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useBlog } from '@/context/BlogContext';
import ArticleEditor from '@/components/blog/ArticleEditor';
import DeleteConfirmation from '@/components/blog/DeleteConfirmation';
import LoginDialog from '@/components/auth/LoginDialog.jsx';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  
  const { isAdmin, logout, login } = useAuth();
  const { posts, isInitialized, savePost, deletePost, getPublishedPosts, getFeaturedPosts, getRecentPosts } = useBlog();
  const { toast } = useToast();
  const navigate = useNavigate();

  const publishedPosts = getPublishedPosts();
  const featuredPosts = getFeaturedPosts(2);
  const recentPosts = getRecentPosts(5);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari Mode Admin.",
    });
  };

  const handleAction = (action) => toast({ title: `🚧 Fitur ${action} sedang dalam pengembangan!`, description: "Anda bisa meminta implementasi fitur ini di prompt berikutnya! 🚀" });

  const handleSaveArticle = (article) => {
    savePost(article);
    toast({
      title: "Artikel Berhasil Disimpan!",
      description: "Perubahan Anda telah disimpan.",
    });
  };

  const handleDeleteArticle = () => {
    deletePost(currentArticle.id);
    setIsDeleteConfirmOpen(false);
    setCurrentArticle(null);
    toast({ title: "Artikel berhasil dihapus." });
  };

  const openEditor = (article = null) => {
    if (!isAdmin) {
      toast({
        title: "Akses Ditolak",
        description: "Silakan login terlebih dahulu untuk mengakses CMS Editor.",
        variant: "destructive",
      });
      setIsLoginOpen(true);
      return;
    }
    setCurrentArticle(article);
    setIsEditorOpen(true);
  };

  const openDeleteConfirm = (article) => {
    setCurrentArticle(article);
    setIsDeleteConfirmOpen(true);
  };

  const categories = [
    { id: 'all', name: 'Semua Artikel', icon: Tag },
    { id: 'web-development', name: 'Web Development', icon: Code },
    { id: 'digital-marketing', name: 'Digital Marketing', icon: TrendingUp },
    { id: 'business', name: 'Business Tips', icon: Users },
    { id: 'technology', name: 'Technology', icon: Settings },
    { id: 'tips', name: 'Tips & Tricks', icon: Lightbulb }
  ];

  const filteredPosts = publishedPosts.filter(post =>
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'all' || post.category === selectedCategory)
  );

  return (
    <>
      <Helmet>
        <title>Blog - Tips Website Development & Digital Marketing | Caniel Agency</title>
        <meta name="description" content="Baca artikel terbaru dari Caniel Agency tentang web development, digital marketing, business consulting, dan tips teknologi untuk mengembangkan bisnis digital Anda." />
      </Helmet>

      {/* Login Dialog - Only shown when triggered */}
      <LoginDialog isOpen={isLoginOpen} onOpenChange={setIsLoginOpen} onLogin={login} />
      
      {/* CMS Editor - Only shown after login and when editing */}
      {isAdmin && isEditorOpen && (
        <ArticleEditor 
          isOpen={isEditorOpen} 
          setIsOpen={setIsEditorOpen} 
          onSave={handleSaveArticle} 
          article={currentArticle} 
        />
      )}
      
      {/* Delete Confirmation - Only for admin */}
      {isAdmin && (
        <DeleteConfirmation 
          isOpen={isDeleteConfirmOpen} 
          onOpenChange={setIsDeleteConfirmOpen} 
          onConfirm={handleDeleteArticle} 
        />
      )}

      {/* Public Blog View - Always shown */}
      <div className="pt-16">
        <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 relative">
          {/* Admin Controls - Only visible for logged-in admin */}
          {isAdmin && (
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/admin/cms')} 
                className="glass-effect border-blue-500/50 text-blue-400 hover:bg-blue-600/20"
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                CMS Dashboard
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="glass-effect border-red-500/50 text-red-400 hover:bg-red-600/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              {/* Admin Status Indicator */}
              {isAdmin && (
                <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400 font-medium">Mode Admin Aktif</span>
                </div>
              )}
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Blog & Insights</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Wawasan terbaru dari Caniel Agency untuk pertumbuhan bisnis digital Anda.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input type="text" placeholder="Cari artikel..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button key={category.id} variant={selectedCategory === category.id ? "default" : "outline"} size="sm" className={`flex items-center space-x-2 ${selectedCategory === category.id ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white'}`} onClick={() => setSelectedCategory(category.id)}>
                    <category.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {selectedCategory === 'all' && searchTerm === '' && featuredPosts.length > 0 && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6"><span className="gradient-text">Artikel Unggulan</span></h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">Artikel pilihan yang paling banyak dibaca dan memberikan value terbaik.</p>
              </motion.div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="blog-card rounded-2xl overflow-hidden group">
                    <div className="relative overflow-hidden">
                      <img alt={post.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                      <div className="absolute top-4 left-4"><span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">Unggulan</span></div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                        <div className="flex items-center"><User className="h-4 w-4 mr-1" />{post.author}</div>
                        <div className="flex items-center"><Calendar className="h-4 w-4 mr-1" />{new Date(post.date).toLocaleDateString('id-ID')}</div>
                        <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />{post.readTime}</div>
                      </div>
                      <Link to={`/blog/${post.slug}`}><h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{post.title}</h3></Link>
                      <p className="text-gray-400 mb-4 leading-relaxed">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">{post.tags.slice(0, 3).map(tag => <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">#{tag}</span>)}</div>
                      <div className="flex justify-between items-center">
                        <Link to={`/blog/${post.slug}`} className="text-blue-400 hover:text-blue-300 inline-flex items-center">Baca Selengkapnya<ArrowRight className="ml-2 h-4 w-4" /></Link>
                        {isAdmin && (<div className="flex space-x-2"><Button variant="outline" size="icon" onClick={() => openEditor(post)}><Edit className="h-4 w-4" /></Button><Button variant="destructive" size="icon" onClick={() => openDeleteConfirm(post)}><Trash2 className="h-4 w-4" /></Button></div>)}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-20 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2"><span className="gradient-text">{selectedCategory === 'all' ? 'Semua Artikel' : categories.find(cat => cat.id === selectedCategory)?.name}</span></h2>
                    <p className="text-gray-400">Menampilkan {filteredPosts.length} artikel</p>
                  </div>
                  {/* Tombol Artikel Baru - Hanya untuk admin */}
                  {isAdmin && (
                    <Button 
                      onClick={() => openEditor()} 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    >
                      <PlusCircle className="mr-2 h-5 w-5" />
                      Artikel Baru
                    </Button>
                  )}
                </motion.div>
                <div className="space-y-8">
                  {filteredPosts.map((post, index) => (
                    <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="blog-card rounded-2xl overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/3"><Link to={`/blog/${post.slug}`}><img alt={post.title} className="w-full h-48 md:h-full object-cover" src="https://images.unsplash.com/photo-1595872018818-97555653a011" /></Link></div>
                        <div className="md:w-2/3 p-6">
                          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3"><span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs">{categories.find(cat => cat.id === post.category)?.name}</span><div className="flex items-center"><Calendar className="h-4 w-4 mr-1" />{new Date(post.date).toLocaleDateString('id-ID')}</div></div>
                          <Link to={`/blog/${post.slug}`}><h3 className="text-xl font-bold text-white mb-3 hover:text-blue-400 transition-colors">{post.title}</h3></Link>
                          <p className="text-gray-400 mb-4 leading-relaxed">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                             <div className="flex items-center text-sm text-gray-400"><User className="h-4 w-4 mr-1" />{post.author}</div>
                            <div className="flex items-center space-x-2">
                               {isAdmin && (<><Button variant="outline" size="icon" onClick={() => openEditor(post)}><Edit className="h-4 w-4" /></Button><Button variant="destructive" size="icon" onClick={() => openDeleteConfirm(post)}><Trash2 className="h-4 w-4" /></Button></>)}
                              <Link to={`/blog/${post.slug}`} className="text-blue-400 hover:text-blue-300 inline-flex items-center text-sm">Baca<ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="glass-effect rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Artikel Terbaru</h3>
                    <div className="space-y-4">
                      {recentPosts.map((post) => (
                        <Link to={`/blog/${post.slug}`} key={post.id} className="flex space-x-3 group cursor-pointer">
                          <img alt={post.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2">{post.title}</h4>
                            <div className="flex items-center text-xs text-gray-400 mt-1"><Calendar className="h-3 w-3 mr-1" />{new Date(post.date).toLocaleDateString('id-ID')}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="glass-effect rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Tag Populer</h3>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'SEO', 'Digital Marketing', 'Business', 'Next.js', 'Analytics', 'UX/UI', 'Security'].map((tag) => (<span key={tag} onClick={() => handleAction(`Filter Tag: ${tag}`)} className="px-3 py-1 bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white rounded-full text-sm cursor-pointer transition-colors">#{tag}</span>))}
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="glass-effect rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Newsletter</h3>
                    <p className="text-gray-400 text-sm mb-4">Dapatkan artikel terbaru langsung di email Anda</p>
                    <div className="space-y-3">
                      <input type="email" placeholder="Email Anda" className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600" onClick={() => handleAction('Berlangganan Newsletter')}>Berlangganan</Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;