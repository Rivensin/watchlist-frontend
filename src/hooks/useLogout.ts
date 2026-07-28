import { useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';

function useLogout() {
  const queryClient = useQueryClient();
  
  const logout = async() => {
    await api.post("/auth/logout");

    queryClient.removeQueries({
      queryKey: ["profile"],
    });
  } 
  
  return logout
  }


export default useLogout