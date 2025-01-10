const fetchCategories = async () => {
  type CategoriesItem = {
    id: string
    title: string
    slug: string
  }

  //get categories
  const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/categories`, {
    headers: {
      Authorization: `Bearer ${process.env.CMS_API_KEY}`,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  const data: { docs: CategoriesItem[] } = await response.json()
  ////////////

  return data
}

export default fetchCategories
