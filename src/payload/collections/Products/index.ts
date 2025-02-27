import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { Archive } from '../../blocks/ArchiveBlock'
import { CallToAction } from '../../blocks/CallToAction'
import { Content } from '../../blocks/Content'
import { MediaBlock } from '../../blocks/MediaBlock'
import { slugField } from '../../fields/slug'
import { populateArchiveBlock } from '../../hooks/populateArchiveBlock'
import { checkUserPurchases } from './access/checkUserPurchases'
import { beforeProductChange } from './hooks/beforeChange'
import { deleteProductFromCarts } from './hooks/deleteProductFromCarts'
import { revalidateProduct } from './hooks/revalidateProduct'
import { ProductSelect } from './ui/ProductSelect'

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['price', 'title', 'stripeProductID', '_status'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/shop/${doc.category_slug}/${doc.slug}` // Zmienione na '/shop/:category_slug/:slug'
    },
  },
  hooks: {
    beforeChange: [
      beforeProductChange,
      async ({ data, req }) => {
        // Automatyczne ustawienie `category_slug` na podstawie pierwszej kategorii
        if (data.categories && data.categories.length > 0) {
          const categoryId = data.categories[0]
          const category = await req.payload.findByID({
            collection: 'categories',
            id: categoryId,
          })
          if (category?.slug) {
            data.category_slug = category.slug // ustawienie slug kategorii
          }
        }
      },
    ],
    afterChange: [revalidateProduct],
    afterRead: [populateArchiveBlock],
    afterDelete: [deleteProductFromCarts],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'hideFooter',
      type: 'checkbox',
      required: false,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'title2',
      type: 'text',
      required: true,
    },
    {
      name: 'shortInfo1',
      type: 'text',
      required: true,
    },
    {
      name: 'shortInfo2',
      type: 'text',
      required: true,
    },
    {
      name: 'shortInfo3',
      type: 'text',
      required: true,
    },
    {
      name: 'shortInfo4',
      type: 'text',
      required: true,
    },
    {
      name: 'icons', // Pole do przechowywania listy ikon
      type: 'array',
      label: 'Icons',
      fields: [
        {
          name: 'iconLibrary',
          type: 'select',
          options: [
            { label: 'Game Icons', value: 'gi' },
            { label: 'Ion Icons', value: 'io5' },
            { label: 'Line Awesome', value: 'lia' },
            { label: 'Tabler Icons', value: 'tb' },
          ],
          required: true,
          label: 'Icon Library',
        },
        {
          name: 'iconName',
          type: 'text',
          label: 'Icon Name',
          required: true,
        },
      ],
    },
    {
      name: 'Modals', // Nazwa pola
      type: 'array', // Typ pola: tablica
      minRows: 4, // Minimalna liczba elementów w tablicy
      maxRows: 4, // Maksymalna liczba elementów w tablicy
      fields: [
        {
          name: 'Modal',
          type: 'richText', // Typ pola wewnętrznego
          required: true, // Czy pole jest wymagane
        },
      ],
    },
    {
      name: 'price',
      type: 'text',
      required: true,
    },
    {
      name: 'weight',
      type: 'number',
      required: true,
    },
    {
      name: 'media1',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'media2',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'media3',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'publishedOn',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive],
            },
          ],
        },
        {
          label: 'Product Details',
          fields: [
            {
              name: 'stripeProductID',
              label: 'Stripe Product',
              type: 'text',
              admin: {
                components: {
                  Field: ProductSelect,
                },
              },
            },
            {
              name: 'priceJSON',
              label: 'Price JSON',
              type: 'textarea',
              admin: {
                readOnly: true,
                hidden: true,
                rows: 10,
              },
            },
            {
              name: 'enablePaywall',
              label: 'Enable Paywall',
              type: 'checkbox',
            },
            {
              name: 'paywall',
              label: 'Paywall',
              type: 'blocks',
              access: {
                read: checkUserPurchases,
              },
              blocks: [CallToAction, Content, MediaBlock, Archive],
            },
          ],
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
    },
    slugField(), // Pole `slug` dla `product_slug`
    {
      name: 'category_slug',
      label: 'Category Slug',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'skipSync',
      label: 'Skip Sync',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        readOnly: true,
        hidden: true,
      },
    },
  ],
}

export default Products
