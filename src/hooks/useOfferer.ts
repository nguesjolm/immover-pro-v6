import {useQuery} from 'react-query';
import {fetchOfferer} from '../assets/api/auth.api';

// Fetch offerer detail
export const useOfferer = () => {
  const {data, isLoading, error, refetch} = useQuery('offerer', () =>
    fetchOfferer(),
  );

  return {data: data?.data || [], isLoading, error, refetch};
};
