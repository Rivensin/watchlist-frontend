'use client'
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Image from 'next/image';
import Modals from '@/components/shared/Modals';
import { CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { WatchlistFormData, WatchlistSchema } from '@/lib/validators/watchlist';

const status = ["PLANNED", "WATCHING", "COMPLETED", "DROPPED"]

function EditWatchlist() {
  const router = useRouter()

  const params = useParams<{id: string}>()

  const [movie, setMovie] = useState({title: '', posterUrl: ''})

  const { register, handleSubmit, watch, reset, formState: { errors }} = useForm<WatchlistFormData>({
    resolver: zodResolver(WatchlistSchema),
    defaultValues: {
      status: "PLANNED",
      rating: 1,
      notes: "",      
    },
  });

  const notes = watch('notes')

  const queryClient = useQueryClient();

  const editWatchlistMutation = useMutation({
    mutationFn: async (data: WatchlistFormData) => {
    const response = await api.put(`/watchlist/${params.id}`, data);

    return response.data;
    },

    onSuccess: () => {
      toast.success("watchlist edited successfully!");

      queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });

      reset()

      router.back()
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error ?? "Failed to edit watchlist");
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const onSubmit = (data: WatchlistFormData) => {
    editWatchlistMutation.mutate(data); 
  };

  useEffect(() => {
    const WatchlistbyId = async() => {
      const response =  await api.get(`watchlist/${params.id}`)      

      setMovie(response.data.movie)
      reset(response.data)
    }

    if(params.id) WatchlistbyId()
  },[params.id,reset])

  return (
    <Modals>
      <div className='bg-white w-156 px-16 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-fit pt-11 pb-11'>  
        <div className='flex justify-between items-center font-cormorant text-3xl md:text-2xl 2xl:text-3xl pb-12'>
          <div>Edit Watchlist</div>
          <button onClick={() => router.back()}>
            <div className='hover:text-red-500 hover:border-b hover:border-gray-500 h-9.5'>Close</div>
          </button>
        </div>

        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2 text-2xl tracking-wide text-center">
              {movie?.title}
            </div>

            <div className='relative h-52'>
              {movie && (
                <Image 
                  src={movie.posterUrl} 
                  alt={movie.title} 
                  fill
                  priority
                  sizes='50vw'
                  className="object-cover" 
                />            
              )}            
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating" className='text-2xl tracking-wide'>
                Status
              </Label>

              <select
                {...register("status")}
                id="status"
                className='w-full rounded-md border border-gray-300 px-3 py-2 font-serif'
              >
                {status.map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              {errors.status && (
                <p className="text-sm text-red-500">{errors.status.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating" className='text-2xl tracking-wide'>
                Rating
              </Label>

              <select
                {...register("rating", { valueAsNumber: true })}
                id="rating"
                className='w-full rounded-md border border-gray-300 px-3 py-2 font-serif'
              >
                {Array.from({ length: 10 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>

              {errors.rating && (
                <p className="text-sm text-red-500">{errors.rating.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="overview" className='text-2xl tracking-wide'>
                Notes <span className={`${(notes?.length ?? 0) === 500 || (notes?.length ?? 0) < 1 ? 'text-red-300' : 'text-green-300'} `}>{notes?.length ?? 0} / 500 </span>
              </Label>

              <Textarea
                {...register("notes")}
                id="notes"
                rows={5}
                className='font-serif overflow-y-auto h-24'
                maxLength={500}
              />

              {errors.notes && (
                <p className="text-sm text-red-500">{errors.notes.message}</p>
              )}
            </div>

            <Button
              className="w-full py-6 mt-5"
              type="submit"
              disabled={editWatchlistMutation.isPending}
            >
              {editWatchlistMutation.isPending ? "Editing..." : "Edit"}
            </Button>
          </form>
        </CardContent>                    
      </div>
    </Modals>
    )
}

export default EditWatchlist