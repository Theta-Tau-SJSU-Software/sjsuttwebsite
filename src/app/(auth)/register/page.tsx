    'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    // TODO: Implement your registration logic here
    try {
      // Example: await register(formData);
      // router.push('/dashboard');
      console.log('Registration attempt:', formData);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#141416] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center">
            <Image 
              src="/images/logo.png" 
              alt="Theta Tau Logo" 
              width={80} 
              height={80}
              className="mb-4"
            />
          </Link>
          <h1 className="text-white text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-[#787e91]">Join the brotherhood</p>
        </div>

        {/* Registration Form */}
        <div className="bg-[#18181a] rounded-lg p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-white text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#141416] border border-white/10 rounded-lg text-white placeholder-[#787e91] focus:outline-none focus:border-[#fecb33] focus:ring-1 focus:ring-[#fecb33] transition-colors"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-white text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#141416] border border-white/10 rounded-lg text-white placeholder-[#787e91] focus:outline-none focus:border-[#fecb33] focus:ring-1 focus:ring-[#fecb33] transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#141416] border border-white/10 rounded-lg text-white placeholder-[#787e91] focus:outline-none focus:border-[#fecb33] focus:ring-1 focus:ring-[#fecb33] transition-colors"
                placeholder="your.email@sjsu.edu"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full px-4 py-3 bg-[#141416] border border-white/10 rounded-lg text-white placeholder-[#787e91] focus:outline-none focus:border-[#fecb33] focus:ring-1 focus:ring-[#fecb33] transition-colors"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-white text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full px-4 py-3 bg-[#141416] border border-white/10 rounded-lg text-white placeholder-[#787e91] focus:outline-none focus:border-[#fecb33] focus:ring-1 focus:ring-[#fecb33] transition-colors"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-[#fecb33] text-[#141416] rounded-full font-semibold hover:bg-[#fecb33]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating account...' : 'Register'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-[#787e91] text-sm">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="text-[#fecb33] hover:text-[#fecb33]/80 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link 
            href="/" 
            className="text-[#787e91] hover:text-white text-sm transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}