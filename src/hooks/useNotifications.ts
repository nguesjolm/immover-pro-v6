import { useQuery } from '@tanstack/react-query';
import {
  fetchNotifications,
  getNewNotificationsCount,
} from '../assets/api/fetchNotifications';

// Fetch Notifications
export const useNotifications = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => fetchNotifications(),
  });

  return { 
    data: data?.data || [], 
    isLoading, 
    error, 
    refetch 
  };
};

// Get new notifications count
export const useNewNotificationsCount = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['newNotificationsCount', 'notifications'],
    queryFn: () => getNewNotificationsCount(),
  });

  return { 
    data: data?.data || [], 
    isLoading, 
    error, 
    refetch 
  };
};