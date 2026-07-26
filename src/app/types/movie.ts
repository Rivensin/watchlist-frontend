export type MovieProps = {
  id?: string
  title: string
  overview: string
  releaseYear: number
  genres: string[]
  posterUrl: string
  creator?: {
    id: string
    name: string
  }
}