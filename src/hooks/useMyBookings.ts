import { useQuery } from '@tanstack/react-query';
import API from '@/lib/api';

export const useMyBookings = () => {
  return useQuery({
    queryKey: ['my-bookings'],
    queryFn: async () => {
      const { data } = await API.get('/bookings/mybookings');
      return data;
    },
  });
};
