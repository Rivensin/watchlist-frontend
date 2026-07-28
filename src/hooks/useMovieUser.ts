import { useQuery } from '@tanstack/react-query';
import { MovieProps } from '@/app/types/movie';
import api from '@/lib/axios';

function useMovieUser() {
  return useQuery<MovieProps[]>({
    queryKey: ["moviesUser"],
    queryFn: async () => {
      const response = await api.get("/movies/my-movies");
      
      return response.data;
    },
  });
}

export default useMovieUser