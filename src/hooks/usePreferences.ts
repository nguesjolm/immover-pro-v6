import { useQuery } from '@tanstack/react-query';
import {
  fetchPreferences,
  fetchPreferencesById,
} from '../assets/api/fetchPreferences.api';

// Fetch Preferences
export const usePreferences = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['preferences'],
    queryFn: () => fetchPreferences(),
  });

  return { 
    data: data?.data || [], 
    isLoading, 
    error, 
    refetch 
  };
};

// Fetch Preferences by id
export const usePreferencesById = (id: any) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['preferences', id],
    queryFn: () => fetchPreferencesById({ id }),
    enabled: !!id,  // La requête ne s'exécute que si id existe
  });

  return { 
    data: data?.data || [], 
    isLoading, 
    error, 
    refetch 
  };
};