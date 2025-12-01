'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Error signing in with Google:', error);
      // You might want to show an error message to the user
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#141416]">
      <div className="p-8 bg-[#18181a] rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Login</h1>
        <button
          onClick={handleGoogleSignIn}
          className="px-4 py-2 bg-[#fecb33] text-[#141416] font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
