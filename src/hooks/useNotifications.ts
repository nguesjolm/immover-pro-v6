import {useQuery} from 'react-query';
import {
  fetchNotifications,
  getNewNotificationsCount,
} from '../assets/api/fetchNotifications';

// Fetch Notifications
export const useNotifications = () => {
  const {data, isLoading, error, refetch} = useQuery(['notifications'], () =>
    fetchNotifications(),
  );

  return {data: data?.data || [], isLoading, error, refetch};
};

// Get new notifications count
export const useNewNotificationsCount = () => {
  const {data, isLoading, error, refetch} = useQuery(
    ['newNotificationsCount', 'notifications'],
    () => getNewNotificationsCount(),
  );

  return {data: data?.data || [], isLoading, error, refetch};
};
