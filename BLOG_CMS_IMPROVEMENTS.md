# Perbaikan Struktur Blog & CMS Login Admin

## Ringkasan Perubahan

Proyek ini telah diperbaiki untuk mengikuti pola arsitektur yang lebih baik dengan memisahkan state management dari UI logic dan mengikuti praktik terbaik React.

## File Baru yang Dibuat

### 1. `src/context/AuthContext.jsx`
**Tujuan**: Context provider untuk manajemen state autentikasi

**Fitur**:
- State `isAdmin` terpusat
- Fungsi `login(email, password)` - validasi kredensial
- Fungsi `logout()` - hapus session
- State `isLoading` untuk loading state
- Sinkronisasi dengan localStorage

**Perbaikan dari versi sebelumnya**:
- ❌ Menghapus penggunaan `useToast` di dalam context (tidak sesuai praktik React)
- ✅ Toast notification dipindahkan ke komponen UI (LoginDialog, Navbar, Blog, CMS)
- ✅ Context hanya menangani logic autentikasi murni

### 2. `src/context/BlogContext.jsx`
**Tujuan**: Context provider untuk manajemen data blog

**Fitur**:
- State `posts` terpusat untuk semua artikel
- Fungsi `savePost(post)` - buat/update artikel
- Fungsi `deletePost(postId)` - hapus artikel
- Helper functions:
  - `getPublishedPosts()` - ambil artikel yang dipublish
  - `getPostBySlug(slug)` - cari artikel berdasarkan slug
  - `getFeaturedPosts(limit)` - ambil artikel unggulan
  - `getRecentPosts(limit)` - ambil artikel terbaru
  - `generateSlug(title)` - generate URL-friendly slug
- Auto-seed dengan 5 artikel awal
- Sinkronisasi otomatis dengan localStorage

## File yang Diperbaiki

### 1. `src/App.jsx`
**Perubahan**:
```diff
+ import { AuthProvider } from '@/context/AuthContext';
+ import { BlogProvider } from '@/context/BlogContext';

function App() {
  return (
    <Router>
-     <Layout />
+     <AuthProvider>
+       <BlogProvider>
+         <Layout />
+       </BlogProvider>
+     </AuthProvider>
    </Router>
  );
}
```

### 2. `src/components/auth/LoginDialog.jsx`
**Perubahan**:
```diff
const handleLoginAttempt = async () => {
  // ... validation ...
  
  setTimeout(async () => {
    const success = await onLogin(email, password);
    setIsLoading(false);

    if (success) {
      onOpenChange(false);
      // ... reset form ...
+     toast({
+       title: "Login Berhasil!",
+       description: "Selamat datang di CMS Admin!",
+     });
    } else {
      toast({
        title: "Login Gagal",
        description: "Email atau password yang Anda masukkan salah.",
        variant: "destructive",
      });
    }
  }, 800);
};
```

### 3. `src/components/Navbar.jsx`
**Perubahan**:
```diff
- const { isAdmin, login, logout } = useAuth();
+ const { isAdmin, logout } = useAuth();
+ const { toast } = useToast();

+ const handleLogout = () => {
+   logout();
+   toast({
+     title: "Logout Berhasil",
+     description: "Anda telah keluar dari CMS Admin.",
+   });
+ };

// Desktop button
- onClick={() => isAdmin ? navigate('/admin/cms') : setIsLoginOpen(true)}
+ onClick={() => isAdmin ? handleLogout() : setIsLoginOpen(true)}

- className="...from-green-600 to-emerald-600..."
+ className="...from-red-600 to-red-700..."

- <Shield className="h-4 w-4" />
- <span>CMS</span>
+ <X className="h-4 w-4" />
+ <span>Logout</span>
```

### 4. `src/pages/Blog.jsx`
**Perubahan Besar**:
```diff
- import slugify from 'slugify';
- const initialBlogPosts = [ ... 5 articles ... ];

+ import { useAuth } from '@/context/AuthContext';
+ import { useBlog } from '@/context/BlogContext';

const Blog = () => {
- const [blogPosts, setBlogPosts] = useState([]);
- const [isAdmin, setIsAdmin] = useState(false);
+ const { isAdmin, logout } = useAuth();
+ const { posts, savePost, deletePost, getPublishedPosts, getFeaturedPosts, getRecentPosts } = useBlog();

- useEffect(() => {
-   // Load from localStorage
-   // Seed initial data
-   // Check admin status
- }, []);

- const savePostsToStorage = (posts) => { ... };
- const togglePublishStatus = (post) => { ... };
- const handleLogin = (email, password) => { ... };
- const handleLogout = () => { ... };

+ const publishedPosts = getPublishedPosts();
+ const featuredPosts = getFeaturedPosts(2);
+ const recentPosts = getRecentPosts(5);

+ const handleLogout = () => {
+   logout();
+   toast({ ... });
+ };

+ const handleSaveArticle = (article) => {
+   savePost(article);
+   toast({ ... });
+ };

+ const handleDeleteArticle = () => {
+   deletePost(currentArticle.id);
+   toast({ ... });
+ };
```

