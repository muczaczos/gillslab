import { draftMode } from 'next/headers'

import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Page, Post } from '../../../payload/payload-types'

export async function fetchPosts(currentPage, postsPerPage) {
  const { isEnabled: isDraftMode } = draftMode()
  let posts: Post[] | null = null

  let pages = []
  try {
    posts = await fetchDocs<Post>('posts')

    for (let i = 0; i < posts.length; i++) {
      pages[i] = await fetchDoc<Page>({
        collection: 'posts',
        slug: posts[i].slug,
        draft: isDraftMode,
      })
    }
    return pages // Return the paginated posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }

}
