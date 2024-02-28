import {useQuery} from 'react-query';
import {
  fetchPreferences,
  fetchPreferencesById,
} from '../assets/api/fetchPreferences.api';

// Fetch Preferences
export const usePreferences = () => {
  const {data, isLoading, error, refetch} = useQuery('preferences', () =>
    fetchPreferences(),
  );

  return {data: data?.data || [], isLoading, error, refetch};
};

// Fetch Preferences by id
export const usePreferencesById = (id: any) => {
  const {data, isLoading, error, refetch} = useQuery(
    ['preferences', id],
    () => fetchPreferencesById({id}),
    {enabled: !!id},
  );

  return {data: data?.data || [], isLoading, error, refetch};
};
