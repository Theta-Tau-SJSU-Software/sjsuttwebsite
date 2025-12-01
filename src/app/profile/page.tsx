'use client';

import { useAuth } from '@/contexts/AuthContext';
import withAuth from '@/components/withAuth';

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#141416]">
      <div className="p-8 bg-[#18181a] rounded-lg shadow-lg text-white">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        {user && (
          <div>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user.id}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default withAuth(ProfilePage);
