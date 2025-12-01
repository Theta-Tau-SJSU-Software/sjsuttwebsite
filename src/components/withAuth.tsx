'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { ComponentType } from 'react';

export default function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithAuthComponent = (props: P) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !user) {
        router.replace('/login');
      }
    }, [user, isLoading, router]);

    if (isLoading) {
      return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (!user) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuthComponent;
}

function getDisplayName<P extends object>(WrappedComponent: ComponentType<P>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
