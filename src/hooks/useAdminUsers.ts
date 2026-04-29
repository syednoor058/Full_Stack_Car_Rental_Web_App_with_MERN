import { useQuery } from '@tanstack/react-query';
import API from '@/lib/api';

export const useAdminUsers = () => {
  return useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data } = await API.get('/users');
      return data;
    },
  });
};
