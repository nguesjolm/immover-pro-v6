export const useFormatedRequests = (data: any) => {
  const allRequests = data?.demandeData?.reduce((acc: any, item: any) => {
    const date = item?.created_at.split('T')[0]?.split('-').reverse().join('/');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {}) || {};

  const allRequestsFormated = Object.keys(allRequests)?.map(date => {
    return {
      date,
      data: allRequests[date],
    };
  });

  return {allRequestsFormated};
};
