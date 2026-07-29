'use client'
import { useParams, useRouter } from 'next/navigation';
import Modals from '@/components/shared/Modals';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';
import { toast } from 'sonner';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function DeleteMovieUser() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteMovieMutation = useMutation({
    mutationFn: async () => {
      const response = await api.delete(`/movies/${params.id}`);
      return response.data;
    },
    onSuccess: async () => {
      toast.success('Movie deleted');

      await queryClient.invalidateQueries({
        queryKey: ['moviesUser'],
      });

      await queryClient.invalidateQueries({
        queryKey: ['movies'],
      });

      router.back();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error ?? 'Failed to delete movie');
      } else {
        toast.error('Something went wrong');
      }
    },
  });

  return (
    <Modals>
      <div className="bg-white w-[90vw] max-w-md rounded-xl p-8 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Delete movie?</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this movie? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <Button
            className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            onClick={() => router.back()}
            disabled={deleteMovieMutation.isPending}
          >
            No
          </Button>

          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={() => deleteMovieMutation.mutate()}
            disabled={deleteMovieMutation.isPending}
          >
            {deleteMovieMutation.isPending ? 'Deleting...' : 'Yes'}
          </Button>
        </div>
      </div>
    </Modals>
  );
}

export default DeleteMovieUser;