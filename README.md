# Caniel Agency Website - Monorepo

A full-stack monorepo project for Caniel Agency website with React frontend and Node.js backend, optimized for Hostinger deployment.

## 📁 Project Structure

```
project/
├── frontend/                 # React + Vite frontend application
│   ├── src/                 # Source code
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   ├── postcss.config.js    # PostCSS configuration
│   ├── vite.config.js       # Vite configuration
│   └── .env                 # Frontend environment variables
├── backend/                 # Node.js + Express backend API
│   ├── src/                # Backend source code
│   │   └── index.js        # Main server file
│   ├── routes/             # API routes
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── package.json        # Backend dependencies
│   └── .env                # Backend environment variables
├── package.json            # Root package.json for monorepo
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. Clone the repository
2. Install all dependencies:
```bash
npm run install:all
```

### Development

Run both frontend and backend in development mode:
```bash
npm run dev
```

Run frontend only:
```bash
npm run dev:frontend
```

Run backend only:
```bash
npm run dev:backend
```

### Production Build

Build both frontend and backend:
```bash
npm run build
```

Build frontend only:
```bash
npm run build:frontend
```

Build backend only:
```bash
npm run build:backend
```

### Production Start

Start both frontend and backend:
```bash
npm start
```

Start frontend only:
```bash
npm run start:frontend
```

Start backend only:
```bash
npm run start:backend
```

## 🌐 Frontend (React + Vite)

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Context API
- **Animations**: Framer Motion
- **UI Components**: Radix UI + shadcn/ui

### Frontend Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔧 Backend (Node.js + Express)

- **Framework**: Express.js
- **Type**: ES Modules
- **Security**: Helmet, CORS
- **Logging**: Morgan
- **Environment**: dotenv

### Backend Scripts

- `npm run dev` - Start development server with hot reload (port 5000)
- `npm start` - Start production server
- `npm run build` - No build step required

## 📦 Deployment (Hostinger)

### Frontend Deployment

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Upload the `frontend/dist` folder to Hostinger's public_html directory

3. Configure .htaccess for SPA routing (if needed)

### Backend Deployment

1. Upload backend files to Hostinger
2. Set up Node.js application in Hostinger control panel
3. Configure environment variables
4. Set the startup file to `backend/src/index.js`
5. Set the port (usually provided by Hostinger)

### Environment Variables

**Frontend (.env):**
```
VITE_API_URL=https://your-domain.com/api
```

**Backend (.env):**
```
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-domain.com
```

## 🔑 Features

### Frontend
- ✅ Bilingual support (Indonesian/English)
- ✅ Dark/Light theme toggle
- ✅ Responsive design
- ✅ Modern UI with animations
- ✅ SEO optimized
- ✅ Fast performance with Vite

### Backend
- ✅ RESTful API structure
- ✅ Security middleware
- ✅ CORS enabled
- ✅ Error handling
- ✅ Logging
- ✅ Environment configuration

## 📝 Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run dev` | Run both frontend and backend in development |
| `npm run dev:frontend` | Run frontend only (port 3000) |
| `npm run dev:backend` | Run backend only (port 5000) |
| `npm run build` | Build both frontend and backend |
| `npm run build:frontend` | Build frontend only |
| `npm run build:backend` | Build backend only |
| `npm start` | Start both frontend and backend in production |
| `npm run start:frontend` | Start frontend preview only |
| `npm run start:backend` | Start backend server only |
| `npm run install:all` | Install dependencies for all packages |

## 🛠️ Technology Stack

### Frontend
- React 18
- Vite 4
- Tailwind CSS 3
- React Router 6
- Framer Motion
- Radix UI
- Lucide Icons

### Backend
- Node.js 18+
- Express 4
- ES Modules
- Helmet
- CORS
- Morgan
- dotenv

## 📄 License

Private project for Caniel Agency

## 👥 Support

For support, contact the development team.
