# reCAPTCHA Implementation - Quick Reference

## 🎯 Arsitektur Login dengan reCAPTCHA

```
┌─────────────────────────────────────────────────────────────┐
│                     LOGIN FLOW                              │
└─────────────────────────────────────────────────────────────┘

User Input              Validation              Authentication
    │                        │                        │
    ├─► Email                │                        │
    ├─► Password             │                        │
    ├─► reCAPTCHA ──────────►│                        │
    │                        │                        │
    │                   ┌────▼────┐                   │
    │                   │ Check   │                   │
    │                   │ All     │                   │
    │                   │ Valid   │                   │
    │                   └────┬────┘                   │
    │                        │                        │
    │                    ┌───▼───┐                    │
    │                    │  OK?  │                    │
    │                    └───┬───┘                    │
    │                   Yes  │  No                    │
    │                   ┌────▼────┐                   │
    │                   │ Verify  │                   │
    │                   │ Creds   │                   │
    │                   └────┬────┘                   │
    │                        │                        │
    │                    ┌───▼───┐                    │
    │                    │ Match │                    │
    │                    └───┬───┘                    │
    │                   Yes  │  No                    │
    │                   ┌────▼────┐                   │
    │                   │ LOGIN   │                   │
    │                   │ SUCCESS │                   │
    │                   └─────────┘                   │
    │                                                 │
    └─────────────────────────────────────────────────┘
```

## 🔄 reCAPTCHA Component Flow

```
┌──────────────────────────────────────────────────────────┐
│              RECAPTCHA COMPONENT LIFECYCLE               │
└──────────────────────────────────────────────────────────┘

Mount
  │
  ├─► Check VITE_RECAPTCHA_SITE_KEY
  │
  ├─► Has Key? ──Yes──► Load Google Script
  │                     │
  │                     ├─► Success? ──Yes──► Render Widget
  │                     │                     │
  │                     │                     ├─► User Completes
  │                     │                     │
  │                     │                     └─► onVerify(token)
  │                     │
  │                     └─► No ──► Show Error
  │                               │
  │                               └─► Fallback to Mock
  │
  └─► No Key ──► Mock Mode
                 │
                 └─► User Clicks Button
                   │
                   └─► onVerify('mock-token')


## 📦 File Structure

```
src/
├── components/
│   └── auth/
│       ├── LoginDialog.jsx    ← Form dengan reCAPTCHA
│       └── Recaptcha.jsx      ← Komponen reCAPTCHA
│
├── context/
│   └── AuthContext.jsx        ← Login dengan token param
│
└── .env.example               ← Template configuration
```

## 🔑 Key Implementation Points

### 1. **Komponen Recaptcha** (`Recaptcha.jsx`)
```jsx
// Dual mode: Production vs Development
const isMockMode = !RECAPTCHA_SITE_KEY;

// Dynamic script loading
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://www.google.com/recaptcha/api.js';
  script.onload = initializeRecaptcha;
  document.head.appendChild(script);
}, []);

// Callbacks
const handleSuccess = (token) => onVerify(token);
const handleExpire = () => onExpire();
const handleError = () => onError();
```

### 2. **Login Form** (`LoginDialog.jsx`)
```jsx
// State management
const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
const [recaptchaToken, setRecaptchaToken] = useState(null);

// Validation before submit
if (!isRecaptchaVerified) {
  toast({ title: "Verifikasi Diperlukan", ... });
  return;
}

