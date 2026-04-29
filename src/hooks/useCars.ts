import { useQuery } from '@tanstack/react-query';
import API from '@/lib/api';

export const useCars = (filters: any = {}) => {
  return useQuery({
    queryKey: ['cars', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });
      const { data } = await API.get(`/cars?${params.toString()}`);
      return data;
    },
  });
};

export const useCar = (id: string) => {
  return useQuery({
    queryKey: ['car', id],
    queryFn: async () => {
      const { data } = await API.get(`/cars/${id}`);
      return data;
    },
    enabled: !!id,
  });
};
