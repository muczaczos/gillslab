import type { Block } from 'payload/types'

export const FilteredProducts: Block = {
  slug: 'filteredProducts',
  fields: [
    {
      name: 'category',
      type: 'text',
    },
  ],
}
