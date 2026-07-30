import { MovieProps } from "./movie"

export type WatchlistProps = {
  id?: string
  userId: string
  movieId: string
  status: string
  rating: number
  notes: string
  movie: MovieProps  
}