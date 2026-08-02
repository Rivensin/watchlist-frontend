import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { WatchlistProps } from '@/app/types/watchlist'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function WatchlistCard({ id, status, rating, notes, createdAt, movie } : WatchlistProps) {
  const pathname = usePathname()
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow py-0 h-124">          
      <CardContent className="space-y-3 p-4">
        <div>
          <div className='relative w-full h-72'> 
            <Image 
              src={movie.posterUrl} 
              alt={movie.title} 
              fill
              sizes='50vw'
              className="object-cover" 
            />
          </div>

          <div className='flex justify-between items-center'>
            <h3 className="font-semibold text-xl py-2">
              {movie.title}
            </h3>

            <div className="flex gap-2 font-semibold line-clamp-5 p-2">
              <Link href={`/watchlist/editWatchlist/${id}`} className='bg-black text-white rounded-sm px-3 py-1'>
                Edit
              </Link>

              <Link href={`/watchlist/deleteWatchlist/${id}`} className='bg-red-600 text-white rounded-sm px-3 py-1'>
                Delete
              </Link>
            </div>
          </div>          
        </div>

        <div className='grid grid-cols-2 justify-between h-31'>          
          <div className="font-semibold line-clamp-5">
            Notes : 
          </div>
          
          <div className="font-semibold line-clamp-5">
            {notes}
          </div>

          <div className="font-semibold line-clamp-5">
            Rating : 
          </div>
          
          <div className="font-semibold text-gray-500">
            {rating} / 10
          </div>

          <div className="font-semibold line-clamp-5">
            Status : 
          </div>

          <div className="font-semibold text-gray-500">
            {status}
          </div>

          <div className="font-semibold line-clamp-5">
            Created : 
          </div>   

           <div className="font-semibold text-gray-500">
            {new Date(createdAt).toLocaleDateString("id-ID")}
          </div>                
        </div>     
      </CardContent>
    </Card>
  )
}

export default WatchlistCard