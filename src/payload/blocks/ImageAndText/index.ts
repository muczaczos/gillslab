import type { Block } from 'payload/types'

export const ImageAndText: Block = {
  slug: 'imageTextBlock', // unikalny identyfikator bloku
  labels: {
    singular: 'Image and Text',
    plural: 'Image and Text Blocks',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // Kolekcja, gdzie przechowywane są obrazy
      required: true,
      label: 'Image',
    },
    {
      name: 'text',
      type: 'richText',
      label: 'Text',
      required: true,
    },
    {
      name: 'alignment',
      type: 'radio',
      label: 'Image Alignment',
      options: [
        {
          label: 'Image on the left',
          value: 'left',
        },
        {
          label: 'Image on the right',
          value: 'right',
        },
      ],
      defaultValue: 'left',
      required: true,
    },
  ],
}
