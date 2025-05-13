import type { Product } from '../../payload/payload-types'

export const fetchFilteredProducts = async (category_slug: string): Promise<Product[]> => {
  // Zdefiniowane zapytanie GraphQL z filtrowaniem po category_slug
  const query = `
    query Products($categorySlug: String!) {
      Products( where: {
      AND: [
        { category_slug: { equals: $categorySlug } }
        { disable: { not_equals: true } }  # To zapewni, że produkty z disable: true nie będą zwracane
      ]
    }) {
        docs {
          id
          disable
          outOfStock
          title
          title2
          shortInfo1
          shortInfo2
          shortInfo3
          shortInfo4
          icons { 
            iconLibrary
            iconName
          }
          Modals {
            Modal
          }
          price
          weight
          media1 {
            alt
            width
            height
            url
          }
          media2 {
            alt
            width
            height
            url
          }
          media3 {
            alt
            width
            height
            url
          }
          stripeProductID
          category_slug
          priceJSON
          enablePaywall
          relatedProducts {
            id
            slug
            title
            media1 {
              url
            }
            categories {
              slug
            }
          }
          slug
        }
      }
    }
  `

  // Zmienna z category_slug, którą chcesz pobrać
  const variables = {
    categorySlug: category_slug, // Przekazujemy category_slug, który chcesz filtrować
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`)
  }

  const data = await res.json()

  console.log(data)
  // Zwrócenie wyników z produktów
  return data.data.Products.docs || []
}
