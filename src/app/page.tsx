'use client'
import Link from "next/link"
import MovieCard from "@/components/shared/MovieCard"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { MovieProps } from "@/app/types/movie"
import { Button } from "@/components/ui/button"
import { useMemo } from "react"
import useLogout from "@/hooks/useLogout"
import useProfile from "@/hooks/useProfile"
import useMovie from "@/hooks/useMovie"
import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { toast } from 'sonner'
import api from "@/lib/axios"
import axios from "axios"

export default function Movies() {
  const { data: movies, isLoading, error } = useMovie()

  const { data: profile } = useProfile()

  const [search, setSearch] = useState<string>('')

  //Handle Search Movie
  const filterMovie = useMemo(() => {
    return movies?.filter((movie: MovieProps) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [movies, search])

  //Handle add watchlist to Watchlist
  const queryClient = useQueryClient();

  const addWatchlistMutation = useMutation({
    mutationFn: async (data: any) => {
    const response = await api.post("/movies/addMovie", data);

    return response.data;
    },

    onSuccess: () => {
      toast.success("Movie added to Watchlist!");

      queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error ?? "Failed to add movie");
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const onSubmit = (data: any) => {
    addWatchlistMutation.mutate(data);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong.</p>;
  }

  return (
    <main className="container mx-auto py-10">
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-6">
          Movie List
        </h1>
        <div className="flex items-center justify-between mb-1">
          {profile && (
            <div className="flex gap-6">              
              <Link href='/movie' className='cursor-pointer'>
                <Button size="sm" className="text-lg p-4 bg-orange-400">
                  My Movie List
                </Button>
              </Link>

              <Link href='/watchlist' className='cursor-pointer'>
                <Button size="sm" className="text-lg p-4 bg-orange-400">
                  My Watchlist
                </Button>
              </Link>
            </div>
          )}    

          <div className="flex items-center gap-10"> 
            <Input
              className="w-80"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div>
              {profile ? (
                <div className="flex gap-10">
                <div>Welcome, <span className="text-blue-500">{profile.name}</span>!</div>
                <button onClick={useLogout} className="hover:underline hover:text-red-400 hover:cursor-pointer">
                  Logout
                </button>
                </div>
              ) : (
                <div className="flex gap-10">
                  <Link href='/login' className="hover:underline hover:text-blue-400">Login</Link>                
                </div>
              )}
            </div>
          </div>
        </div>        
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {filterMovie?.map((movie : MovieProps) => (
          <div key={movie.id}>
            <MovieCard
              id = {movie.id}
              title={movie.title}
              overview={movie.overview}
              genres={movie.genres}
              releaseYear={movie.releaseYear}
              posterUrl={movie.posterUrl}
              creator={movie.creator}
            />
          </div>
        ))}
      </div>

    </main>
  )
}