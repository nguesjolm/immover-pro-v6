export const useFormatedTrasactions = (data: any) => {
  const allTransactions = data?.transactions?.reduce((acc: any, item: any) => {
    const date = item?.date_transation;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date]?.push(item);
    return acc;
  }, {});

  const allTransactionsFormated = Object?.keys(allTransactions || [])?.map(
    date => {
      return {
        date,
        data: allTransactions?.[date],
      };
    },
  );

  return {allTransactionsFormated};
};
