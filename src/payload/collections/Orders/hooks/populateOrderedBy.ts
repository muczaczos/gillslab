import type { FieldHook } from 'payload/types'

import type { Order } from '../../../payload-types'

export const populateOrderedBy: FieldHook<Order> = async ({ req, operation, value }) => {
  if ((operation === 'create' || operation === 'update') && !value && req.user) {
    return req.user.id
  } else {
    return '67bada6678d92482ee4fa472'
  }

  return value
}
