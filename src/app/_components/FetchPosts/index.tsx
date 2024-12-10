import { Post } from '../../../payload/payload-types'

interface PostData {
  docs: Post[] // Tablica postów
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

export async function fetchPosts(
  currentPage: number,
  postsPerPage: number,
  serverUrl: ServerConfig,
): Promise<PostData> {
  let postData: PostData | null = null

  // console.log(serverUrl.serverUrl)
  try {
    // Pobranie dynamicznego adresu serwera z procesu środowiskowego
    if (!serverUrl) {
      throw new Error('Server URL is not defined in environment variables.')
    }

    const response = await fetch(
      `${serverUrl.serverUrl}/api/posts?limit=${postsPerPage}&page=${currentPage}`,
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
      limit: postsPerPage,
      page: currentPage,
    }
  }
}
