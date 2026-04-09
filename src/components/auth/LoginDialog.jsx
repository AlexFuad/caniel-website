import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { useToast } from '@/components/ui/use-toast.js';
import { Eye, EyeOff, Shield, Lock, Mail, Loader2 } from 'lucide-react';
import Recaptcha from './Recaptcha.jsx';

const LoginDialog = ({ isOpen, onOpenChange, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLoginAttempt = async () => {
    if (!email.trim()) {
      toast({
        title: "Email Diperlukan",
        description: "Silakan masukkan alamat email Anda.",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Email Tidak Valid",
        description: "Format email yang Anda masukkan tidak valid.",
        variant: "destructive",
      });
      return;
    }

    if (!password) {
      toast({
        title: "Password Diperlukan",
        description: "Silakan masukkan password Anda.",
        variant: "destructive",
      });
      return;
    }

    if (!isRecaptchaVerified) {
      toast({
        title: "Verifikasi Diperlukan",
        description: "Silakan selesaikan verifikasi reCAPTCHA terlebih dahulu.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(async () => {
      const success = await onLogin(email, password, recaptchaToken);
      setIsLoading(false);

      if (success) {
        onOpenChange(false);
        setEmail('');
        setPassword('');
        setShowPassword(false);
        setRememberMe(false);
        setRecaptchaToken(null);
        setIsRecaptchaVerified(false);
        toast({
          title: "Login Berhasil!",
          description: "Selamat datang di CMS Admin!",
        });
      } else {
        setIsRecaptchaVerified(false);
        setRecaptchaToken(null);
        toast({
          title: "Login Gagal",
          description: "Email atau password yang Anda masukkan salah.",
          variant: "destructive",
        });
      }
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLoginAttempt();
    }
  };

  const handleRecaptchaVerify = (token) => {
    setRecaptchaToken(token);
    setIsRecaptchaVerified(true);
  };

  const handleRecaptchaExpire = () => {
    setRecaptchaToken(null);
    setIsRecaptchaVerified(false);
  };

  const handleDialogClose = (open) => {
    onOpenChange(open);
    if (!open) {
      // Reset form when dialog closes
      setEmail('');
      setPassword('');
      setShowPassword(false);
      setRememberMe(false);
      setRecaptchaToken(null);
      setIsRecaptchaVerified(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[450px] glass-effect text-white border border-slate-600/50 shadow-2xl">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-center mb-2">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-center gradient-text">Admin CMS Login</DialogTitle>
          <DialogDescription className="text-center text-gray-400">
            Masuk untuk mengakses panel administrasi CMS
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-slate-800/50 border-slate-600 focus:border-blue-500 h-11"
              placeholder="admin@caniel.my.id"
              autoComplete="email"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-slate-800/50 border-slate-600 focus:border-blue-500 h-11 pr-10"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-600 bg-slate-800/50"
              />
              <span className="text-gray-400">Ingat saya</span>
            </label>
            <button
              type="button"
              className="text-blue-400 hover:text-blue-300 transition-colors"
              onClick={() => toast({ title: "Info", description: "Hubungi administrator untuk reset password" })}
            >
              Lupa password?
            </button>
          </div>

          {/* reCAPTCHA Section */}
          <div className="space-y-2 pt-2">
            <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Keamanan
            </Label>
            <Recaptcha
              onVerify={handleRecaptchaVerify}
              onExpire={handleRecaptchaExpire}
              onError={() => {
                toast({
                  title: "reCAPTCHA Error",
                  description: "Gagal memuat reCAPTCHA. Menggunakan mode development.",
                  variant: "destructive",
                });
              }}
            />
          </div>
        </div>

        <DialogFooter className="flex-col gap-2">
          <Button
            onClick={handleLoginAttempt}
            disabled={isLoading || !isRecaptchaVerified}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-11 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Memproses...
              </>
            ) : (
              'Login'
            )}
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="w-full text-gray-400 hover:text-white"
          >
            Batal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;