import type { AfterChangeHook } from 'payload/dist/collections/config/types'

export const loginAfterCreate: AfterChangeHook = async ({
  doc,
  req,
  req: { payload, body = {}, res },
  operation,
}) => {
  if (operation === 'create' && !req.user) {
    const { email, password } = body

    if (email && password) {
      await payload.sendEmail({
        to: email,
        from: 'shop@planet-of-mushrooms.com',
        subject: 'Registration Confirmation',
        html:
          '<b>Hey there!</b><br/>We are glad to se you here. Now your ordering procces will be much easier.' +
          '. <br/> Log in and add your shipping address. That is help speed up your ordering process',
      })

      const { user, token } = await payload.login({
        collection: 'users',
        data: { email, password },
        req,
        res,
      })

      return {
        ...doc,
        token,
        user,
      }
    }
  }

  return doc
}
