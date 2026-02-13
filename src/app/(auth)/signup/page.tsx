'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, CheckCircle, AlertCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { requestOTP } from '@/lib/api';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form');
  const [error, setError] = useState<string | null>(null);
  const [userType, setUserType] = useState<'tenant' | 'owner'>('tenant');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: 'Andhra Pradesh',
    password: '',
    otpCode: '',
  });

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await requestOTP({ email: formData.email, purpose: 'signup' });
      setStep('otp');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
      
      await signup(
        formData.email,
        formData.password,
        fullName,
        formData.phone,
        userType,
        formData.city,
        formData.state,
        formData.otpCode
      );
      
      setStep('success');
      
      // Redirect to homepage after 2 seconds
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h2>
            <p className="text-gray-600 mb-6">
              Welcome to PropThinks! Your account has been successfully created and you're now logged in.
              {userType === 'tenant' ? ' Start searching for your perfect home.' : ' You can now list your properties.'}
            </p>
            <Button 
              onClick={() => router.push('/')}
              className="w-full bg-[#1fb6e0] hover:bg-[#1fb6e0]/90 text-white"
            >
              Go to Homepage
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'otp') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-6">
              <Link href="/" className="inline-block">
                <Image
                  src="/brand/logo-primary.png"
                  alt="PropThinks"
                  width={220}
                  height={56}
                  priority
                  className="h-10 w-auto"
                />
              </Link>
              <h2 className="mt-6 text-2xl font-bold text-gray-900">Verify Your Email</h2>
              <p className="mt-2 text-gray-600">
                We've sent a 6-digit code to <strong>{formData.email}</strong>
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 mb-4">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Code
                </label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  required
                  value={formData.otpCode}
                  onChange={(e) => setFormData({ ...formData, otpCode: e.target.value })}
                  className="text-center text-2xl tracking-widest"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1fb6e0] hover:bg-[#1fb6e0]/90 text-white"
                disabled={isLoading || formData.otpCode.length !== 6}
              >
                {isLoading ? 'Verifying...' : 'Verify and Create Account'}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ← Back to form
                </button>
                <span className="mx-2 text-gray-300">|</span>
                <button
                  type="button"
                  onClick={handleRequestOTP}
                  disabled={isLoading}
                  className="text-sm text-[#1fb6e0] hover:underline disabled:opacity-50"
                >
                  Resend code
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block relative flex-1">
        <Image
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"
          alt="Beautiful home"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b3c78]/80 to-[#1fb6e0]/60" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white max-w-md">
            <h3 className="text-3xl font-bold mb-4">Join PropThinks Today</h3>
            <p className="text-white/80 text-lg">
              Whether you're looking for a home or want to list your property, we've got you covered.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          <div className="mb-8">
            <Link href="/" className="inline-block">
              <Image
                src="/brand/logo-primary.png"
                alt="PropThinks"
                width={220}
                height={56}
                priority
                className="h-10 w-auto"
              />
            </Link>
            <h2 className="mt-8 text-3xl font-bold text-gray-900">Create your account</h2>
            <p className="mt-2 text-gray-600">
              Get started with PropThinks in minutes
            </p>
          </div>

          {/* User Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I am a...
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserType('tenant')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-colors ${
                  userType === 'tenant'
                    ? 'border-[#1fb6e0] bg-[#1fb6e0]/5 text-[#1fb6e0]'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                <User className="h-6 w-6 mb-1" />
                <span className="text-sm font-medium">Tenant</span>
                <span className="text-xs text-gray-400">Looking for a home</span>
              </button>
              <button
                type="button"
                onClick={() => setUserType('owner')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-colors ${
                  userType === 'owner'
                    ? 'border-[#1fb6e0] bg-[#1fb6e0]/5 text-[#1fb6e0]'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                <svg className="h-6 w-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-sm font-medium">Property Owner</span>
                <span className="text-xs text-gray-400">Want to list property</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleRequestOTP} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First name
                </label>
                <Input 
                  id="firstName" 
                  placeholder="John" 
                  autoComplete="given-name" 
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last name
                </label>
                <Input 
                  id="lastName" 
                  placeholder="Doe" 
                  autoComplete="family-name" 
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="9876543210"
                  className="pl-10"
                  autoComplete="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    id="city"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1fb6e0] focus:border-transparent"
                  >
                    <option value="">Select city</option>
                    <option value="Nellore">Nellore</option>
                    <option value="Guntur">Guntur</option>
                    <option value="Vijayawada">Vijayawada</option>
                    <option value="Tirupati">Tirupati</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <Input
                  id="state"
                  value="Andhra Pradesh"
                  disabled
                  className="bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 8 characters
              </p>
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                className="mt-1 h-4 w-4 text-[#1fb6e0] focus:ring-[#1fb6e0] border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                I agree to the{' '}
                <Link href="/terms" className="text-[#1fb6e0] hover:underline">Terms of Service</Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-[#1fb6e0] hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1fb6e0] hover:bg-[#1fb6e0]/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                'Sending verification code...'
              ) : (
                <>
                  Continue with Email Verification
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-[#1fb6e0] font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
