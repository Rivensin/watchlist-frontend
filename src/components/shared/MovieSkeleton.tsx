import React from 'react'

function MovieSkeleton() {
  return (
    <main className="container mx-auto py-10">
      <div className="mb-4">
        <h1 className="h-9 animate-pulse bg-muted mb-6" />
        <div className='h-8.5 animate-pulse bg-muted mb-1' />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="h-134 w-[288px] rounded-lg bg-muted animate-pulse"
          />
        ))}
      </div>
    </main>
  )
}

export default MovieSkeleton