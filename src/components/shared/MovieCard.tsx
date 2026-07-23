import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { MovieProps } from '@/app/types/movie'
import Image from 'next/image'

function MovieCard({ title, overview, genres, releaseYear, posterUrl } : MovieProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">          
      <CardContent className="space-y-3 p-4">
        <div>
          <div className='relative w-full h-40'> 
            <Image 
              src={posterUrl} 
              alt={title} 
              fill
              sizes='100vw'
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

        <h4 className="font-semibold">
          {overview}
        </h4>
      </CardContent>
    </Card>
  )
}

export default MovieCard