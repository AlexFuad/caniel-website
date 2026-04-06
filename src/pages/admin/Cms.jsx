import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  ChevronLeft, Database, Plus, Search, Check, Edit, Trash2, Settings, BarChart, HardDrive, Share2, FilePlus, Trello, MoreHorizontal, Save, FileText, Clock, TrendingUp, Eye, Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import ArticleEditor from '@/components/blog/ArticleEditor';
import DeleteConfirmation from '@/components/blog/DeleteConfirmation';

const Cms = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [showDashboard, setShowDashboard] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState('blog');

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
    if (!adminStatus) {
      toast({
        title: "Akses Ditolak",
        description: "Anda harus login sebagai admin untuk mengakses halaman ini.",
        variant: "destructive",
      });
      navigate('/blog');
    } else {
      loadBlogPosts();
    }
  }, [navigate, toast]);

  const loadBlogPosts = () => {
    const storedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    setBlogPosts(storedPosts);
  };

  // Calculate dashboard statistics
  const stats = {
    totalPosts: blogPosts.length,
    thisMonth: blogPosts.filter(p => {
      const postDate = new Date(p.createdAt || p.date);
      const now = new Date();
      return postDate.getMonth() === now.getMonth() && postDate.getFullYear() === now.getFullYear();
    }).length,
    featuredPosts: blogPosts.filter(p => p.featured).length,
    totalViews: blogPosts.length * 150 // Simulated views
  };

  const recentPosts = [...blogPosts].sort((a, b) => 
    new Date(b.updatedAt || b.date) - new Date(a.updatedAt || a.date)
  ).slice(0, 5);
  
  const handleSaveArticle = (article) => {
    let updatedPosts;
    const existingPost = blogPosts.find(p => p.id === article.id);

    if (existingPost) {
        updatedPosts = blogPosts.map(p => p.id === article.id ? { ...article, updatedAt: new Date().toISOString() } : p);
    } else {
        const newPost = { ...article, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        updatedPosts = [newPost, ...blogPosts];
    }

    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    setBlogPosts(updatedPosts);
    setIsEditing(false);
    setCurrentArticle(null);
    toast({
      title: "Artikel Berhasil Disimpan!",
      description: "Perubahan Anda telah disimpan.",
    });
  };
  
  const handleDeleteArticle = () => {
    const updatedPosts = blogPosts.filter(p => p.id !== currentArticle.id);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    setBlogPosts(updatedPosts);
    setIsDeleteConfirmOpen(false);
    setCurrentArticle(null);
    toast({ title: "Artikel berhasil dihapus." });
  };

  const openEditor = (article = null) => {
    setCurrentArticle(article);
    setIsEditing(true);
  };

  const openDeleteConfirm = (article) => {
    setCurrentArticle(article);
    setIsDeleteConfirmOpen(true);
  };

  const handleAction = (feature) => {
    toast({
        title: `🚧 Fitur ${feature} sedang dikembangkan!`,
        description: "Anda dapat meminta fitur ini di prompt berikutnya. 🚀"
    });
  };

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isValidDate = (date) => {
    return date && !isNaN(new Date(date));
  };

  if (!isAdmin) {
    return null; 
  }

  return (
    <>
      <Helmet>
        <title>CMS - Caniel Agency</title>
        <meta name="description" content="Content Management System untuk Caniel Agency." />
      </Helmet>
      
      <DeleteConfirmation isOpen={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen} onConfirm={handleDeleteArticle} />

      <div className="flex h-screen bg-[#1A1A1A] text-gray-300 font-sans">
        {!isEditing && (
          <aside className="w-64 bg-[#141414] p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <button onClick={() => navigate('/blog')} className="p-1 rounded hover:bg-gray-700">
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                  <Trello size={20} className="text-white"/>
                  <span className="font-bold text-white text-lg">CMS</span>
                </div>
                <div/>
              </div>

              <button 
                onClick={() => setShowDashboard(true)}
                className={`w-full flex items-center justify-between mb-4 rounded px-3 py-2 transition-colors ${showDashboard ? 'bg-blue-600/30 text-blue-400 border border-blue-600/50' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}
              >
                <div className="flex items-center gap-2">
                  <BarChart size={16} />
                  <span>Dashboard</span>
                </div>
              </button>

              <h2 className="text-sm font-semibold text-gray-400 mb-2 px-2">Collections</h2>
              <nav className="space-y-1">
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setSelectedCollection('blog'); setShowDashboard(false); }}
                  className={`flex items-center justify-between rounded px-3 py-2 transition-colors ${selectedCollection === 'blog' && !showDashboard ? 'bg-gray-700/50 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}
                >
                  <div className="flex items-center gap-2">
                    <Database size={16} />
                    <span>Blog</span>
                  </div>
                  <span className="text-xs bg-gray-600 px-1.5 py-0.5 rounded-full">{blogPosts.length}</span>
                </a>
                <a href="#" onClick={() => handleAction('Services Collection')} className="flex items-center justify-between text-gray-400 hover:bg-gray-700/50 hover:text-white rounded px-3 py-2">
                  <div className="flex items-center gap-2">
                    <HardDrive size={16} />
                    <span>Services</span>
                  </div>
                  <span className="text-xs bg-gray-800 px-1.5 py-0.5 rounded-full">6</span>
                </a>
                <button onClick={() => handleAction('Add Collection')} className="flex items-center gap-2 text-gray-400 hover:text-white w-full text-left rounded px-3 py-2">
                  <Plus size={16} />
                  <span>Add...</span>
                </button>
              </nav>
            </div>
            <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-700">Watch Tutorials</Button>
          </aside>
        )}

        <main className="flex-1 flex flex-col">
          {isEditing ? (
            <ArticleEditor
              isOpen={isEditing}
              setIsOpen={setIsEditing}
              article={currentArticle}
              onSave={handleSaveArticle}
            />
          ) : showDashboard ? (
            <>
              {/* Dashboard Header */}
              <header className="flex items-center justify-between border-b border-gray-700 px-6 py-4 bg-[#141414]">
                <div>
                  <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                  <p className="text-sm text-gray-400 mt-1">Selamat datang di panel Admin CMS</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button onClick={() => openEditor(null)} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus size={16} className="mr-2"/> Buat Artikel Baru
                  </Button>
                </div>
              </header>

              {/* Dashboard Content */}
              <div className="p-6 flex-1 overflow-y-auto bg-[#1A1A1A]">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-600/30 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-600/30 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-400" />
                      </div>
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    </div>
                    <h3 className="text-gray-400 text-sm mb-1">Total Artikel</h3>
                    <p className="text-3xl font-bold text-white">{stats.totalPosts}</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-600/30 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-600/30 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-green-400" />
                      </div>
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    </div>
                    <h3 className="text-gray-400 text-sm mb-1">Bulan Ini</h3>
                    <p className="text-3xl font-bold text-white">{stats.thisMonth}</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-600/30 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-600/30 rounded-lg flex items-center justify-center">
                        <Eye className="h-6 w-6 text-purple-400" />
                      </div>
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    </div>
                    <h3 className="text-gray-400 text-sm mb-1">Total Views</h3>
                    <p className="text-3xl font-bold text-white">{stats.totalViews.toLocaleString()}</p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 border border-orange-600/30 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-600/30 rounded-lg flex items-center justify-center">
                        <BarChart className="h-6 w-6 text-orange-400" />
                      </div>
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    </div>
                    <h3 className="text-gray-400 text-sm mb-1">Unggulan</h3>
                    <p className="text-3xl font-bold text-white">{stats.featuredPosts}</p>
                  </div>
                </div>

                {/* Recent Activity & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Posts */}
                  <div className="bg-[#141414] border border-gray-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-400" />
                        Aktivitas Terbaru
                      </h2>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowDashboard(false)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Lihat Semua
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {recentPosts.length > 0 ? (
                        recentPosts.map((post, index) => (
                          <div key={post.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer" onClick={() => openEditor(post)}>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-white truncate">{post.title}</h4>
                              <p className="text-xs text-gray-400 mt-1">
                                {post.updatedAt ? format(new Date(post.updatedAt), 'dd MMM yyyy, HH:mm') : 'N/A'}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={(e) => { e.stopPropagation(); openEditor(post); }}
                                className="text-gray-400 hover:text-white h-8 w-8"
                              >
                                <Edit size={14} />
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-400">
                          <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p>Belum ada artikel</p>
                          <Button 
                            size="sm" 
                            onClick={() => openEditor(null)}
                            className="mt-3 bg-blue-600 hover:bg-blue-700"
                          >
                            Buat Artikel Pertama
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-[#141414] border border-gray-700 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Settings className="h-5 w-5 text-purple-400" />
                      Aksi Cepat
                    </h2>
                    <div className="space-y-3">
                      <Button 
                        onClick={() => { openEditor(null); setShowDashboard(false); }}
                        className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12"
                      >
                        <Plus size={18} className="mr-2" />
                        Artikel Baru
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setShowDashboard(false)}
                        className="w-full justify-start border-gray-600 hover:bg-gray-700 h-12"
                      >
                        <Database size={18} className="mr-2" />
                        Kelola Semua Artikel
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleAction('Import/Export')}
                        className="w-full justify-start border-gray-600 hover:bg-gray-700 h-12"
                      >
                        <Share2 size={18} className="mr-2" />
                        Import/Export
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleAction('Settings')}
                        className="w-full justify-start border-gray-600 hover:bg-gray-700 h-12"
                      >
                        <Settings size={18} className="mr-2" />
                        Pengaturan CMS
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <header className="flex items-center justify-between border-b border-gray-700 px-6 py-3 bg-[#141414]">
                <div className="flex items-center gap-2">
                  <Button onClick={() => openEditor(null)} className="bg-white text-black hover:bg-gray-200 h-8 px-3">
                    <Plus size={16} className="mr-2"/> New Item
                  </Button>
                  <Button onClick={() => handleAction('Select')} variant="outline" className="border-gray-600 hover:bg-gray-700 h-8 px-3"><Check size={16} className="mr-2"/>Select</Button>
                  <Button onClick={() => handleAction('Edit Fields')} variant="outline" className="border-gray-600 hover:bg-gray-700 h-8 px-3"><Share2 size={16} className="mr-2"/>Edit Fields</Button>
                  <Button onClick={() => handleAction('Plugins')} variant="outline" className="border-gray-600 hover:bg-gray-700 h-8 px-3"><FilePlus size={16} className="mr-2"/>Plugins</Button>
                </div>
                <div className="flex items-center gap-4">
                  <img alt="User Avatar" className="w-8 h-8 rounded-full object-cover" src="https://images.unsplash.com/photo-1589861255083-92d2efd449f1" />
                  <button onClick={() => handleAction('World Clock')} className="text-gray-400 hover:text-white"><Share2 size={18}/></button>
                  <button onClick={() => handleAction('Settings')} className="text-gray-400 hover:text-white"><Settings size={18}/></button>
                  <button onClick={() => handleAction('Analytics')} className="text-gray-400 hover:text-white"><BarChart size={18}/></button>
                  <Button onClick={() => handleAction('Invite')} variant="outline" className="border-gray-600 hover:bg-gray-700 h-8 px-3">Invite</Button>
                  <Button onClick={() => handleAction('Publish')} className="bg-blue-600 hover:bg-blue-700 h-8 px-3">Publish</Button>
                </div>
              </header>

              <div className="p-6 flex-1 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-full max-w-xs">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <Input 
                      type="text" 
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-[#222] border-gray-600 pl-10 h-9" 
                    />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleAction('More options')} className="text-gray-400 hover:bg-gray-700"><MoreHorizontal size={20}/></Button>
                </div>

                <div className="border border-gray-700 rounded-lg">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-800/20">
                      <tr>
                        <th scope="col" className="px-6 py-3 w-2/5">Title</th>
                        <th scope="col" className="px-6 py-3 w-1/5">Slug</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Image</th>
                        <th scope="col" className="px-6 py-3">Edited</th>
                        <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPosts.map(post => (
                        <tr key={post.id} className="border-b border-gray-700 hover:bg-gray-800/40">
                          <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{post.title}</td>
                          <td className="px-6 py-4 text-gray-400">{post.slug}</td>
                          <td className="px-6 py-4 text-gray-400">{isValidDate(post.date) ? format(new Date(post.date), 'dd/MM/yyyy') : 'N/A'}</td>
                          <td className="px-6 py-4">
                            <img alt={post.title} className="w-16 h-8 object-cover rounded-sm" src={post.image || "https://images.unsplash.com/photo-1504983875-d3b163aba9e6"} />
                          </td>
                          <td className="px-6 py-4 text-gray-400">{isValidDate(post.updatedAt) ? format(new Date(post.updatedAt), 'dd/MM/yyyy, HH:mm') : 'N/A'}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => openEditor(post)} className="text-gray-400 hover:text-white hover:bg-gray-700 w-8 h-8"><Edit size={16}/></Button>
                              <Button variant="ghost" size="icon" onClick={() => openDeleteConfirm(post)} className="text-red-500 hover:text-red-400 hover:bg-gray-700 w-8 h-8"><Trash2 size={16}/></Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Cms;