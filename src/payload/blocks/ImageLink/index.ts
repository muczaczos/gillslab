import type { Block } from 'payload/types'

import richText from '../../fields/richText'

export const ImageLink: Block = {
  slug: 'imageLink',
  fields: [
    {
      name: 'items', // Zmieniliśmy nazwę na 'items', aby wskazać, że to lista
      type: 'array', // Używamy tablicy, aby umożliwić dodanie wielu elementów
      minRows: 1, // Minimalna liczba elementów w tablicy
      maxRows: 10, // Maksymalna liczba elementów w tablicy (możesz dostosować)
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media', // Kolekcja, w której przechowywane są obrazy
          required: true, // Możesz ustawić na `true`, jeśli obraz jest wymagany
        },
        richText(),
      ],
    },
  ],
}
