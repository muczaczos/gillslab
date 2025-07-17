import crypto from 'crypto'
import type { Response } from 'express'
import payload from 'payload'
import type { PayloadRequest } from 'payload/types'

export const btcpayWebhook = async (req: PayloadRequest, res: Response): Promise<void> => {
  try {
    const rawBody = JSON.stringify(req.body)
    const signature = req.headers['btcpay-sig'] as string

    const expectedSignature = `sha256=${crypto
      .createHmac('sha256', process.env.BTCPAY_WEBHOOK_SECRET || '')
      .update(rawBody)
      .digest('hex')}`

    if (signature !== expectedSignature) {
      // console.warn('❌ Nieprawidłowy podpis webhooka!')
      res.status(401).json({ error: 'Invalid signature' })
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
