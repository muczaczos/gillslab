import { TEXT } from './blocks'
import { META } from './meta'

export const MOVIES = `
  query Movies {
    Movies(limit: 300) {
      docs {
        slug
      }
    }
  }
`

export const MOVIE = `
  query Movie($slug: String, $draft: Boolean) {
    Movies(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
        id
        title
        slug
        categories {
          title
        }
        createdAt
        publishedAt
        populatedAuthors {
          id
          name
        }
        layout {
          ${TEXT}
        }
        ${META}
      }
    }
  }
`
