// fetchMovies.ts
export const fetchMovies = async () => {
  type VlogItem = {
    id: string
    title: string
    media: {
      filename: string
    }
    slug: string
    youtubeLink: string
  }

  try {
    // Fetching movies
    const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/movies`, {
      headers: {
        Authorization: `Bearer ${process.env.CMS_API_KEY}`,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const data: { docs: VlogItem[] } = await response.json()

    return data.docs // Zwracamy filmy
  } catch (error) {
    return [] // W przypadku błędu zwrócimy pustą tablicę
  }
}
