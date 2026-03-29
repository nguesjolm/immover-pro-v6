import { useQuery } from '@tanstack/react-query';
import { fetchAppointmentsByStatus } from '../assets/api/fetchAppointment.api';

// Fetch Appointments by status
export const useAppointmentsByStatus = (status: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['appointments', status],
    queryFn: () => fetchAppointmentsByStatus(status),
  });

  return { 
    data: data?.data || [], 
    isLoading, 
    error, 
    refetch 
  };
};

// Filtre les rendez-vous par status
export const useFormatedRdv = (data: any) => {
  // Vérification que data et rdvData existent
  if (!data?.rdvData) {
    return { allRdvFormated: [] };
  }

  const allRdv = data.rdvData.reduce((acc: any, item: any) => {
    const date = item?.date_visite || item?.created_at;
    if (date) {
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
    }
    return acc;
  }, {});

  const allRdvFormated = Object.keys(allRdv || {}).map(date => ({
    date,
    data: allRdv[date],
  }));

  return { allRdvFormated };
};