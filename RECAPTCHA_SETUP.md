# reCAPTCHA Integration - Blog CMS Login Security

## 📋 Ringkasan

reCAPTCHA v2 (Checkbox) telah ditambahkan ke modul login admin CMS untuk melindungi dari serangan brute force dan bot automation.

## 🔧 File yang Dibuat/Dimodifikasi

### File Baru:
1. **`src/components/auth/Recaptcha.jsx`** - Komponen reCAPTCHA reusable

### File yang Dimodifikasi:
1. **`src/components/auth/LoginDialog.jsx`** - Menambahkan reCAPTCHA ke form login
2. **`src/context/AuthContext.jsx`** - Menambahkan parameter reCAPTCHA token

## 🎯 Fitur Utama

### 1. **Dual Mode Operation**

#### Production Mode (dengan API Key):
```env
VITE_RECAPTCHA_SITE_KEY=your_google_recaptcha_site_key
```
- Menggunakan Google reCAPTCHA v2 yang sebenarnya
- Widget checkbox "I'm not a robot"
- Token validation real
- Auto-expire handling

#### Development Mode (tanpa API Key):
- Mock reCAPTCHA yang tetap berfungsi
- Tombol "I'm not a robot" sederhana
- Tidak memerlukan API key
- Warning indicator "MOCK MODE"
- Dapat di-reset untuk testing

### 2. **Auto-Fallback Mechanism**

Komponen secara otomatis beralih ke mock mode jika:
- `VITE_RECAPTCHA_SITE_KEY` tidak diset
- Script gagal dimuat dari Google
- Error saat inisialisasi widget

### 3. **Dynamic Script Loading**
- Script reCAPTCHA dimuat secara dinamis
- Tidak memblokir rendering awal
- Proper cleanup pada unmount

### 4. **User Experience**

#### State Handling:
- **Loading**: Spinner dengan pesan "Loading reCAPTCHA..."
- **Error**: Pesan error + opsi fallback ke mock mode
- **Expired**: Notifikasi + tombol reset
- **Verified**: UI hijau + centang
- **Mock Mode**: Yellow warning badge

## 🚀 Cara Menggunakan

### Step 1: Dapatkan reCAPTCHA Keys (Opsional)

1. Kunjungi: https://www.google.com/recaptcha/admin
2. Buat project baru
3. Pilih **reCAPTCHA v2** → **"I'm not a robot" Checkbox**
4. Tambahkan domain Anda:
   - Development: `localhost`
   - Production: `caniel.my.id`
5. Copy **Site Key** dan **Secret Key**

### Step 2: Konfigurasi Environment

Buat file `.env` di root project:

```env
# Google reCAPTCHA Configuration
VITE_RECAPTCHA_SITE_KEY=6LcXXXXXXXXXXXXXXXXXXXXXXXX
```

⚠️ **PENTING**: 
- Jangan commit `.env` ke Git
- Tambahkan `.env` ke `.gitignore`
- Secret Key TIDAK diperlukan di frontend (hanya untuk backend validation)

### Step 3: Production Backend Validation (Optional)

Untuk validasi penuh, buat endpoint backend:

```javascript
// Example: Node.js/Express backend
app.post('/api/verify-recaptcha', async (req, res) => {
  const { token } = req.body;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`
    }
  );
  
  const data = await response.json();
  res.json(data);
});
```

## 🎨 Komponen Recaptcha

### Props:

```jsx
<Recaptcha
  onVerify={(token) => {
    // Dipanggil saat reCAPTCHA berhasil
    console.log('Token:', token);
  }}
  onExpire={() => {
    // Dipanggil saat reCAPTCHA expire
    console.log('Expired');
  }}
  onError={() => {
    // Dipanggil saat error
    console.log('Error');
  }}
/>
```

### Return Values:

- **onVerify(token)**: reCAPTCHA token string
- **onExpire()**: Callback untuk reset form
- **onError()**: Callback untuk error handling

## 🔒 Security Features

### Yang Sudah Diimplementasikan:

✅ **Client-side reCAPTCHA**
- Mencegah basic bot automation
- Melindungi dari brute force sederhana
- Mock mode untuk development

### Yang Perlu Ditambahkan (Production):

⚠️ **Server-side Validation**
```javascript
// Frontend kirim token ke backend
const response = await fetch('/api/verify-recaptcha', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token: recaptchaToken })
});

const data = await response.json();
if (data.success) {
  // Lanjutkan login
}
```

⚠️ **Rate Limiting**
- Batasi percobaan login per IP
- Contoh: 5 attempts per 15 minutes

⚠️ **Token Expiration Check**
- reCAPTCHA token expire dalam 2 menit
- Validasi timestamp di backend

## 🧪 Testing

### Test Mock Mode (Default):
```bash
npm run dev
```
- Buka login form
- Lihat warning "MOCK MODE"
- Klik "I'm not a robot"
- Login akan aktif setelah verified

### Test Production Mode:
```env
# .env
VITE_RECAPTCHA_SITE_KEY=your_real_key
```
- Restart dev server
- Widget Google reCAPTCHA muncul
- Complete the challenge
- Token akan di-generate

### Test Error Handling:
```javascript
// Di Recaptcha.jsx, sementara disable script loading
script.onerror = () => { ... }
```
- Lihat error message
- Klik "Continue with Mock Mode"

## 🎯 Flow Login dengan reCAPTCHA

```
1. User buka Login Dialog
2. User isi email & password
3. User selesaikan reCAPTCHA
   ├─ Success → Token generated
   ├─ Expired → User ulangi
   └─ Error → Fallback ke mock
