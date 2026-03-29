import { useQuery } from '@tanstack/react-query';
import {
  fetchWellById,
  fetchWellCategories,
  fetchWellCities,
  fetchWellOperations,
  fetchWellProposals,
  fetchWellStates,
  fetchWellTypes,
  fetchWells,
} from '../assets/api/fetchWells';
import { useSelector } from 'react-redux';
import React from 'react';

// Fetch Wells
export const useWells = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['wells'],
    queryFn: () => fetchWells(),
  });

  return { data: data?.data || [], isLoading, error, refetch };
};

// Fetch Well by id
export const useWell = (id: number | string | null) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['well', id],
    queryFn: () => fetchWellById(id),
    enabled: !!id,
  });

  return { data: data?.data || [], isLoading, error, refetch };
};

// Fetch Well categories
export const useWellCategories = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['wellCategories'],
    queryFn: () => fetchWellCategories(),
  });

  return { data: data?.data || [], isLoading, error, refetch };
};

// Filter by
export const useFilterWells = (data: any) => {
  const { categoriesSelected, statusSelected } = useSelector((s: any) => s.wellState);

  const wellsFiltered = React.useMemo(() => {
    if (data?.biens?.length > 0) {
      return data?.biens?.filter((item: any) => {
        const _well_ = item[0];

        if (categoriesSelected?.length > 0) {
          return (
            categoriesSelected?.includes(_well_?.details?.categoriesBiens_id) &&
            (_well_?.details?.statut === statusSelected ||
              _well_?.details?.pub === statusSelected)
          );
        } else {
          return (
            _well_?.details?.statut === statusSelected ||
            _well_?.details?.pub === statusSelected
          );
        }
      });
    }
    return [];
  }, [data, statusSelected, categoriesSelected]);

  return { wellsFiltered, categoriesSelected, statusSelected };
};

// Fetch Well proposals by request id
export const useWellProposals = (id: number | string | null) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['wellProposals', id],
    queryFn: () => fetchWellProposals(id),
    enabled: !!id,
  });

  return { data: data?.data || [], isLoading, error, refetch };
};

// Fetch Well operations
export const useOperations = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['operations'],
    queryFn: () => fetchWellOperations(),
  });
  return { data: data?.data || [], isLoading, error, refetch };
};

// Fetch Well types - CORRECTION: Changement de la queryKey
export const useWellTypes = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['wellTypes'], // Changé de 'operations' à 'wellTypes'
    queryFn: () => fetchWellTypes(),
  });
  return { data: data?.data || [], isLoading, error, refetch };
};

// Fetch Well cities
export const useWellCities = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['cities'],
    queryFn: () => fetchWellCities(),
  });
  return { data: data?.data || [], isLoading, error, refetch };
};

// Fetch Well states by city id
export const useWellStates = (id: number | string | null) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['states', id],
    queryFn: () => fetchWellStates(id),
    enabled: !!id,
  });
  return { data: data?.data || [], isLoading, error, refetch };
};