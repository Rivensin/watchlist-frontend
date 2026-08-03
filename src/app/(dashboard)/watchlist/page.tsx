'use client'
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import useProfile from "@/hooks/useProfile"
import useLogout from "@/hooks/useLogout"
import useWatchlist from "@/hooks/useWatchlist"
import { useMemo } from "react"
import { WatchlistProps } from "@/app/types/watchlist"
import WatchlistCard from "@/components/shared/WatchlistCard"

export default function Watchlist() {
  const { data: watchlist, isLoading, error } = useWatchlist()

  const { data: profile } = useProfile()

  const logout = useLogout()

  const [search, setSearch] = useState<string>('')

  const filterMovie = useMemo(() => {
    return watchlist?.filter((watchlist : WatchlistProps) =>
      watchlist.movie.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [watchlist, search]);

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
          My Watchlist
        </h1>
        <div className="flex items-center justify-between mb-1">
          {profile && (
            <div className="flex gap-6">            
            <Link href='/' className='cursor-pointer'>
              <Button size="sm" className="text-lg p-4 bg-orange-400">
                ALL Movie
              </Button>
            </Link>

            <Link href='/movie' className='cursor-pointer'>
              <Button size="sm" className="text-lg p-4 bg-orange-400">
                My Movie List
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

      {watchlist?.length === 0 
        ? 
          (        
            <div className="flex flex-col justify-center items-center h-screen text-2xl gap-10">
              <div>There is no Watchlist for now</div>
              <div>Lets start Watching!</div>
            </div>
          ) 
        : 
          (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {filterMovie?.map((watchlist : WatchlistProps) => (
                <div key={watchlist.id}>
                  <WatchlistCard
                    id = {watchlist.id} 
                    status = {watchlist.status} 
                    rating = {watchlist.rating} 
                    notes = {watchlist.notes} 
                    createdAt = {watchlist.createdAt} 
                    movie = {watchlist.movie} 
                  />
                </div>
              ))}
            </div>
          )
      }

      

    </main>
  )
}