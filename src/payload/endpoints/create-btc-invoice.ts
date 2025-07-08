import axios from 'axios'
import type { Request, Response } from 'express'

export const createBtcInvoiceEndpoint = async (req: Request, res: Response): Promise<void> => {
  const { amount, memo } = req.body

  console.log('BTC invoice request received', req.body)

  try {
    console.log('Wysyłam żądanie do LNbits...')
    const lnurlResponse = await axios.post(
      `${process.env.LNBITS_URL}/api/v1/payments`,
      {
        out: false,
        amount,
        memo,
      },
      {
        headers: {
          'X-Api-Key': process.env.LNBITS_API_KEY,
          'Content-Type': 'application/json',
        },
      },
    )
    console.log('Odpowiedź z LNbits:', lnurlResponse.data)
    const { payment_request, payment_hash } = lnurlResponse.data

    res.status(200).json({ payment_request, payment_hash })
  } catch { }
}
