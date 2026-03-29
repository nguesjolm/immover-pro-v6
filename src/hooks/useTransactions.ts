import { useQuery } from '@tanstack/react-query';
import {
  fetchTotalTransactions,
  fetchTransactionBalance,
  fetchTransactions,
} from '../assets/api/fetchTransaction';

// Fetch transaction balance
export const useTransactionBalance = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['transactionsBalance'],
    queryFn: () => fetchTransactionBalance(),
  });

  return { 
    data: data?.data || [], 
    isLoading, 
    error, 
    refetch 
  };
};

// Fetch total transactions
export const useTotalTransactions = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['totalTransactions'],
    queryFn: () => fetchTotalTransactions(),
  });

  return { 
    data: data?.data || [], 
    isLoading, 
    error, 
    refetch 
  };
};

// Fetch transactions
export const useTransactions = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => fetchTransactions(),
  });

  return { 
    data: data?.data || [], 
    isLoading, 
    error, 
    refetch 
  };
};