export const PRODUCT_CATEGORIES = `categories {
  title
  id
  slug
  breadcrumbs {
    id
    label
  }
}`

export const CATEGORIES = `
  query Categories {
    Categories(limit: 300) {
      docs {
        id
        title
        media {
          alt
          width
          height
          url
        }
        slug
      }
    }
}`
