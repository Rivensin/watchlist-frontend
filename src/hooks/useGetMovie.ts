import { useQuery } from '@tanstack/react-query';
import { MovieProps } from '@/app/types/movie';
import api from '@/lib/axios';

function useGetMovie(id: string) {
  return useQuery<MovieProps>({
    queryKey: ["Movie", id],
    queryFn: async () => {
      const response = await api.get(`/movies/${id}`);
      
      return response.data;
    },
    enabled: !!id
  });
}

export default useGetMovie