import type { Response } from 'express'
import payload from 'payload'
import type { PayloadRequest } from 'payload/types'

export const btcpayWebhook = async (req: PayloadRequest, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    const expectedToken = `Bearer ${process.env.BTCPAY_WEBHOOK_SECRET}`

    if (!authHeader || authHeader !== expectedToken) {
      res.status(401).json({ error: 'Unauthorized webhook request' })
      return
    }

    const event = req.body
    const status = event?.type

    if (status === 'InvoiceSettled') {
      const orderId = event?.metadata?.orderId

      if (orderId) {
        await payload.update({
          collection: 'orders',
          id: orderId,
          data: {
            orderStatus: 'Payment Accepted',
          },
        })
      }
    }

    res.status(200).json({ received: true })
  } catch (err: unknown) {
    res.status(500).json({ error: 'Webhook handler error' })
  }
}
