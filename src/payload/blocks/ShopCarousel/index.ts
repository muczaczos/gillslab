import type { Block } from 'payload/types'

export const ShopCarouselBlock: Block = {
  slug: 'shopCarousel',
  labels: {
    singular: 'Shop Carousel',
    plural: 'Shop Carousels',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'category_slug',
      label: 'Category slug',
      type: 'text',
      required: true,
    },
  ],
}
