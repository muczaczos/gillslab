import countryList from 'react-select-country-list'
import type { CollectionConfig } from 'payload/types'

const Zones: CollectionConfig = {
  slug: 'zones',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'selectedCountries', // required
      type: 'select', // required
      hasMany: true,
      admin: {
        isClearable: true,
        isSortable: true, // use mouse to drag and drop different values, and sort them according to your choice
      },
      options: countryList().getData(), //get list of country for choosing
    },
    {
      name: 'ranges', // required
      type: 'array', // required
      label: 'Weight Ranges',
      minRows: 2,
      maxRows: 10,
      labels: {
        singular: 'Range',
        plural: 'Ranges',
      },
      fields: [
        // required
        {
          name: 'weigth',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'codes', // required
      type: 'array', // required
      label: 'Code',
      labels: {
        singular: 'Code',
        plural: 'Codes',
      },
      fields: [
        // required
        {
          name: 'code',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'codesRanges', // required
      type: 'array', // required
      label: 'Codes Ranges',
      labels: {
        singular: 'Codes',
        plural: 'Codes',
      },
      fields: [
        // required
        {
          name: 'from',
          type: 'text',
          required: true,
        },
        {
          name: 'to',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
    },
  ],
}

export default Zones
