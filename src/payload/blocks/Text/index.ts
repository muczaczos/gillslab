import type { Block } from 'payload/types'

export const Text: Block = {
  slug: 'text',
  fields: [
    {
      name: 'test',
      type: 'richText',
    },
    {
      name: 'author',
      type: 'text',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media', // Kolekcja, w której przechowywane są obrazy
      required: false, // Możesz ustawić na `true`, jeśli obraz jest wymagany
    },
  ],
}
