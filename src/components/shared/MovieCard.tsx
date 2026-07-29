import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { MovieProps } from '@/app/types/movie'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function MovieCard({ id, title, overview, genres, releaseYear, posterUrl, creator } : MovieProps) {
  const pathname = usePathname()

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow py-0 h-132">          
      <CardContent className="space-y-3 p-4">
        <div>
          <div className='relative w-full h-72'> 
            <Image 
              src={posterUrl} 
              alt={title} 
              fill
              sizes='50vw'
              className="object-cover" 
            />
          </div>

          <h3 className="font-semibold line-clamp-1">
            {title}
          </h3>

          <p className="text-sm text-muted-foreground">
            {releaseYear}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            Genre : {genres.map(genre => genre).join(', ')}
          </span>

          {pathname.includes('movie') ?
            <div className='flex items-center gap-2'> 
              <Link href={`/movie/editMovieUser/${id}`} className='bg-black text-white rounded-sm px-3 py-1'>
                Edit
              </Link>

              <Link href={`/movie/deleteMovieUser/${id}`}className='bg-red-500 text-white hover:bg-red-500 rounded-sm px-3 py-1 cursor-pointer'>
                Delete
              </Link>          
            </div> 
          : 
            <div>
              <Button size="sm">
                Add
              </Button>
            </div>
          }
        </div>
        
        <div className='flex flex-col justify-between h-31'>
          <h4 className="font-semibold line-clamp-5">
            {overview}
          </h4>

          {!pathname.includes('movie') && (
            <h1 className="font-semibold text-gray-500">
              Added by : {creator?.name}
            </h1>
          )}   
        </div>     
      </CardContent>
    </Card>
  )
}

export default MovieCard