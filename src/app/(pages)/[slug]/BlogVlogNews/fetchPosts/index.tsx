export const fetchPosts = async () => {
  type NewsItem = {
    id: string
    title: string
    content: string
    meta: {
      image: {
        filename: string
      }
      description: string
    }
    slug: string
  }

  try {
    // Fetching posts

    //get posts
    const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/posts`, {
      headers: {
        Authorization: `Bearer ${process.env.CMS_API_KEY}`,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data: { docs: NewsItem[] } = await response.json()
    ////////////

    return data.docs // Zwracamy posty
  } catch (error) {
    //console.error('Error fetching posts:', error)
    return [] // W przypadku błędu zwrócimy pustą tablicę
  }
}
