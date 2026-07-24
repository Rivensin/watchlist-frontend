export type MovieProps = {
  id?: string
  title: string
  overview: string
  genres: string[]
  releaseYear: number
  posterUrl: string
  creator: {
    id: string
    name: string
  }
}