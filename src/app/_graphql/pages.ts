import {
  ARCHIVE_BLOCK,
  CALL_TO_ACTION,
  CONTENT,
  FILTERED_PRODUCTS,
  IMAGE_LINK,
  MEDIA_BLOCK,
  TEXT,
} from './blocks'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'

export const PAGES = `
  query Pages {
    Pages(limit: 300, where: { slug: { not_equals: "cart" } })  {
      docs {
        slug
      }
    }
  }
`

export const PAGE = `
  query Page($slug: String, $draft: Boolean) {
    Pages(where: { AND: [{ slug: { equals: $slug }}] }, limit: 1, draft: $draft) {
      docs {
        id
        title
        prefix
        fullPath
        customClass
        hero {
          type
          richText
          links {
            link ${LINK_FIELDS()}
          }
          ${MEDIA}
        }
        layout {
          ${CONTENT}
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
          ${TEXT}
          ${IMAGE_LINK}
          ${FILTERED_PRODUCTS}
        }
        ${META}
      }
    }
  }
`
