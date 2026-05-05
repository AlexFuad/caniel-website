# Deployment Guide for Hostinger

This guide explains how to deploy the Caniel Agency website monorepo to Hostinger.

## 📋 Prerequisites

- Hostinger account with Node.js hosting
- Domain configured
- SSH access (optional but recommended)
- Git installed locally

## 🚀 Deployment Steps

### 1. Prepare the Project

#### Build Frontend
```bash
cd frontend
npm install
npm run build
```

The build output will be in `frontend/dist/`

#### Prepare Backend
```bash
cd backend
npm install
```

### 2. Deploy Frontend to Hostinger

#### Option A: Via File Manager
1. Log in to Hostinger hPanel
2. Go to File Manager
3. Navigate to `public_html`
4. Upload all files from `frontend/dist/` to `public_html`
5. Upload `.htaccess` file to `public_html`

#### Option B: Via Git
1. Push your code to GitHub
2. In Hostinger hPanel, go to Git
3. Clone your repository
4. Build the frontend in the server
5. Copy build files to `public_html`

### 3. Deploy Backend to Hostinger

#### Option A: Via Node.js Application
1. In Hostinger hPanel, go to Hosting → Node.js
2. Click "Create Application"
3. Configure:
   - **Project root**: `backend`
   - **Application URL**: `api.yourdomain.com` (or subdirectory)
   - **Application startup file**: `src/index.js`
   - **Application mode**: Production
4. Click "Create"
5. Set up environment variables in the application settings
6. Upload backend files to the project root

#### Option B: Via SSH
1. Connect to your Hostinger server via SSH
2. Navigate to your project directory
3. Upload backend files
4. Install dependencies: `npm install`
5. Start the application

### 4. Configure Environment Variables

#### Frontend Environment
Create `frontend/.env`:
```
VITE_API_URL=https://your-domain.com/api
```

#### Backend Environment
Create `backend/.env`:
```
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-domain.com
```

In Hostinger Node.js application settings, add these variables.

### 5. Configure Domain

#### Frontend Domain
- Point your main domain to the frontend (public_html)
- The `.htaccess` file will handle React Router

#### Backend Domain
- Configure a subdomain (e.g., `api.yourdomain.com`) for the backend
- Or use a subdirectory path

### 6. Test Deployment

#### Test Frontend
1. Visit your domain
2. Check if all pages load correctly
3. Test language switching
4. Test theme toggle
5. Test navigation

#### Test Backend
1. Visit `https://api.yourdomain.com/health`
2. Should return: `{"status":"healthy","timestamp":"..."}`
3. Test API endpoints

## 🔧 Troubleshooting

### Frontend Issues

**404 Errors on Refresh**
- Ensure `.htaccess` is uploaded to `public_html`
- Check that mod_rewrite is enabled

**Styles Not Loading**
- Clear browser cache
- Check that CSS files are uploaded
- Verify file paths in index.html

**API Connection Errors**
- Check CORS configuration in backend
- Verify API URL in frontend .env
- Check backend is running

### Backend Issues

**Application Won't Start**
- Check Node.js version (should be >= 18)
- Verify all dependencies are installed
- Check error logs in Hostinger hPanel

**Port Already in Use**
- Use the port provided by Hostinger
- Update PORT in .env file

**CORS Errors**
- Update CORS_ORIGIN in backend .env
- Ensure frontend domain is whitelisted

## 📝 Maintenance

### Update Frontend
1. Make changes locally
2. Build: `cd frontend && npm run build`
3. Upload new build files to `public_html`
4. Clear cache

### Update Backend
1. Make changes locally
2. Commit and push to Git
3. In Hostinger, pull changes or upload files
4. Restart application in hPanel

## 🔒 Security

- Keep dependencies updated
- Use environment variables for sensitive data
- Enable HTTPS
- Regularly backup your database (if applicable)
- Monitor logs for suspicious activity

## 📊 Monitoring

### Hostinger Monitoring
- Use Hostinger's built-in monitoring tools
- Check application logs regularly
- Monitor resource usage

### Custom Monitoring
- Consider adding health check endpoints
- Set up uptime monitoring
- Implement error tracking

## 🔄 CI/CD (Optional)

For automated deployment, consider:
- GitHub Actions
- GitLab CI
- Hostinger's deployment hooks

Example GitHub Actions workflow can be added to `.github/workflows/deploy.yml`

## 📞 Support

For Hostinger-specific issues:
- Contact Hostinger support
- Check Hostinger documentation
- Use Hostinger community forums

For project-specific issues:
- Check project README
- Review code documentation
- Contact development team
