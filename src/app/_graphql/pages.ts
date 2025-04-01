import {
  ARCHIVE_BLOCK,
  CALL_TO_ACTION,
  CONTENT,
  IMAGE_LINK,
  MEDIA_BLOCK,
  SHOP_CAROUSEL,
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
query Page($slug: String!, $prefix: Page_prefix_Input, $draft: Boolean) {
  Pages(
    where: { 
      OR: [ # ✅ JEŚLI PREFIX ISTNIEJE → SPRAWDZA Z PREFIXEM, INACZEJ BEZ PREFIXU
        { AND: [ { slug: { equals: $slug } }, { prefix: { equals: $prefix } } ] }
        { AND: [ { slug: { equals: $slug } }, { prefix: { exists: false } } ] } # Dla stron bez prefixu!
      ]
    }, 
    limit: 1, 
    draft: $draft
  ) {
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
        ${SHOP_CAROUSEL}
      }
      ${META}
    }
  }
}
`
