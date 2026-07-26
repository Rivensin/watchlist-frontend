'use client'
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modals from '@/components/shared/Modals';
import { CardContent } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';
import { toast } from 'sonner';
import axios from 'axios';
import { MovieProps } from '@/app/types/movie';
import { MovieFormData, MovieSchema } from '@/lib/validators/movie';
import { zodResolver } from "@hookform/resolvers/zod";

const genres = ["Action","Adventure","Comedy","Drama","Fantasy","Horror","Sci-Fi","Thriller"]

function AddMovie() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm<MovieFormData>({
    resolver: zodResolver(MovieSchema),
    defaultValues: {
      title: "",
      overview: "",
      releaseYear: new Date().getFullYear(),
      genres: [],
      posterUrl: "",
    },
  });

  // Add Product Tab
  
  const router = useRouter()

  const handleClose = () => {
    
  }

  const onSubmit = async (data : MovieProps) => {
    try {
      const response = await api.post("/auth/register", data);

      toast.success("Account created successfully!", {
        description: "Welcome to Watchlist",
      })

      reset()
    } catch (error) {
      if(axios.isAxiosError(error)){
        toast.error("Registration failed", {
          description: error.response?.data?.error || "Something went wrong",
        })
      } else {
        toast.error('something went wrong')
      }
    }
  };

  return (
    <Modals>
      <div        
        className='bg-white w-[624px] px-16 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-fit pt-11 pb-10'>  
        <div className='flex justify-between items-center font-cormorant text-3xl md:text-2xl 2xl:text-3xl pb-32'>
          <div>Add Movie</div>
          <button onClick={handleClose}>
            <div className='hover:border-b hover:border-gray-500 h-[38px]'>Close</div>
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
              placeholder=""
            />

            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="overview" className='text-xl tracking-wide'>
              Overview
            </Label>

            <Input
              {...register("overview")}
              id="overview"
              placeholder=""
            />

            {errors.overview && (
              <p className="text-sm text-red-500">{errors.overview.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="releaseYear" className='text-xl tracking-wide'>
              Release Year
            </Label>

            <Input
              {...register("releaseYear",{
                valueAsNumber: true
              })}
              id="releaseYear"
              placeholder=""
              type='number'
            />

            {errors.releaseYear && (
              <p className="text-sm text-red-500">{errors.releaseYear.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="genres" className='text-xl tracking-wide'>
              Genres
            </Label>

            <div className='grid grid-cols-4 gap-2'>
              {genres.map(genre => (
                <>
                  <Label key={genre} htmlFor="genres" className='flex items-center gap-2'>
                    {genre}
                  </Label>
                  
                  <Input
                    {...register("genres")}
                    id="genres"
                    value={genre}
                    type='checkbox'
                  />    
                </>            
              ))}
              
            </div>

            {errors.genres && (
              <p className="text-sm text-red-500">{errors.genres.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="posterUrl" className='text-xl tracking-wide'>
              Cover URL
            </Label>

            <Input
              {...register("posterUrl")}
              id="posterUrl"
              placeholder=""
            />

            {errors.posterUrl && (
              <p className="text-sm text-red-500">{errors.posterUrl.message}</p>
            )}
          </div>

          <Button
            className="w-full"
            type="submit"
            disabled={isSubmitting}
          >
            Create
          </Button>
        </form>
      </CardContent>
                   
      </div>
    </Modals>
  )
}

export default AddMovie