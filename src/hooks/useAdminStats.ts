import { useQuery } from '@tanstack/react-query';
import API from '@/lib/api';

export const useAdminStats = () => {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const { data } = await API.get('/stats');
      return data;
    },
  });
};
