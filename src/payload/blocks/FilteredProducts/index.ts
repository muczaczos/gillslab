import type { Block } from 'payload/types'

export const FilteredProducts: Block = {
  slug: 'FilteredProducts',
  fields: [
    {
      name: 'category',
      type: 'text',
    },
  ],
}
