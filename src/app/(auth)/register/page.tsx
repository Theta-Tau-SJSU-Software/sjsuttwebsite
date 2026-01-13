'use client';

import { HTMLInputTypeAttribute, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // useState objects for showing/hiding password characters
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwFocused, setPwFocused] = useState(false);
  const [cpwFocused, setCpwFocused] = useState(false);
  
  // reference to keep cursor at the end of the password when toggling show/hide
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmRef = useRef<HTMLInputElement | null>(null);
  const pwSelectionRef = useRef<{ start: number; end: number } | null>(null);
  const cpwSelectionRef = useRef<{ start: number; end: number } | null>(null);

  // helper function to keep cursor at end of password when toggling show/hide
  const toggleWithCaret = (
    inputRef: React.RefObject<HTMLInputElement | null>,
    selectionRef: React.RefObject<{ start: number; end: number } | null>,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const el = inputRef.current;
    if (!el) return;

    // saves selection reference before toggling
    selectionRef.current = {
      start: el.selectionStart ?? el.value.length,
      end: el.selectionEnd ?? el.value.length,
    };

    setShow(v => !v);

    // restores selection reference after toggling
    requestAnimationFrame(() => {
      const node = inputRef.current;
      const sel = selectionRef.current;
      if (!node || !sel) return;

      node.focus();
      node.setSelectionRange(sel.start, sel.end);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // keeps only digits for phone input
  const toDigits10 = (s: string) => s.replace(/\D/g, "").slice(0, 10);

  // reference to skip cursor past dash ('-') when deleting phone input
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const nextCaretPosRef = useRef<number | null>(null);

  // formats partial inputs e.g: 1, 12, 123, 123-4, 123-456, etc...
  const formatUSPhonePartial = (digits: string) => {
    const a = digits.slice(0, 3);
    const b = digits.slice(3, 6);
    const c = digits.slice(6, 10);
    
    if (digits.length <= 3) return a;
    if (digits.length <= 6) return `${a}-${b}`;
    return `${a}-${b}-${c}`;
  };

  // given the number of digits before the caret, return the caret index in formatted string
  const caretIndexFromDigitCount = (digitCount: number) => {
    // after 3 digits insert 1 dash, 6 digits 2 dashes
    if (digitCount <= 3) return digitCount;
    if (digitCount <= 6) return digitCount + 1;
    return digitCount + 2;
  }

  // to keep track of number of digits before a given caret in a formatted string
  const digitCountBeforeCaret = (value: string, caret: number) => 
    value.slice(0, caret).replace(/\D/g,"").length;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const raw = input.value;
    const caret = input.selectionStart ?? raw.length;

    const digitsBeforeCaret = digitCountBeforeCaret(raw, caret)
    const digits = toDigits10(raw);
    const formatted = formatUSPhonePartial(digits);

    const newCaret = caretIndexFromDigitCount(digitsBeforeCaret);
    nextCaretPosRef.current = Math.min(newCaret, formatted.length);

    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const value = input.value;
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;

    if (start != end) return;

    if (e.key !== "Backspace" && e.key !== "Delete") return;

    // checks if caret is at a dash when hitting backspace/delete --> delete a digit instead
    const isDash = (idx: number) => value[idx] === "-";

    if (e.key == "Backspace" && start > 0 && isDash(start - 1)) {
      e.preventDefault();

      const digits = toDigits10(value);
      const digitPos = digitCountBeforeCaret(value, start);
      const removeIndex = Math.max(0, digitPos - 1);

      const newDigits = digits.slice(0, removeIndex) + digits.slice(removeIndex + 1);
      const newFormatted = formatUSPhonePartial(newDigits);

      nextCaretPosRef.current = caretIndexFromDigitCount(removeIndex);
      setFormData(prev => ({ ...prev, phone: newFormatted }));
      return;
    }

    if (e.key === "Delete" && start < value.length && isDash(start)) {
      e.preventDefault();

      const digits = toDigits10(value);
      const digitPos = digitCountBeforeCaret(value, start);
      const removeIndex = Math.max(0, digitPos - 1);

      const newDigits = digits.slice(0, removeIndex) + digits.slice(removeIndex + 1);
      const newFormatted = formatUSPhonePartial(newDigits);

      nextCaretPosRef.current = caretIndexFromDigitCount(removeIndex);
      setFormData(prev => ({ ...prev, phone: newFormatted }));
      return;
    }
  }
  
  // useEffect function to rerender phone data properly
  useEffect(() => {
    const pos = nextCaretPosRef.current;
    const el = phoneInputRef.current;

    if (pos != null && el) {
      requestAnimationFrame(() => {
        el.setSelectionRange(pos, pos);
      });
    }

    nextCaretPosRef.current = null;
  }, [formData.phone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const normalizedPhone = formData.phone.replace(/\D/g, "");

    if (normalizedPhone.length > 0) {
      if (normalizedPhone.length != 10) {
        setError('Phone number must be 10 digits');
        return;
      }
    }

    setIsLoading(true);

    // TODO: Implement your registration logic here
    try {
      // Example: await register(formData);
      // router.push('/dashboard');
      const payload = {
        ...formData,
        phone: normalizedPhone,
      };
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
                autoComplete='email'
                className="w-full px-4 py-3 bg-[#141416] border border-white/10 rounded-lg text-white placeholder-[#787e91] focus:outline-none focus:border-[#fecb33] focus:ring-1 focus:ring-[#fecb33] transition-colors"
                placeholder="your.email@gmail.com"
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label htmlFor="phone" className="block text-white text-sm font-medium mb-2">
                Phone (optional)
              </label>
              <input
                ref={phoneInputRef}
                id="phone"
                name="phone"
                type="tel"
                inputMode='numeric'
                value={formData.phone}
                onChange={handlePhoneChange}
                onKeyDown={handlePhoneKeyDown}
                className="w-full px-4 py-3 bg-[#141416] border border-white/10 rounded-lg text-white placeholder-[#787e91] focus:outline-none focus:border-[#fecb33] focus:ring-1 focus:ring-[#fecb33] transition-colors"
                placeholder="XXX-XXX-XXXX"
              />
              <p className='mt-1 text-xs text-[#787e91]'>
                10 digits. Auto-formats.
              </p>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setPwFocused(true)}
                  onBlur={() => {
                    setPwFocused(false);
                    setShowPassword(false); // hide reveal when they click off
                  }}
                  required
                  minLength={8}
                  className="w-full pr-12 px-4 py-3 bg-[#141416] border border-white/10 rounded-lg text-white placeholder-[#787e91] focus:outline-none focus:border-[#fecb33] focus:ring-1 focus:ring-[#fecb33] transition-colors"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />

                {(pwFocused && formData.password.length > 0) && (
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    // IMPORTANT: prevents input losing focus when clicking the button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => toggleWithCaret(passwordRef, pwSelectionRef, setShowPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      // eye-off
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="block">
                        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path
                          d="M10.6 10.6a3 3 0 004.24 4.24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M9.88 5.09A10.7 10.7 0 0112 5c5.05 0 9.27 3.11 11 7-0.5 1.12-1.23 2.17-2.15 3.09M6.1 6.1C4.35 7.34 3.02 9.1 2 12c1.73 3.89 5.95 7 10 7 1.5 0 2.92-.24 4.23-.68"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      // eye
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="block">
                        <path
                          d="M2 12c1.73-3.89 5.95-7 10-7s8.27 3.11 10 7c-1.73 3.89-5.95 7-10 7s-8.27-3.11-10-7z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-white text-sm font-medium mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  ref={confirmRef}
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setCpwFocused(true)}
                  onBlur={() => {
                    setCpwFocused(false);
                    setShowConfirm(false);
                  }}
                  required
                  minLength={8}
                  className="w-full pr-12 px-4 py-3 bg-[#141416] border border-white/10 rounded-lg text-white placeholder-[#787e91] focus:outline-none focus:border-[#fecb33] focus:ring-1 focus:ring-[#fecb33] transition-colors"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />

                {(cpwFocused && formData.confirmPassword.length > 0) && (
                  <button
                    type="button"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => toggleWithCaret(confirmRef, cpwSelectionRef, setShowConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                  >
                    {/* reuse same SVGs as above */}
                    {showConfirm ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="block">
                        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M10.6 10.6a3 3 0 004.24 4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path
                          d="M9.88 5.09A10.7 10.7 0 0112 5c5.05 0 9.27 3.11 11 7-0.5 1.12-1.23 2.17-2.15 3.09M6.1 6.1C4.35 7.34 3.02 9.1 2 12c1.73 3.89 5.95 7 10 7 1.5 0 2.92-.24 4.23-.68"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="block">
                        <path
                          d="M2 12c1.73-3.89 5.95-7 10-7s8.27 3.11 10 7c-1.73 3.89-5.95 7-10 7s-8.27-3.11-10-7z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
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