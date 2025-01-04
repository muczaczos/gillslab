import { Movie } from '../../../payload/payload-types'

interface MovieData {
  docs: Movie[] // Tablica postów
  totalDocs: number // Łączna liczba postów
  totalPages: number // Liczba stron
  limit: number // Limit postów na stronę
  page: number // Numer aktualnej strony
}

// Określamy typ dla obiektu, który będzie zawierał "serverUrl"
interface ServerConfig {
  serverUrl: {
    serverUrl: string // Zawiera adres serwera
  }
}

export async function fetchMovies(
  currentPage: number,
  moviesPerPage: number,
  serverUrl: ServerConfig,
): Promise<MovieData> {
  let postData: MovieData | null = null

  // console.log(serverUrl.serverUrl)
  try {
    // Pobranie dynamicznego adresu serwera z procesu środowiskowego
    if (!serverUrl) {
      throw new Error('Server URL is not defined in environment variables.')
    }

    const response = await fetch(
      `${serverUrl.serverUrl}/api/movies?limit=${moviesPerPage}&page=${currentPage}`,
    )

    // Zwracamy odpowiedź z serwera w postaci obiektu PostData
    postData = await response.json()

    return postData // Zwracamy dane w odpowiednim formacie
  } catch (error) {
    // console.error('Error fetching posts:', error)
    return {
      docs: [], // W przypadku błędu, zwracamy pustą tablicę postów
      totalDocs: 0,
      totalPages: 0,
      limit: moviesPerPage,
      page: currentPage,
    }
  }
}
