import type { Block } from 'payload/types'

export const SpacerBlock: Block = {
  slug: 'spacerBlock',
  labels: {
    singular: 'Spacer',
    plural: 'Spacers',
  },
  fields: [
    {
      name: 'height',
      label: 'Height (px)',
      type: 'number',
      required: true,
    },
  ],
}
