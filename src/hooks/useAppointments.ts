import {useQuery} from 'react-query';
import {fetchAppointmentsByStatus} from '../assets/api/fetchAppointment.api';

// Fetch Appointments by status
export const useAppointmentsByStatus = (status: string) => {
  const {data, isLoading, error, refetch} = useQuery(
    ['appointments', status],
    () => fetchAppointmentsByStatus(status),
  );

  return {data: data?.data || [], isLoading, error, refetch};
};

//Filtre les rendez-vous par status
export const useFormatedRdv = (data: any) => {
  const allRdv = data?.rdvData?.reduce((acc: any, item: any) => {
    const date = item?.date_visite || item?.created_at;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date]?.push(item);
    return acc;
  }, {});

  const allRdvFormated = Object?.keys(allRdv || [])?.map(date => {
    return {
      date,
      data: allRdv?.[date],
    };
  });

  return {allRdvFormated};
};
