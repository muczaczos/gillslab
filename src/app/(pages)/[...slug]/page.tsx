import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Category, Page } from '../../../payload/payload-types'
import { staticHome } from '../../../payload/seed/home-static'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Blocks } from '../../_components/Blocks'
import { Hero } from '../../_components/Hero'
import { generateMeta } from '../../_utilities/generateMeta'
import LayoutWithHeaderFooter from '../../layouts/withHeaderAndFooter/layout'
import Banners from './Banners'
import BestProducts from './BestProducts'
import BlogVlogNews from './BlogVlogNews'
import DesktopHero from './DesktopHero'
import HorizontalDesktopMenu from './HorizontalDesktopMenu'
import MobileCarousel from './MobileCarousel'
import MobileHero from './MobileHero'

// Włącz dynamiczne renderowanie
export const dynamic = 'force-dynamic'

export default async function Pages({ params }) {
  const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug || 'home']
  const finalSlug = slugArray.pop() // Ostatni element to `slug`
  const prefix = slugArray.length > 0 ? slugArray.join('/') : null // Reszta to `prefix`

  console.log('📌 Otrzymane params:', params)
  console.log('📌 Finalny slug:', finalSlug)
  console.log('📌 Prefix:', prefix) // Dodajemy logowanie `prefix`

  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null
  let categories: Category[] | null = null

  try {
    // Pobieramy stronę na podstawie `slug` i `prefix`
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: finalSlug,
      prefix, // ✅ Dodajemy prefix do fetchDoc!
      draft: isDraftMode,
    })
    console.log('🛠 Pełne dane strony:', page)

    categories = await fetchDocs<Category>('categories')
  } catch (error) {
    console.error('Błąd pobierania danych:', error)
  }

  // Jeśli nie ma takiej strony, próbujemy użyć statycznej strony głównej
  if (!page && finalSlug === 'home') {
    page = staticHome
    console.log('⚠️ Brak strony, używamy statycznej strony głównej')
  }

  if (!page) {
    console.log('🚫 Nie znaleziono strony, zwracamy 404')
    return notFound()
  }

  const { hero, layout } = page

  return (
    <LayoutWithHeaderFooter>
      {finalSlug === 'home' ? (
        <>
          <MobileHero />
          <DesktopHero />
          <MobileCarousel />
          <HorizontalDesktopMenu />
          <Banners />
          <BestProducts />
          <BlogVlogNews />
        </>
      ) : (
        <>
          <Hero {...hero} />
          <Blocks
            blocks={layout}
            disableTopPadding={!hero || hero?.type === 'none' || hero?.type === 'lowImpact'}
          />
        </>
      )}
    </LayoutWithHeaderFooter>
  )
}

// 🛠 POPRAWIONE generowanie statycznych ścieżek
export async function generateStaticParams() {
  try {
    const pages = await fetchDocs<Page>('pages')

    // console.log('📢 Otrzymane strony z API:', pages)

    const paths = pages?.map(({ slug, prefix }) => ({
      slug: prefix ? [prefix, slug] : [slug], // ✅ Teraz zwracamy tablicę zamiast stringa!
    }))

    //console.log('✅ Poprawione generowane ścieżki:', paths)
    return paths || []
  } catch (error) {
    console.error('Błąd pobierania stron:', error)
    return []
  }
}

// Generowanie metadanych
export async function generateMetadata({ params: { slug = 'home' } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  // ✅ Upewniamy się, że slug to string, a nie tablica
  const finalSlug = Array.isArray(slug) ? slug.pop() : slug

  console.log(`📡 Pobieramy stronę dla sluga: ${finalSlug}`)

  let page: Page | null = null

  try {
    // ✅ Teraz slug zawsze jest stringiem
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: finalSlug,
      draft: isDraftMode,
    })

    console.log('✅ Znaleziono stronę:', page)
  } catch (error) {
    console.error('❌ Błąd pobierania danych:', error)
  }

  if (!page && finalSlug === 'home') {
    page = staticHome
  }

  if (!page) {
    console.warn('⚠️ Strona nie została znaleziona, zwracamy domyślne meta')
    return {
      title: 'Brak tytułu',
      description: 'Opis niedostępny',
    }
  }

  const meta = page.meta || {}

  const imageUrl =
    meta.image && typeof meta.image === 'object' && 'filename' in meta.image
      ? `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${meta.image.filename}`
      : null

  const imageAlt =
    meta.image && typeof meta.image === 'object' && 'alt' in meta.image
      ? meta.image.alt || 'Brak opisu'
      : 'Brak opisu'

  return {
    title: meta.title || page.title || 'Brak tytułu',
    description: meta.description || 'Opis strony niedostępny',
    openGraph: {
      title: meta.title || page.title,
      description: meta.description || 'Opis strony niedostępny',
      images: imageUrl ? [{ url: imageUrl, alt: imageAlt || 'Brak opisu' }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title || page.title,
      description: meta.description || 'Opis strony niedostępny',
      images: imageUrl ? [{ url: imageUrl, alt: imageAlt || 'Brak opisu' }] : [],
    },
  }
}
