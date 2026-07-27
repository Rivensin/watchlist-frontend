'use client'
import { useRouter } from 'next/navigation';
import Modals from '@/components/shared/Modals';
import { CardContent } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import api from '@/lib/axios';
import { toast } from 'sonner';
import axios from 'axios';
import { MovieFormData, MovieSchema } from '@/lib/validators/movie';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const genres = ["Action","Adventure","Comedy","Drama","Fantasy","Horror","Sci-Fi","Thriller"]

function AddMovie() {
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting }} = useForm<MovieFormData>({
    resolver: zodResolver(MovieSchema),
    defaultValues: {
      title: "",
      overview: "",
      releaseYear: new Date().getFullYear(),
      genres: [],
      posterUrl: "",
    },
  });

  const overview = watch("overview")

  const queryClient = useQueryClient();

  const router = useRouter()

  const addMovieMutation = useMutation({
    mutationFn: async (data: MovieFormData) => {
      const response = await api.post("/movies/addMovie", data);

      return response.data;
    },

    onSuccess: () => {
      toast.success("Movie added!");

      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });

      reset()

      router.back();
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error ?? "Failed to add movie");
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const onSubmit = (data: MovieFormData) => {
    addMovieMutation.mutate(data);
  };

  // const onSubmit = async (data : MovieFormData) => {
  //   try {
  //     const response = await api.post("/movies/addMovie", data);

  //     toast.success("Movie added successfully!")
  //     router.back()

  //   } catch (error) {
  //     if(axios.isAxiosError(error)){
  //       toast.error("Adding movie failed", {
  //         description: error.response?.data?.error || "Something went wrong",
  //       })
  //     } else {
  //       toast.error('something went wrong')
  //     }
  //   }
  // };

  return (
    <Modals>
      <div        
        className='bg-white w-156 px-16 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-fit pt-11 pb-10'>  
        <div className='flex justify-between items-center font-cormorant text-3xl md:text-2xl 2xl:text-3xl pb-32'>
          <div>Add Movie</div>
          <button onClick={() => router.back()}>
            <div className='hover:border-b hover:border-gray-500 h-9.5'>Close</div>
          </button>
        </div>

        <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="title" className='text-2xl tracking-wide'>
              Title
            </Label>

            <Input
              {...register("title")}
              id="title"
              className='font-serif'
            />

            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="overview" className='text-2xl tracking-wide'>
              Overview <span className={` ${overview?.length === 120 || overview?.length < 1 ? 'text-red-300' : 'text-green-300'} `}>{overview?.length ?? 0} / 120 </span>
            </Label>

            <Textarea
              {...register("overview")}
              id="overview"
              rows={5}
              className='font-serif'
              maxLength={120}
            />

            {errors.overview && (
              <p className="text-sm text-red-500">{errors.overview.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="releaseYear" className='text-2xl tracking-wide'>
              Release Year
            </Label>

            <Input
              {...register("releaseYear",{
                valueAsNumber: true
              })}
              id="releaseYear"
              type='number'
            />

            {errors.releaseYear && (
              <p className="text-sm text-red-500">{errors.releaseYear.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="genres" className='text-2xl tracking-wide'>
              Genres
            </Label>

            <div className='grid grid-cols-3 gap-2'>
              {genres.map(genre => (
                <div key={genre} className='flex'>
                  <Label htmlFor="genres" className='w-15'>
                    {genre}
                  </Label>
                  
                  <Input
                    {...register("genres")}
                    id="genres"
                    value={genre}
                    type='checkbox'
                    className='w-22.5'
                  />    
                </div>            
              ))}
              
            </div>

            {errors.genres && (
              <p className="text-sm text-red-500">{errors.genres.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="posterUrl" className='text-2xl tracking-wide'>
              Cover URL <span className='text-sm'> <span className='text-red-300'>*</span>Please provide amazon prime link </span>
            </Label>

            <Input
              {...register("posterUrl")}
              id="posterUrl"
            />

            {errors.posterUrl && (
              <p className="text-sm text-red-500">{errors.posterUrl.message}</p>
            )}
          </div>

          <Button
            className="w-full"
            type="submit"
            disabled={addMovieMutation.isPending}
          >
            {addMovieMutation.isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </CardContent>
                   
      </div>
    </Modals>
  )
}

export default AddMovie