import { useState, useEffect } from 'react';
import { useGetCurrentUserApiUsersMeGet } from '@/chamada';
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: user } = useGetCurrentUserApiUsersMeGet();

  useEffect(() => {
    const token = user?.is_verified;
    if (token) {
      setIsAuthenticated(true);
    }
  }, [user?.is_verified]);

  return { isAuthenticated, setIsAuthenticated, loading, setLoading };
};

