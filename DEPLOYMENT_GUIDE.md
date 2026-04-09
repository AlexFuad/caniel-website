# 🚀 Deployment Guide - caniel.my.id

## ⚠️ **PENTING: Error "Failed to load module script"**

Error ini terjadi karena **production build belum di-deploy** ke server.

---

## 📦 **Step-by-Step Deployment**

### **Step 1: Build Production Version**

Di terminal lokal:
```bash
cd "d:\My Files\Developer\Project Caniel_Horizon AI"
npx vite build
```

**Output:**
```
✓ 2069 modules transformed.
dist/index.html                   5.77 kB │ gzip:   2.22 kB
dist/assets/index-22616081.css   92.72 kB │ gzip:  15.92 kB
dist/assets/index-97bd39f9.js   537.31 kB │ gzip: 163.66 kB
✓ built in 38.13s
```

**Hasil:** Folder `dist/` berisi file production-ready.

---

### **Step 2: Upload ke Server**

#### **Option A: FTP/SFTP (cPanel)**

1. **Buka File Manager di cPanel**
   - Login ke hosting caniel.my.id
   - Buka File Manager
   - Navigate ke `public_html/` atau `www/`

2. **Upload isi folder `dist/`:**
   ```
   dist/
   ├── index.html
   └── assets/
       ├── index-22616081.css
       └── index-97bd39f9.js
   ```

3. **PENTING:** Upload **SEMUA** file dari `dist/` ke root folder domain

#### **Option B: Git Deployment**

Jika server menggunakan Git:
```bash
# Build
npx vite build

# Commit build files
git add dist/
git commit -m "build: Production build for deployment"
git push origin main

# Di server (SSH)
cd /var/www/caniel.my.id
git pull origin main
```

#### **Option C: Netlify/Vercel (Recommended)**

1. **Push ke GitHub:**
   ```bash
   git push origin main
   ```

2. **Connect ke Netlify/Vercel:**
   - Login ke https://netlify.com atau https://vercel.com
   - Import repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Auto-deploy on push!

---

### **Step 3: Konfigurasi Server**

#### **Apache (.htaccess):**

Buat file `.htaccess` di root folder:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Redirect all routes to index.html
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/json
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# Set proper MIME types
AddType text/css .css
AddType application/javascript .js
AddType application/wasm .wasm

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

#### **Nginx (nginx.conf):**

```nginx
server {
    listen 80;
    server_name caniel.my.id;
    root /var/www/caniel.my.id;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1000;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Prevent caching HTML
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
```

---

## 🔍 **Troubleshooting**

### **Error: "Failed to load module script"**

**Penyebab:**
- Server mengirim HTML вместо JavaScript files
- MIME type salah
- File paths incorrect

**Solusi:**

1. **Cek MIME Types di Server:**
   ```
   JavaScript files harus: Content-Type: application/javascript
   CSS files harus: Content-Type: text/css
   ```

2. **Pastikan File Ter-upload:**
   ```bash
   # Cek apakah file ada
   ls -la /var/www/caniel.my.id/assets/
   
   # Harus ada:
   # index-97bd39f9.js
   # index-22616081.css
   ```

3. **Cek File Paths di index.html:**
   ```html
   <!-- Harus relative paths, bukan absolute -->
   <script type="module" crossorigin src="/assets/index-97bd39f9.js"></script>
   <link rel="stylesheet" href="/assets/index-22616081.css">
   ```

4. **Clear Browser Cache:**
   ```
   Ctrl + Shift + R (Hard Refresh)
   Atau
   Clear cache di DevTools
   ```

---

### **Error: Blank Page**

**Kemungkinan Penyebab:**
- Build tidak lengkap
- File missing
- Console errors

**Solusi:**
1. Buka Console (F12)
2. Cek error messages
3. Pastikan semua file ter-load (Network tab)
4. Re-build dan re-upload

---

### **Error: 404 Not Found**

**Penyebab:** Server routing tidak configured untuk SPA

**Solusi:** 
- Tambah `.htaccess` (Apache)
- Atau update `nginx.conf` (Nginx)
- Lihat konfigurasi di atas

---

## ✅ **Pre-Deployment Checklist**

Sebelum deploy, pastikan:

- [ ] Build berhasil tanpa error
- [ ] Folder `dist/` ter-generate
- [ ] Semua file ter-upload ke server
- [ ] `.htaccess` atau `nginx.conf` sudah dikonfigurasi
- [ ] MIME types benar
- [ ] HTTPS enabled (SSL certificate)
- [ ] Domain pointed ke server
- [ ] Browser cache cleared

---

## 🚀 **Quick Deploy Commands**

```bash
# 1. Build
cd "d:\My Files\Developer\Project Caniel_Horizon AI"
npx vite build

# 2. Test build locally
npx vite preview --port 3000
# Buka: http://localhost:3000

# 3. Commit changes
git add .
git commit -m "build: Production build"
git push origin main

# 4. Upload ke server (FTP/SCP)
# atau deploy via Netlify/Vercel/GitHub Pages
```

---

## 📊 **File Structure After Build**

```
d:\My Files\Developer\Project Caniel_Horizon AI\
├── dist/                      # ← Upload folder ini ke server
│   ├── index.html            # ← Main HTML file
│   └── assets/
│       ├── index-22616081.css   # ← All CSS bundled
│       └── index-97bd39f9.js    # ← All JS bundled
│
├── src/                      # ← Source code (don't upload)
├── public/                   # ← Static assets
├── dist/                     # ← Build output (DEPLOY THIS)
└── package.json
```

---

## 🌐 **Server Requirements**

- **Web Server:** Apache 2.4+ atau Nginx 1.19+
- **PHP:** Tidak diperlukan (static site)
- **Node.js:** Tidak diperlukan di server (build di local)
- **Storage:** ~1 MB untuk build files
- **Bandwidth:** Minimal 100 KB/page load
- **SSL:** Recommended (HTTPS)

---

## 🎯 **Post-Deployment Testing**

Setelah deploy, test:

1. **Homepage:**
   ```
   https://caniel.my.id
   ```

2. **Blog:**
   ```
   https://caniel.my.id/blog
   ```

3. **CMS Login:**
   ```
   https://caniel.my.id/blog → Klik Login
   ```

4. **Console (F12):**
   - No errors
   - All files loaded (200 OK)
   - Correct MIME types

5. **Network Tab:**
   - index.html → text/html
   - .js files → application/javascript
   - .css files → text/css

---

## 📞 **Need Help?**

Jika masih ada masalah setelah deploy:

1. **Screenshot Console (F12)**
2. **Screenshot Network Tab**
3. **Beritahu URL lengkap**
4. **Hosting provider apa?** (cPanel, VPS, Netlify, dll)

---

**Last Updated:** 2024
**Status:** ✅ Production Ready