4. Klik "Login"
5. Validasi:
   ├─ Email ✓
   ├─ Password ✓
   └─ reCAPTCHA verified ✓
6. Kirim ke AuthContext dengan token
7. Login success/fail
8. Reset form jika gagal (require re-CAPTCHA)
```

## 🖼️ UI States

### 1. Loading State:
```
┌─────────────────────────────────┐
│  ⏳ Loading reCAPTCHA...        │
└─────────────────────────────────┘
```

### 2. Mock Mode (Development):
```
┌─────────────────────────────────┐
│  🛡️  I'm not a robot           │
└─────────────────────────────────┘
⚠️ MOCK MODE - Development only [Reset]
```

### 3. Verified State:
```
┌─────────────────────────────────┐
│  ✅ Verified                    │
└─────────────────────────────────┘
⚠️ MOCK MODE - Development only [Reset]
```

### 4. Error State:
```
┌─────────────────────────────────┐
│  ❌ Failed to load reCAPTCHA    │
└─────────────────────────────────┘
[Continue with Mock Mode (Development)]
```

### 5. Production Mode (Real reCAPTCHA):
```
┌─────────────────────────────────┐
│  [ ] I'm not a robot            │
│     reCAPTCHA - Privacy - Terms │
└─────────────────────────────────┘
```

## 📊 Integration Status

| Fitur | Status | Keterangan |
|-------|--------|------------|
| Komponen reCAPTCHA | ✅ Complete | Dual mode (mock + production) |
| Login Form Integration | ✅ Complete | Validasi sebelum submit |
| Token Handling | ✅ Complete | Save & pass ke AuthContext |
| Expire Handling | ✅ Complete | Auto-reset form |
| Error Fallback | ✅ Complete | Fallback ke mock mode |
| UI/UX | ✅ Complete | Loading, error, verified states |
| Backend Validation | ⚠️ TODO | Perlu endpoint terpisah |
| Rate Limiting | ⚠️ TODO | Perlu middleware |

## 🔐 Best Practices

### DO:
✅ Selalu validasi reCAPTCHA di backend untuk production
✅ Gunakan environment variables untuk keys
✅ Handle expiration dengan baik
✅ Berikan fallback untuk development
✅ Log reCAPTCHA failures untuk monitoring

### DON'T:
❌ Jangan hardcode Secret Key di frontend
❌ Jangan skip validasi token di backend
❌ Jangan gunakan mock mode di production
❌ Jangan simpan token (sekali pakai)
❌ Jangan block UI saat loading reCAPTCHA

## 🐛 Troubleshooting

### "reCAPTCHA not loaded" Error:
**Solusi**: 
- Check internet connection
- Verify site key benar
- Check browser tidak block Google scripts

### "Invalid site key" Error:
**Solusi**:
- Pastikan site key untuk reCAPTCHA v2 (bukan v3)
- Verify domain terdaftar di Google admin
- Check tidak ada typo di `.env`

### Mock Mode Tidak Muncul:
**Solusi**:
- Hapus `VITE_RECAPTCHA_SITE_KEY` dari `.env`
- Restart dev server: `npm run dev`
- Clear browser cache

### Token Tidak Terkirim:
**Solusi**:
- Check console.log di AuthContext
- Verify `onVerify` callback dipanggil
- Check network tab untuk API calls

## 📚 Resources

- Google reCAPTCHA: https://www.google.com/recaptcha/
- Admin Console: https://www.google.com/recaptcha/admin
- Documentation: https://developers.google.com/recaptcha
- v2 Checkbox Guide: https://developers.google.com/recaptcha/docs/display

## 🎓 Next Steps

Untuk security production yang lebih baik:

1. **Implement Backend Validation**
   - Buat endpoint `/api/verify-recaptcha`
   - Validasi token dengan Secret Key
   - Return success/failure

2. **Add Rate Limiting**
   - Gunakan `express-rate-limit`
   - Limit 5 login attempts per 15 minutes
   - Block IP setelah max attempts

3. **Add Logging & Monitoring**
   - Log semua failed login attempts
   - Monitor reCAPTCHA failure rate
   - Alert jika ada suspicious activity

4. **Consider reCAPTCHA v3**
   - Invisible to users
   - Score-based (0.0 - 1.0)
   - Better UX tapi lebih kompleks

5. **Add 2FA (Two-Factor Authentication)**
   - Tambahkan OTP via email/SMS
   - Authenticator app support
   - Backup codes

---

**Status**: ✅ Ready for Development | ⚠️ Backend Validation Required for Production
