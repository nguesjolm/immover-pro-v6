import {useQuery} from 'react-query';
import {
  fetchTotalTransactions,
  fetchTransactionBalance,
  fetchTransactions,
} from '../assets/api/fetchTransaction';

// Fetch transaction balance
export const useTransactionBalance = () => {
  const {data, isLoading, error, refetch} = useQuery(
    'transactionsBalance',
    () => fetchTransactionBalance(),
  );

  return {data: data?.data || [], isLoading, error, refetch};
};

// Fetch total transactions
export const useTotalTransactions = () => {
  const {data, isLoading, error, refetch} = useQuery('totalTransactions', () =>
    fetchTotalTransactions(),
  );

  return {data: data?.data || [], isLoading, error, refetch};
};

// Fetch transactions
export const useTransactions = () => {
  const {data, isLoading, error, refetch} = useQuery('transactions', () =>
    fetchTransactions(),
  );

  return {data: data?.data || [], isLoading, error, refetch};
};