### 5. `src/pages/admin/Cms.jsx`
**Perubahan Besar**:
```diff
+ import { useAuth } from '@/context/AuthContext';
+ import { useBlog } from '@/context/BlogContext';

const Cms = () => {
- const [isAdmin, setIsAdmin] = useState(false);
- const [blogPosts, setBlogPosts] = useState([]);
+ const { isAdmin, logout } = useAuth();
+ const { posts, savePost, deletePost } = useBlog();

- useEffect(() => {
-   const adminStatus = localStorage.getItem('isAdmin') === 'true';
-   setIsAdmin(adminStatus);
-   if (!adminStatus) { navigate('/blog'); }
-   else { loadBlogPosts(); }
- }, []);

- const loadBlogPosts = () => {
-   const storedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
-   setBlogPosts(storedPosts);
- };

+ useEffect(() => {
+   if (!isAdmin) {
+     toast({ ... });
+     navigate('/blog');
+   }
+ }, [isAdmin, navigate, toast]);

+ const handleLogout = () => {
+   logout();
+   toast({ ... });
+   navigate('/blog');
+ };

- const handleSaveArticle = (article) => {
-   // Manual localStorage handling
-   localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
-   setBlogPosts(updatedPosts);
- };

+ const handleSaveArticle = (article) => {
+   savePost(article);
+   toast({ ... });
+ };

- const handleDeleteArticle = () => {
-   const updatedPosts = blogPosts.filter(p => p.id !== currentArticle.id);
-   localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
-   setBlogPosts(updatedPosts);
- };

+ const handleDeleteArticle = () => {
+   deletePost(currentArticle.id);
+   toast({ ... });
+ };
```

### 6. `src/pages/BlogPost.jsx`
**Perubahan**:
```diff
+ import { useBlog } from '@/context/BlogContext';

const BlogPost = () => {
+ const { getPostBySlug, getRecentPosts } = useBlog();

- useEffect(() => {
-   const storedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
-   const currentPost = storedPosts.find(p => p.slug === slug);
-   if (currentPost) {
-     setPost(currentPost);
-     setRecentPosts(storedPosts.filter(p => p.id !== currentPost.id).slice(0, 3));
-   } else {
-     navigate('/blog');
-   }
- }, [slug, navigate]);

+ useEffect(() => {
+   const currentPost = getPostBySlug(slug);
+   if (currentPost) {
+     setPost(currentPost);
+     const allRecent = getRecentPosts(4);
+     setRecentPosts(allRecent.filter(p => p.id !== currentPost.id).slice(0, 3));
+   } else {
+     navigate('/blog');
+   }
+ }, [slug, navigate, getPostBySlug, getRecentPosts]);
```

### 7. `src/components/blog/ArticleEditor.jsx`
**Perubahan**:
```diff
const ArticleEditor = ({ isOpen, setIsOpen, article, onSave }) => {
+ const [published, setPublished] = useState(false);

  useEffect(() => {
    if (article) {
      // ... other fields ...
+     setPublished(article.published !== undefined ? article.published : false);
    } else {
      // ... new article defaults ...
+     setPublished(false);
    }
  }, [article]);

  const handleSave = () => {
    const savedArticle = {
      // ... other fields ...
+     published,
    };
    onSave(savedArticle);
  };

  const fields = [
    // ... other fields ...
+   { id: 'published', label: 'Published', icon: Eye },
  ];

+ {/* Published Toggle */}
+ <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
+   <div className="flex items-center gap-2">
+     <Eye size={16} className={published ? "text-green-500" : "text-gray-500"} />
+     <Label className="text-sm font-medium text-gray-300">Published</Label>
+   </div>
+   <button
+     onClick={() => setPublished(!published)}
+     className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
+       published ? 'bg-green-600' : 'bg-gray-700'
+     }`}
+   >
+     <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
+       published ? 'translate-x-6' : 'translate-x-1'
+     }`} />
+   </button>
+ </div>
```

## Manfaat dari Perbaikan Ini

### 1. **Separation of Concerns**
- Context providers hanya menangani state management
- UI components menangani user interaction dan notifications
- Tidak ada mixing business logic dengan UI logic

### 2. **Single Source of Truth**
- Auth state: `AuthContext`
- Blog data: `BlogContext`
- Tidak ada duplicate state management di multiple components

### 3. **Konsistensi Data**
- Semua komponen membaca dari sumber yang sama
- Perubahan di satu komponen otomatis tersinkronisasi
- Tidak ada race conditions atau stale data

### 4. **Maintainability**
- Perubahan logic autentikasi hanya di 1 tempat
- Perubahan logic blog data hanya di 1 tempat
- Lebih mudah debugging dan testing

### 5. **Best Practices**
- ✅ Context API sesuai pattern React
- ✅ No toast di context providers
- ✅ Custom hooks untuk reusable logic
- ✅ Proper separation of concerns

## Cara Penggunaan

### Di komponen manapun:

```jsx
import { useAuth } from '@/context/AuthContext';
import { useBlog } from '@/context/BlogContext';

const MyComponent = () => {
  const { isAdmin, login, logout } = useAuth();
  const { posts, savePost, deletePost, getPublishedPosts } = useBlog();
  
  // Use as needed
};
```

## Testing Checklist

- [x] Login flow dari Navbar
- [x] Login flow dari Blog page
- [x] Logout dari Navbar (desktop & mobile)
- [x] Logout dari Blog page
- [x] CMS access control
- [x] Create new article
- [x] Edit existing article
- [x] Delete article
- [x] Published/Unpublished toggle
- [x] Featured toggle
- [x] Blog public view (only published posts)
- [x] Blog search & filter
- [x] Data persistence (refresh page)
- [x] Toast notifications working
- [x] No console errors

## Catatan Keamanan

⚠️ **PENTING**: Implementasi ini menggunakan:
- Hardcoded credentials
- Client-side only authentication
- localStorage untuk session

Ini **HANYA** untuk development/prototype. Untuk production:
- Gunakan backend server
- Implement JWT atau session-based auth
- Password hashing (bcrypt)
- HTTPS only
- Rate limiting
- CSRF protection
- XSS protection
