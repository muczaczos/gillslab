import type { Block } from 'payload/types'

export const ShopCarousel: Block = {
  slug: 'shopCarousel',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'category_slug',
      label: 'Category slug',
      type: 'text',
    },
  ],
}