// Pass token ke AuthContext
const success = await onLogin(email, password, recaptchaToken);
```

### 3. **Auth Context** (`AuthContext.jsx`)
```jsx
// Accept token parameter
const login = async (email, password, recaptchaToken = null) => {
  // Log token untuk debugging
  if (recaptchaToken) {
    console.log('✓ reCAPTCHA token:', recaptchaToken);
  }
  
  // Validate credentials
  if (credentials match) {
    setIsAdmin(true);
    return true;
  }
  return false;
};
```

## 🎨 UI States Visual Guide

### State 1: Initial/Loading
```
┌─────────────────────────────────┐
│  Email: [________________]      │
│  Password: [________________]   │
│                                 │
│  ┌───────────────────────────┐ │
│  │  ⏳ Loading reCAPTCHA...  │ │
│  └───────────────────────────┘ │
│                                 │
│  [ LOGIN ] (disabled)           │
└─────────────────────────────────┘
```

### State 2: Mock Mode (No API Key)
```
┌─────────────────────────────────┐
│  Email: [admin@caniel.my.id]   │
│  Password: [•••••••••••]       │
│                                 │
│  Keamanan:                      │
│  ┌───────────────────────────┐ │
│  │  🛡️  I'm not a robot     │ │
│  └───────────────────────────┘ │
│  ⚠️ MOCK MODE - Development   │
│                                 │
│  [ LOGIN ] (enabled ✓)          │
└─────────────────────────────────┘
```

### State 3: Verified (Mock)
```
┌─────────────────────────────────┐
│  Email: [admin@caniel.my.id]   │
│  Password: [•••••••••••]       │
│                                 │
│  Keamanan:                      │
│  ┌───────────────────────────┐ │
│  │  ✅ Verified              │ │
│  └───────────────────────────┘ │
│  ⚠️ MOCK MODE - Development   │
│                                 │
│  [ LOGIN ] (enabled ✓)          │
└─────────────────────────────────┘
```

### State 4: Production Mode (Real reCAPTCHA)
```
┌─────────────────────────────────┐
│  Email: [admin@caniel.my.id]   │
│  Password: [•••••••••••]       │
│                                 │
│  Keamanan:                      │
│  ┌───────────────────────────┐ │
│  │  ☐ I'm not a robot       │ │
│  │     [reCAPTCHA logo]      │ │
│  │     Privacy · Terms       │ │
│  └───────────────────────────┘ │
│                                 │
│  [ LOGIN ] (disabled)           │
└─────────────────────────────────┘
```

### State 5: Verified (Production)
```
┌─────────────────────────────────┐
│  Email: [admin@caniel.my.id]   │
│  Password: [•••••••••••]       │
│                                 │
│  Keamanan:                      │
│  ┌───────────────────────────┐ │
│  │  ✓ I'm not a robot       │ │
│  │     [Green checkmark]     │ │
│  └───────────────────────────┘ │
│                                 │
│  [ LOGIN ] (enabled ✓)          │
└─────────────────────────────────┘
```

## ⚡ Quick Commands

### Development (Mock Mode):
```bash
# No .env needed
npm run dev

# Login form shows mock reCAPTCHA
# Click "I'm not a robot" button
# Login works
```

### Production (Real reCAPTCHA):
```bash
# Create .env file
echo "VITE_RECAPTCHA_SITE_KEY=your_key" > .env

# Restart dev server
npm run dev

# Login form shows real reCAPTCHA
# Complete Google challenge
# Login works
```

### Build for Production:
```bash
npm run build

# Deploy dengan .env di server
```

## 🔒 Security Checklist

### ✅ Implemented:
- [x] Client-side reCAPTCHA widget
- [x] Token generation
- [x] Token passed to AuthContext
- [x] Expire handling
- [x] Error fallback
- [x] Development mock mode

### ⚠️ Required for Production:
- [ ] Backend token validation
- [ ] Rate limiting
- [ ] IP blocking after failed attempts
- [ ] Logging & monitoring
- [ ] HTTPS only
- [ ] Secret key in backend

## 📊 Comparison: Mock vs Production

| Aspect | Mock Mode | Production Mode |
|--------|-----------|-----------------|
| **API Key** | Not needed | Required |
| **Internet** | Not required | Required |
| **Widget** | Custom button | Google widget |
| **Token** | `mock-recaptcha-token` | Real JWT token |
| **Validation** | None | Google servers |
| **Security** | Low | High |
| **Use Case** | Development | Production |
| **Cost** | Free | Free (up to 1M hits) |

## 🎓 How It Works

### What is reCAPTCHA?
reCAPTCHA adalah sistem challenge-response yang membedakan manusia dari bot.

### Flow Sederhana:
1. **User** menyelesaikan challenge (centang)
2. **Google** menghasilkan token
3. **Frontend** kirim token ke backend
4. **Backend** validasi ke Google
5. **Google** konfirmasi valid/tidak
6. **Backend** izinkan/tolak login

### Token Structure:
```
mock-recaptcha-token          ← Development
03AGdBq25SiX... (long string) ← Production
```

## 🐛 Debug Mode

Untuk melihat detail reCAPTCHA activity:

```javascript
// Di browser console:
localStorage.setItem('debug', 'recaptcha:*');

// Atau tambahkan di kode:
console.log('reCAPTCHA state:', {
  isVerified: isRecaptchaVerified,
  token: recaptchaToken,
  mode: isMockMode ? 'mock' : 'production'
});
```

---

**Last Updated**: 2024
**Status**: ✅ Production Ready (dengan backend validation)
