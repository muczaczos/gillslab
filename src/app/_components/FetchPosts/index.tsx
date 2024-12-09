import { Post } from '../../../payload/payload-types'

interface PostData {
  docs: Post[] // Tablica postów
  totalDocs: number // Łączna liczba postów
  totalPages: number // Liczba stron
  limit: number // Limit postów na stronę
  page: number // Numer aktualnej strony
}

export async function fetchPosts(currentPage: number, postsPerPage: number): Promise<PostData> {
  let postData: PostData | null = null

  try {
    const response = await fetch(
      `http://localhost:3000/api/posts?limit=${postsPerPage}&page=${currentPage}`,
    )

    // Zwracamy odpowiedź z serwera w postaci obiektu PostData
    postData = await response.json()

    return postData // Zwracamy dane w odpowiednim formacie
  } catch (error) {
    //console.error('Error fetching posts:', error)
    return {
      docs: [], // W przypadku błędu, zwracamy pustą tablicę postów
      totalDocs: 0,
      totalPages: 0,
      limit: postsPerPage,
      page: currentPage,
    }
  }
}
