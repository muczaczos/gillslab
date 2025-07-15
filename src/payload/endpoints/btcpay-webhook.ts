import type { NextFunction, Response } from 'express'
import type { PayloadRequest } from 'payload/types'
import payload from 'payload'

export const btcpayWebhook = async (
  req: PayloadRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    const expectedToken = `Bearer ${process.env.BTCPAY_WEBHOOK_SECRET}`

    if (!authHeader || authHeader !== expectedToken) {
      res.status(401).json({ error: 'Unauthorized webhook request' })
      return
    }

    const event = req.body
    const invoiceId = event?.invoiceId
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

        console.log(`✅ Zaktualizowano status zamówienia ${orderId} → Payment Accepted`)
      }
    }

    res.status(200).json({ received: true })
  } catch (err) {
    console.error('❌ Błąd webhooka BTCPay:', err)
    res.status(500).json({ error: 'Webhook handler error' })
  }
}
