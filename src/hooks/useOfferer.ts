import { useQuery } from '@tanstack/react-query';
import { fetchOfferer } from '../assets/api/auth.api';

// Fetch offerer detail
export const useOfferer = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['offerer'],
    queryFn: () => fetchOfferer(),
  });

  return { 
    data: data?.data || [], 
    isLoading, 
    error, 
    refetch 
  };
};