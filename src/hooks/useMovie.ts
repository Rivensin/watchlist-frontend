import { useQuery } from "@tanstack/react-query";
import { MovieProps } from "@/app/types/movie";
import api from "@/lib/axios";

function useMovie() {
  return useQuery<MovieProps[]>({
    queryKey: ["movies"],
    queryFn: async () => {
      const response = await api.get("/movies");
      
      return response.data;
    },
  });  
}

export default useMovie