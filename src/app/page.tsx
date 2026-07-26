'use client'
import { Input } from "@/components/ui/input"
import api from "@/lib/axios"
import { useEffect, useState } from "react"
import Link from "next/link"
import MovieCard from "@/components/shared/MovieCard"
import { MovieProps } from "@/app/types/movie"
import { User } from '@/app/types/user'
import { Button } from "@/components/ui/button"

export default function Movies() {
  const [movie,setMovie] = useState<MovieProps[] | null>(null)
  const [profile,setProfile] = useState<User | null> (null)
  const [search, setSearch] = useState<string>('')

  const filterMovie = (title : string) => {
    return movie?.filter(m => m.title.toLowerCase().includes(title.toLowerCase()))
  } 

  const logout = async() => {
    try {
      await api.post('/auth/logout')
      setProfile(null)
    } catch (error) {
      console.error('Error logging out:', error)
    }
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

    const getProfile = async() => {
      try {
        const response = await api.get('/auth/profile')
        console.log(response.data)
        setProfile(response.data)

      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }

    getProfile()
    fetchMovie()
  },[])

  return (
    <main className="container mx-auto py-10">

      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-6">
          Movie List
        </h1>
        <div className="flex items-center justify-between mb-1">
          <div>
            {profile && (
              <Link href='/addMovie' className='cursor-pointer'>
                <Button size="sm" className="text-lg p-4">
                  Add Movie
                </Button>
              </Link>
            )}            
          </div>

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
                <button onClick={logout} className="hover:underline hover:text-red-400 hover:cursor-pointer">
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
        {filterMovie(search)?.map(movie => (
          <div key={movie.id}>
            <MovieCard
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