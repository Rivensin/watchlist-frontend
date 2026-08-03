import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { toast } from 'sonner';
import axios from 'axios';

function useLogout() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
    const response = await api.post("/auth/logout");

    return response.data;
    },

    onSuccess: () => {
      toast.success("Logged out successfully!");

      queryClient.removeQueries({
        queryKey: ["profile"],
      });      
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error ?? "Failed to logout");
      } else {
        toast.error("Something went wrong");
      }
    },
  });
}
  
export default useLogout