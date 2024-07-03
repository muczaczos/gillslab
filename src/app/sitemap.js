import { connectToDatabase } from './connectMongo'

export default async function sitemap() {
  const client = await connectToDatabase()
  const db = client.db('planet2')
  const postsData = await db.collection('posts').find({}).toArray()
  const pagesData = await db.collection('pages').find({}).toArray()
  const productsData = await db.collection('products').find({}).toArray()

  const posts = postsData.map(item => ({
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  const pages = pagesData.map(item => ({
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  const products = productsData.map(item => ({
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [
    {
      url: process.env.NEXT_PUBLIC_SERVER_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/Cubensis-grow-kits`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/Cubensis-spore-syringes`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cubensis-liquid-cultures`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cubensis-spore-prints`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cubensis-plate-cultures`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...pages,
    ...posts,
    ...products,
  ]
}
