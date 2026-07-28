import { useQuery } from "@tanstack/react-query";
import { User } from "@/app/types/user"
import api from "@/lib/axios";

function useProfile() {
  return useQuery<User>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get("/auth/profile");
      return response.data;
    },
  });
}

export default useProfile