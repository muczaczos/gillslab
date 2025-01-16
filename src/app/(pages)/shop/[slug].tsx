import { GetServerSideProps } from 'next'

const Page = ({ page }) => {
  if (!page) {
    return <div>Page not found</div>
  }

  return (
    <div>
      <h1>{page.title}</h1>
      <div>{page.content}</div>
    </div>
  )
}

// Funkcja do pobierania strony na podstawie pełnej ścieżki (fullPath)
export const getPageByFullPath = async (fullPath: string) => {
  const res = await fetch(`${process.env.PAYLOAD_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          Pages(where: { fullPath: { equals: "${fullPath}" } }) {
            docs {
              id
              title
              content
            }
          }
        }
      `,
    }),
  })

  const data = await res.json()
  const page = data?.data?.Pages?.docs[0]
  return page || null // Zwróć dane strony lub null, jeśli nie znaleziono
}

// getServerSideProps - funkcja do pobierania danych przed renderowaniem
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params // Pobieramy slug z parametru URL
  const fullPath = `/shop/${slug}` // Budowanie pełnej ścieżki z prefiksem (np. /shop/nowa-strona)

  // Pobieranie danych strony z Payload CMS za pomocą fullPath
  const pageData = await getPageByFullPath(fullPath)

  if (!pageData) {
    return { notFound: true } // Jeśli strona nie istnieje, zwróć 404
  }

  return {
    props: {
      page: pageData, // Zwróć dane strony jako props
    },
  }
}

export default Page
