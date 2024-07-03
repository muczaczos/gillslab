import { CART } from './cart'

export const ME_QUERY = `query {
  meUser {
    user {
      id
      email
      name
      streetAddress
      city
      postalCode
      country
      phoneNumber
      ${CART}
      roles
    }
    exp
  }
}`
