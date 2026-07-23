'use client'
import { Input } from "@/components/ui/input"
import api from "@/lib/axios"
import { useEffect, useState } from "react"
import MovieCard from "@/components/shared/MovieCard"
import { MovieProps } from "@/app/types/movie"

export default function Movies() {
  const [movie,setMovie] = useState<MovieProps[] | null>(null)
  const [search, setSearch] = useState<string>('')

  const filterMovie = (title : string) => {
    return movie?.filter(m => m.title.toLowerCase().includes(title.toLowerCase()))
  } 

  useEffect(() => {
    const fetchMovie = async() => {
      try {
        const response = await api.get('/movies')        
        setMovie(response.data)
      } catch (error) {
        console.error('Error fetching movie:', error)
      }
    }

    fetchMovie()
  },[])

  return (
    <main className="container mx-auto py-10">

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          Popular Movies
        </h1>

        <Input
          className="w-80"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {filterMovie(search)?.map(movie => (
          <div key={movie.id}>
            <MovieCard
              title={movie.title}
              overview={movie.overview}
              genres={movie.genres}
              releaseYear={movie.releaseYear}
              posterUrl={movie.posterUrl}
            />
          </div>
        ))}
      </div>

    </main>
  )
}