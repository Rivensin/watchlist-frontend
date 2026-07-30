import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { WatchlistProps } from "@/app/types/watchlist";

function useWatchlist() {
  return useQuery<WatchlistProps[]>({
    queryKey: ["watchlist"],
    queryFn: async () => {
      const response = await api.get("/watchlist/getWatchlist");
      
      return response.data;
    },
  });  
}

export default useWatchlist