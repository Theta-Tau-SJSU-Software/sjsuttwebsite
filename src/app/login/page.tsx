"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#141416] flex items-center justify-center p-4 pt-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-[#1c1c1e] w-full max-w-md p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-gray-800"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#fecb33]/10 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fecb33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Member Login
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Sign in to access your account
        </p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              className="w-full bg-[#141416] border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#fecb33] focus:ring-1 focus:ring-[#fecb33] transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              className="w-full bg-[#141416] border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#fecb33] focus:ring-1 focus:ring-[#fecb33] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-end mt-2">
            <Link href="/login/forgotPassword" className="text-sm text-[#fecb33] hover:text-[#e6b62d] transition-colors">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#fecb33] text-black font-semibold rounded-lg px-4 py-3 mt-6 hover:bg-[#e6b62d] transition-colors transform active:scale-[0.98] cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-800 pt-6">
          <p className="text-gray-400 text-sm">
            This portal is invite-only. If you need access, please contact the Executive Board.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
