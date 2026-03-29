import { useQuery } from '@tanstack/react-query';
import { fetchRequests } from '../assets/api/fetchRequests';

// Fetch requests
export const useRequests = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['requests'],
    queryFn: () => fetchRequests(),
  });

  return { 
    data: data?.data || [], 
    isLoading, 
    error, 
    refetch 
  };
};