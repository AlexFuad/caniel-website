import React, { useState, useEffect } from 'react';
import {
  ChevronLeft, Save, X, Image as ImageIcon, Globe, FileText, Hash, Calendar, Image, AlignLeft, Star, Settings, Eye, MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { useToast } from '@/components/ui/use-toast.js';
import slugify from 'slugify';
import RichTextEditor from '@/components/blog/RichTextEditor.jsx';

const ArticleEditor = ({ isOpen, setIsOpen, article, onSave }) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('web-development');
  const [tags, setTags] = useState('');
  const [author, setAuthor] = useState('Caniel Agency');
  const [featured, setFeatured] = useState(false);
  const [activeField, setActiveField] = useState('title');
  const { toast } = useToast();

  const handleClose = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (article) {
      setTitle(article.title || '');
      setSlug(article.slug || '');
      setDate(article.date ? article.date.split('T')[0] : new Date().toISOString().split('T')[0]);
      setImageUrl(article.image || '');
      setContent(article.content || '');
      setCategory(article.category || 'web-development');
      setTags(article.tags?.join(', ') || '');
      setAuthor(article.author || 'Caniel Agency');
      setFeatured(article.featured || false);
    } else {
      const today = new Date().toISOString().split('T')[0];
      setTitle('');
      setSlug('');
      setDate(today);
      setImageUrl('');
      setContent('<p>Tulis konten luar biasa Anda di sini...</p>');
      setCategory('web-development');
      setTags('');
      setAuthor('Caniel Agency');
      setFeatured(false);
    }
  }, [article]);

  useEffect(() => {
    if (!article || !article.slug) {
      setSlug(slugify(title, { lower: true, strict: true }));
    }
  }, [title, article]);

  const handleSave = () => {
    if (!title || !content) {
      toast({
        title: "Validasi Gagal",
        description: "Judul dan Konten tidak boleh kosong.",
        variant: "destructive",
      });
      return;
    }

    const savedArticle = {
      ...(article || {}),
      id: article ? article.id : Date.now(),
      title,
      slug,
      date,
      image: imageUrl,
      content,
      excerpt: article?.excerpt || content.substring(0, 150).replace(/<[^>]+>/g, ''),
      category,
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
      author,
      readTime: `${Math.max(1, Math.ceil(content.split(' ').length / 200))} menit`,
      featured,
    };

    onSave(savedArticle);
  };

  const fields = [
    { id: 'title', label: 'Title', icon: FileText },
    { id: 'slug', label: 'Slug', icon: Hash },
    { id: 'date', label: 'Date', icon: Calendar },
    { id: 'image', label: 'Image', icon: Image },
    { id: 'content', label: 'Content', icon: AlignLeft },
    { id: 'category', label: 'Category', icon: Globe },
    { id: 'tags', label: 'Tags', icon: Hash },
    { id: 'author', label: 'Author', icon: FileText },
    { id: 'featured', label: 'Featured', icon: Star },
  ];

  const categories = [
    { id: 'web-development', name: 'Web Development' },
    { id: 'digital-marketing', name: 'Digital Marketing' },
    { id: 'business', name: 'Business' },
    { id: 'technology', name: 'Technology' },
    { id: 'tips', name: 'Tips & Tricks' },
  ];

  return (
    <div className="flex h-full bg-[#0a0a0a]">
      {/* Left Sidebar - Fields */}
      <div className="w-64 bg-[#111111] border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Blog Posts</h2>
            <Button variant="ghost" size="icon" onClick={handleClose} className="h-7 w-7 hover:bg-gray-800">
              <X size={16} className="text-gray-400" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {article ? 'Edit existing item' : 'Create new item'}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {fields.map(field => (
              <button
                key={field.id}
                onClick={() => setActiveField(field.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  activeField === field.id
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-300'
                }`}
              >
                <field.icon size={16} />
                <span className="font-medium">{field.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-800">
          <div className="flex gap-2">
            <Button 
              onClick={handleSave} 
              className="flex-1 bg-white text-black hover:bg-gray-200 h-9"
            >
              <Save size={16} className="mr-2" />
              Save
            </Button>
            <Button 
              variant="outline"
              onClick={() => toast({ title: "Preview", description: "Fitur preview sedang dikembangkan" })}
              className="border-gray-700 hover:bg-gray-800 h-9"
            >
              <Eye size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-gray-800 px-6 py-3 bg-[#111111]">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8 hover:bg-gray-800">
              <ChevronLeft size={18} className="text-gray-400" />
            </Button>
            <div>
              <h1 className="text-sm font-semibold text-white">
                {article ? article.title || 'Untitled' : 'New Blog Post'}
              </h1>
              <p className="text-xs text-gray-500">Last edited {new Date().toLocaleString('id-ID')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-800">
              <MoreVertical size={16} className="text-gray-400" />
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 h-8 px-4 text-sm">
              <Save size={14} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto py-12 px-8">
            {/* Title Field */}
            <div className="mb-8">
              <Label className="text-xs font-medium text-gray-500 mb-2 block uppercase tracking-wide">
                Title
              </Label>
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="bg-transparent border-0 border-b border-gray-700 focus:border-blue-500 rounded-none text-3xl font-bold text-white px-0 py-4 h-auto"
                placeholder="Enter blog post title..."
              />
            </div>

            {/* Slug Field */}
            <div className="mb-8">
              <Label className="text-xs font-medium text-gray-500 mb-2 block uppercase tracking-wide">
                Slug
              </Label>
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-gray-500" />
                <Input
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  className="bg-transparent border-0 border-b border-gray-700 focus:border-blue-500 rounded-none text-sm text-gray-300 px-0 py-2 h-auto flex-1"
                  placeholder="url-slug"
                />
              </div>
            </div>

            {/* Content Field */}
            <div className="mb-8">
              <Label className="text-xs font-medium text-gray-500 mb-3 block uppercase tracking-wide">
                Content
              </Label>
              <RichTextEditor value={content} onChange={setContent} />
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Properties */}
      <div className="w-80 bg-[#111111] border-l border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Settings size={16} className="text-gray-400" />
            Properties
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Image Field */}
            <div>
              <Label className="text-xs font-medium text-gray-400 mb-2 block">Image</Label>
              {imageUrl ? (
                <div className="relative mb-3 rounded-lg overflow-hidden border border-gray-700">
                  <img src={imageUrl} alt="Preview" className="w-full h-40 object-cover" />
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    onClick={() => setImageUrl('')} 
                    className="absolute top-2 right-2 h-7 w-7 rounded-full"
                  >
                    <X size={14} />
                  </Button>
                </div>
              ) : (
                <div className="w-full h-32 bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center mb-3">
                  <ImageIcon size={32} className="text-gray-600" />
                </div>
              )}
              <Input
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="bg-gray-900/50 border-gray-700 text-sm h-9"
              />
            </div>

            {/* Date Field */}
            <div>
              <Label className="text-xs font-medium text-gray-400 mb-2 block">Publish Date</Label>
              <Input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="bg-gray-900/50 border-gray-700 text-sm h-9"
              />
            </div>

            {/* Category Field */}
            <div>
              <Label className="text-xs font-medium text-gray-400 mb-2 block">Category</Label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-300 focus:border-blue-500 focus:outline-none"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Tags Field */}
            <div>
              <Label className="text-xs font-medium text-gray-400 mb-2 block">Tags</Label>
              <Input
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="React, Next.js, AI"
                className="bg-gray-900/50 border-gray-700 text-sm h-9"
              />
              <p className="text-xs text-gray-600 mt-1">Separate tags with commas</p>
            </div>

            {/* Author Field */}
            <div>
              <Label className="text-xs font-medium text-gray-400 mb-2 block">Author</Label>
              <Input
                value={author}
                onChange={e => setAuthor(e.target.value)}
                className="bg-gray-900/50 border-gray-700 text-sm h-9"
              />
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Star size={16} className={featured ? "text-yellow-500 fill-yellow-500" : "text-gray-500"} />
                <Label className="text-sm font-medium text-gray-300">Featured Post</Label>
              </div>
              <button
                onClick={() => setFeatured(!featured)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  featured ? 'bg-blue-600' : 'bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    featured ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;
