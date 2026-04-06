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

const LoginDialog = ({ isOpen, onOpenChange, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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

    setIsLoading(true);

    // Simulate network delay for better UX
    setTimeout(() => {
      const success = onLogin(email, password);
      setIsLoading(false);
      
      if (success) {
        onOpenChange(false);
        setEmail('');
        setPassword('');
        setShowPassword(false);
        setRememberMe(false);
      } else {
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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
        </div>
        
        <DialogFooter className="flex-col gap-2">
          <Button 
            onClick={handleLoginAttempt} 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-11 font-medium"
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