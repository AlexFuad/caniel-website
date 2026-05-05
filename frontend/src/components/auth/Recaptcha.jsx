import React, { useState, useEffect, useRef } from 'react';
import { Shield, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Google reCAPTCHA v2 Component
 * 
 * Usage:
 * 1. Get your site key from: https://www.google.com/recaptcha/admin
 * 2. Add to .env: VITE_RECAPTCHA_SITE_KEY=your_site_key
 * 3. Add to index.html: <script src="https://www.google.com/recaptcha/api.js" async defer></script>
 * 
 * For testing without API key, component auto-falls back to mock mode
 */

const Recaptcha = ({ onVerify, onExpire, onError }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const [error, setError] = useState(null);
  const [isMockMode, setIsMockMode] = useState(false);
  const widgetIdRef = useRef(null);
  const containerRef = useRef(null);

  // reCAPTCHA site key dari environment variable
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    // Check if reCAPTCHA is available
    if (!RECAPTCHA_SITE_KEY) {
      console.warn('⚠️ VITE_RECAPTCHA_SITE_KEY not found. Using MOCK mode for development.');
      setIsMockMode(true);
      setIsLoading(false);
      return;
    }

    // Load reCAPTCHA script dynamically
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = initializeRecaptcha;
    script.onerror = () => {
      setError('Failed to load reCAPTCHA script');
      setIsLoading(false);
      setIsMockMode(true);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [RECAPTCHA_SITE_KEY]);

  const initializeRecaptcha = () => {
    if (typeof window.grecaptcha === 'undefined') {
      setError('reCAPTCHA not loaded');
      setIsLoading(false);
      return;
    }

    try {
      const widgetId = window.grecaptcha.render(containerRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: handleSuccess,
        'expired-callback': handleExpire,
        'error-callback': handleError,
        theme: 'dark',
        size: 'normal',
      });

      widgetIdRef.current = widgetId;
      setIsLoading(false);
    } catch (err) {
      setError('Failed to initialize reCAPTCHA');
      setIsLoading(false);
      setIsMockMode(true);
    }
  };

  const handleSuccess = (token) => {
    setIsVerified(true);
    setIsExpired(false);
    setError(null);
    onVerify(token);
  };

  const handleExpire = () => {
    setIsVerified(false);
    setIsExpired(true);
    setError('reCAPTCHA expired. Please try again.');
    if (onExpire) {
      onExpire();
    }
  };

  const handleError = () => {
    setIsVerified(false);
    setError('reCAPTCHA error. Please try again.');
    if (onError) {
      onError();
    }
  };

  const handleReset = () => {
    if (isMockMode) {
      setIsVerified(false);
      setIsExpired(false);
      setError(null);
      if (onExpire) onExpire();
      return;
    }

    if (widgetIdRef.current !== null && typeof window.grecaptcha !== 'undefined') {
      window.grecaptcha.reset(widgetIdRef.current);
      setIsVerified(false);
      setIsExpired(false);
      setError(null);
      if (onExpire) onExpire();
    }
  };

  // Mock mode for development/testing
  if (isMockMode) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-600 rounded-lg">
          <button
            type="button"
            onClick={() => {
              if (!isVerified) {
                setIsVerified(true);
                onVerify('mock-recaptcha-token');
              }
            }}
            disabled={isVerified}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
              isVerified
                ? 'bg-green-600/20 border border-green-500/50 text-green-400 cursor-default'
                : 'bg-slate-700 hover:bg-slate-600 border border-slate-600 text-gray-300 hover:text-white'
            }`}
          >
            {isVerified ? (
              <>
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Verified</span>
              </>
            ) : (
              <>
                <Shield className="h-5 w-5" />
                <span className="font-medium">I'm not a robot</span>
              </>
            )}
          </button>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-yellow-500/80 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            MOCK MODE - Development only
          </span>
          {isVerified && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-gray-400 hover:text-white h-6 px-2"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 p-4 bg-slate-800/50 border border-slate-600 rounded-lg">
        <div className="w-5 h-5 border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin" />
        <span className="text-sm text-gray-400">Loading reCAPTCHA...</span>
      </div>
    );
  }

  // Error state with fallback to mock
  if (error) {
    return (
      <div className="space-y-2">
        <div className="p-3 bg-red-600/20 border border-red-500/50 rounded-lg">
          <p className="text-sm text-red-400">{error}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsMockMode(true)}
          className="w-full border-slate-600 hover:bg-slate-700"
        >
          Continue with Mock Mode (Development)
        </Button>
      </div>
    );
  }

  // Normal reCAPTCHA widget
  return (
    <div className="space-y-2">
      <div 
        ref={containerRef}
        className="flex justify-center"
      />
      {isExpired && (
        <div className="flex items-center justify-center gap-2 text-sm text-red-400">
          <AlertCircle className="h-4 w-4" />
          <span>CAPTCHA expired. Please complete it again.</span>
        </div>
      )}
    </div>
  );
};

export default Recaptcha;
