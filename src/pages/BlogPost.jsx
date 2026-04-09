import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Twitter, Facebook, Linkedin, Link as LinkIcon, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useBlog } from '@/context/BlogContext';
const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { getPostBySlug, getRecentPosts } = useBlog();
  
  useEffect(() => {
    const currentPost = getPostBySlug(slug);
    if (currentPost) {
      setPost(currentPost);
      const allRecent = getRecentPosts(4);
      setRecentPosts(allRecent.filter(p => p.id !== currentPost.id).slice(0, 3));
    } else {
      navigate('/blog');
    }
  }, [slug, navigate, getPostBySlug, getRecentPosts]);
  const handleShare = platform => {
    const url = window.location.href;
    const text = `Check out this article from Caniel Agency: ${post.title}`;
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.excerpt)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          toast({
            title: 'Link disalin!',
            description: 'Anda dapat membagikan link ini.'
          });
        });
        return;
      default:
        return;
    }
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };
  if (!post) {
    return <div className="pt-16 text-center py-20">Memuat artikel...</div>;
  }
  return <>
      <Helmet>
        <title>{post.title} | Caniel Agency</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`caniel agency, ${post.tags?.join(', ')}`} />
        <meta property="og:title" content={`${post.title} | Caniel Agency`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        {post.tags?.map(tag => <meta key={tag} property="article:tag" content={tag} />)}
      </Helmet>

      <div className="pt-16">
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.5
      }}>
          <div className="relative h-[50vh]">
            <img alt={post.title} className="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1504983875-d3b163aba9e6" />
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative h-full flex flex-col justify-center items-center text-center max-w-4xl mx-auto px-4">
              <Link to="/blog" className="mb-4 text-blue-400 hover:text-blue-300 inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Blog
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <div className="flex items-center"><User className="h-4 w-4 mr-1" />{post.author}</div>
                <div className="flex items-center"><Calendar className="h-4 w-4 mr-1" />{new Date(post.date).toLocaleDateString('id-ID')}</div>
                <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />{post.readTime}</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <motion.div initial={{
            x: -50,
            opacity: 0
          }} animate={{
            x: 0,
            opacity: 1
          }} transition={{
            delay: 0.3,
            duration: 0.5
          }} className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-28 space-y-4">
                <p className="text-sm font-bold text-gray-400">BAGIKAN</p>
                <Button variant="ghost" size="icon" onClick={() => handleShare('twitter')}><Twitter className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleShare('facebook')}><Facebook className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleShare('linkedin')}><Linkedin className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleShare('copy')}><LinkIcon className="h-5 w-5" /></Button>
              </div>
            </motion.div>
            
            <motion.article initial={{
            y: 50,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.2,
            duration: 0.7
          }} className="lg:col-span-11">
              <div
                className="wysiwyg-content text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="mt-12 flex flex-wrap gap-2">
                {post.tags?.map(tag => <span key={tag} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">#{tag}</span>)}
              </div>

              <div className="mt-12 lg:hidden flex items-center space-x-2">
                <Share2 className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-bold text-gray-400">BAGIKAN:</span>
                <Button variant="ghost" size="icon" onClick={() => handleShare('twitter')}><Twitter className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleShare('facebook')}><Facebook className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleShare('linkedin')}><Linkedin className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleShare('copy')}><LinkIcon className="h-5 w-5" /></Button>
              </div>
            </motion.article>
          </div>
        </div>

        <section className="bg-slate-800/30 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <h2 className="text-3xl font-bold text-center mb-12"><span className="gradient-text">Baca Artikel Lainnya</span></h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map(recentPost => <motion.div key={recentPost.id} className="blog-card rounded-2xl overflow-hidden group" initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6
            }}>
                  <Link to={`/blog/${recentPost.slug}`}>
                    <div className="relative overflow-hidden">
                      <img alt={recentPost.title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" src="https://images.unsplash.com/photo-1504983875-d3b163aba9e6" />
                    </div>
                    <div className="p-6">
                       <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">{recentPost.title}</h3>
                       <div className="flex items-center text-sm text-gray-400">
                          <Calendar className="h-4 w-4 mr-2" /> {new Date(recentPost.date).toLocaleDateString('id-ID')}
                       </div>
                    </div>
                  </Link>
                </motion.div>)}
            </div>
          </div>
        </section>
      </div>
    </>;
};
export default BlogPost;