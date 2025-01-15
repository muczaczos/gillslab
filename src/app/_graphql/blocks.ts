import { PRODUCT_CATEGORIES } from './categories'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'

export const CALL_TO_ACTION = `
...on Cta {
  blockType
  invertBackground
  richText
  links {
    link ${LINK_FIELDS()}
  }
}
`

export const CONTENT = `
...on Content {
  blockType
  invertBackground
  columns {
    size
    richText
    enableLink
    link ${LINK_FIELDS()}
  }
}
`

export const MEDIA_BLOCK = `
...on MediaBlock {
  blockType
  invertBackground
  position
  ${MEDIA}
}
`

export const ARCHIVE_BLOCK = `
...on Archive {
  blockType
  introContent
  populateBy
  relationTo
  ${PRODUCT_CATEGORIES}
  limit
  selectedDocs {
    relationTo
    value {
      ...on Product {
        id
        slug
        title
        priceJSON
        ${META}
      }
    }
  }
  populatedDocs {
    relationTo
    value {
      ...on Product {
        id
        slug
        title
        priceJSON
        ${PRODUCT_CATEGORIES}
        ${META}
      }
    }
  }
  populatedDocsTotal
}
`

export const TEXT = `
...on Text {
  richText
  blockType
  author
  ${MEDIA}
  imagePosition
}
`

export const FILTERED_PRODUCTS = `
...on FilteredProducts {
  blockType
  category
}
`

export const IMAGE_LINK = `
...on ImageLink {
  blockType
  items {
    title
    url
    media {
      id
      url
      alt
    }
    richText
  }
}
`
