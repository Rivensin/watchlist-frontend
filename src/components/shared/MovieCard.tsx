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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow py-0">          
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
            <div className='flex items-center'> 
              <Link href={`/movie/editMovieUser/${id}`} className='bg-black text-white rounded-sm px-3 py-1'>
                Edit
              </Link>

              <Button className='bg-red-500 hover:bg-red-500 px-3 py-1 cursor-pointer'>
                Delete
              </Button>          
            </div> 
          : 
            <div>
              <Button size="sm">
                Add
              </Button>
            </div>
          }
        </div>

        <h4 className="font-semibold h-16 line-clamp-3">
          {overview}
        </h4>

        {!pathname.includes('movie') && (
          <h1 className="font-semibold text-gray-500">
            Added by : {creator?.name}
          </h1>
        )}        
      </CardContent>
    </Card>
  )
}

export default MovieCard