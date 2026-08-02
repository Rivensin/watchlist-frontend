export type WatchlistProps = {
  id?: string
  status: "PLANNED" | "WATCHING" | "COMPLETED" | "DROPPED";
  rating: number
  notes: string | null
  createdAt: string
  movie: {
    id: string,
    title: string
    posterUrl: string
  }
}