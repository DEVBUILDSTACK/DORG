"use client";

import React, { useState } from 'react';
import { Eye, EyeOff, Github, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  [key: string]: string | undefined;
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Login attempt:', formData);
      alert('Login successful! Redirecting to dashboard...');
      setIsLoading(false);
      // Here you would typically redirect to dashboard
      // router.push('/dashboard');
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    alert(`${provider} login would be implemented here`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0C14] via-[#101120] to-[#0A0A0F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#00E0FF]/10 to-[#8B5CF6]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-[#8B5CF6]/10 to-[#00E0FF]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#00E0FF]/5 to-[#8B5CF6]/5 rounded-full blur-3xl" />
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-4 h-4 border border-[#00E0FF]/30 rotate-45 animate-bounce delay-300" />
        <div className="absolute top-40 right-32 w-6 h-6 border border-[#8B5CF6]/30 rounded-full animate-pulse delay-700" />
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-[#00E0FF]/20 rotate-12 animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-20 right-20 w-5 h-5 border border-[#8B5CF6]/20 animate-bounce delay-1000" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="relative group mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/30 to-[#8B5CF6]/30 rounded-3xl blur-xl animate-pulse" />
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#00E0FF] to-[#8B5CF6] rounded-3xl shadow-2xl shadow-[#00E0FF]/30">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00E0FF] to-[#8B5CF6] bg-clip-text text-transparent mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-lg">Sign in to your <span className="text-[#00E0FF] font-semibold">Learn2Launch</span> account</p>
        </div>

        {/* Glassmorphic Login Form */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/20 to-[#8B5CF6]/20 rounded-3xl blur-xl" />
          <div className="relative bg-black/40 backdrop-blur-2xl border border-[#00E0FF]/20 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-[#00E0FF] mb-3 font-mono">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-4 bg-black/20 border rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all backdrop-blur-sm hover:bg-black/30 ${
                      errors.email 
                        ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/70' 
                        : 'border-[#00E0FF]/30 focus:ring-[#00E0FF]/50 focus:border-[#00E0FF]/70'
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-2 font-mono">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-[#00E0FF] mb-3 font-mono">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-14 py-4 bg-black/20 border rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all backdrop-blur-sm hover:bg-black/30 ${
                      errors.password 
                        ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/70' 
                        : 'border-[#00E0FF]/30 focus:ring-[#00E0FF]/50 focus:border-[#00E0FF]/70'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00E0FF] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-2 font-mono">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-[#00E0FF] bg-black/20 border-[#00E0FF]/30 rounded focus:ring-2 focus:ring-[#00E0FF]/50 transition-all"
                  />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors font-mono">Remember me</span>
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-[#8B5CF6] hover:text-[#00E0FF] font-medium transition-colors font-mono"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-gradient-to-r from-[#00E0FF] to-[#8B5CF6] text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-[#00E0FF]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-mono text-lg group"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>
            </form>

            {/* Divider */}
            {/* <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black/40 text-gray-400 font-mono">Or continue with</span>
              </div>
            </div> */}

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              {/* <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="flex items-center justify-center space-x-3 w-full py-4 px-4 bg-black/20 border border-gray-600/30 rounded-2xl hover:bg-black/30 hover:border-[#00E0FF]/30 transition-all group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors font-mono">Google</span>
              </button> */}
              
              {/* <button
                type="button"
                onClick={() => handleSocialLogin('GitHub')}
                className="flex items-center justify-center space-x-3 w-full py-4 px-4 bg-black/20 border border-gray-600/30 rounded-2xl hover:bg-black/30 hover:border-[#8B5CF6]/30 transition-all group"
              >
                <Github className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors font-mono">GitHub</span>
              </button> */}
            </div>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-8">
          <p className="text-gray-400 font-mono">
            Don't have an account?{' '}
            <Link 
              href="/onBoarding" 
              className="text-[#00E0FF] hover:text-[#8B5CF6] font-medium transition-colors"
            >
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-10">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-[#00E0FF] rounded-full animate-pulse" />
            <p className="text-sm text-gray-500 font-mono">Powered by Decensat DAO</p>
            <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-pulse delay-500" />
          </div>
          <p className="text-xs text-gray-600 font-mono">Secure • Decentralized • Future-Ready</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
