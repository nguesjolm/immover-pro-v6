import {useQuery} from 'react-query';
import {fetchRequests} from '../assets/api/fetchRequests';

// Fetch requests
export const useRequests = () => {
  const {data, isLoading, error, refetch} = useQuery('requests', () =>
    fetchRequests(),
  );

  return {data: data?.data || [], isLoading, error, refetch};
};
