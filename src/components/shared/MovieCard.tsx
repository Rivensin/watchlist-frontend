import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { MovieProps } from '@/app/types/movie'
import Image from 'next/image'

function MovieCard({ title, overview, genres, releaseYear, posterUrl, creator } : MovieProps) {
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
          <Button size="sm">
            Add
          </Button>
        </div>

        <h4 className="font-semibold h-16">
          {overview}
        </h4>

        <h1 className="font-semibold text-gray-500">
          Added by : {creator.name}
        </h1>

      </CardContent>
    </Card>
  )
}

export default MovieCard