import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '@/lib/api';

export const useAdminRentals = () => {
  return useQuery({
    queryKey: ['admin-rentals'],
    queryFn: async () => {
      const { data } = await API.get('/bookings');
      return data;
    },
  });
};

export const useUpdateRentalStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data } = await API.put(`/bookings/${id}/status`, { status });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-rentals'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    },
  });
};
