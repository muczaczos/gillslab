import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { anyone } from '../../access/anyone'
import { adminsOrOrderedBy } from './access/adminsOrOrderedBy'
import { clearUserCart } from './hooks/clearUserCart'
import { populateOrderedBy } from './hooks/populateOrderedBy'
import { sendOrderConfirmation } from './hooks/sendOrderConfirmation'
import { updateUserPurchases } from './hooks/updateUserPurchases'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'createdAt',
    defaultColumns: ['createdAt', 'orderedBy'],
    preview: doc => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/orders/${doc.id}`,
  },
  hooks: {
    afterChange: [sendOrderConfirmation, updateUserPurchases, clearUserCart],
  },
  access: {
    read: adminsOrOrderedBy,
    update: admins,
    create: anyone,
    delete: admins,
  },
  fields: [
    {
      name: 'orderedBy',
      type: 'relationship',
      relationTo: 'users',
      hooks: {
        beforeChange: [populateOrderedBy],
      },
    },
    {
      name: 'orderStatus',
      label: 'Change Order Status',
      type: 'select',
      options: [
        { label: 'Payment Accepted', value: 'Payment Accepted' },
        { label: 'Package Sended', value: 'Package Sended' },
        { label: 'Order Canceled', value: 'Order Canceled' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'privateMessage',
      label: 'Send Private Message',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'messageContent',
      label: 'Private Message',
      type: 'textarea',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'fullname',
      type: 'text',
    },
    {
      name: 'streetAddress',
      type: 'text',
    },
    {
      name: 'city',
      type: 'text',
    },
    {
      name: 'postalCode',
      type: 'text',
    },
    {
      name: 'country',
      type: 'text',
    },
    {
      name: 'phoneNumber',
      type: 'text',
    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'lockerCode',
      type: 'text',
    },
    {
      name: 'shippingMethod',
      type: 'text',
    },
    {
      name: 'paymentMethod',
      type: 'text',
    },
    {
      name: 'additionalInfo',
      type: 'textarea',
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          min: 0,
        },
        {
          name: 'quantity',
          type: 'number',
          min: 0,
        },
      ],
    },
  ],
}
