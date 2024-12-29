import type { Block } from 'payload/types'
import richText from '../../fields/richText'

export const Text: Block = {
  slug: 'text',
  fields: [
    richText(),
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
    {
      name: 'imagePosition', // Dodane pole do wyboru pozycji tekstu
      type: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'left', // Ustawienie domyślnej wartości na "left"
    },
  ],
}
