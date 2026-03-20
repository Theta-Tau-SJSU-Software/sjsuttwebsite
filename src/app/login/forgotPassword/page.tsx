"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPasswordPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-[#141416] flex items-center justify-center p-4 pt-24">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-[#1c1c1e] w-full max-w-md p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-gray-800 relative overflow-hidden"
            >
                <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-[#fecb33]/10 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fecb33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </div>
                            </div>

                            <h1 className="text-3xl font-bold text-white text-center mb-2">
                                Reset Password
                            </h1>
                            <p className="text-gray-400 text-center mb-8">
                                Enter your email and we'll send you a reset link
                            </p>

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full bg-[#141416] border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#fecb33] focus:ring-1 focus:ring-[#fecb33] transition-colors"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#fecb33] text-black font-semibold rounded-lg px-4 py-3 mt-6 hover:bg-[#e6b62d] transition-colors transform active:scale-[0.98] cursor-pointer"
                                >
                                    Send Reset Link
                                </button>

                                <div className="flex justify-center mt-6">
                                    <Link
                                        href="/login"
                                        className="text-sm text-gray-400 hover:text-white transition-colors focus:outline-none flex items-center space-x-2"
                                    >
                                        <span>&larr;</span>
                                        <span>Back to Login</span>
                                    </Link>
                                </div>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="text-center"
                        >
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                </div>
                            </div>

                            <h1 className="text-3xl font-bold text-white mb-4">
                                Check Your Email
                            </h1>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                If there is an account associated with that email address, you will receive a reset link shortly.
                            </p>

                            <Link
                                href="/login"
                                className="inline-block w-full bg-gray-800 text-white font-semibold rounded-lg px-4 py-3 hover:bg-gray-700 transition-colors transform active:scale-[0.98]"
                            >
                                Return to Login
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}