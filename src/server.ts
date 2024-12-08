import axios from 'axios'
import { exec } from 'child_process'
import dotenv from 'dotenv'
import express from 'express'
import next from 'next'
import path from 'path'
import payload from 'payload'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import { seed } from './payload/seed'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.post('/cashbill-payment', async (req, res) => {
  try {
    const requestData = req.body
    const response = await axios.post(
      'https://pay.cashbill.pl/testws/rest/payment/grzybole.pl',
      requestData,
    )
    res.status(200).json(response.data)
  } catch (error: unknown) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/send-email', async (req, res) => {
  try {
    const requestData = req.body
    await payload.sendEmail({
      to: 'muczaczos@gmail.com',
      from: 'shop@planet-of-mushrooms.com',
      subject: 'New Message from: ' + requestData.name,
      html: 'Email: ' + requestData.email + ' Content: ' + requestData.message,
    })
  } catch (error: unknown) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

const start = async (): Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || '',
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  if (process.env.PAYLOAD_SEED === 'true') {
    await seed(payload)
    process.exit()
  }

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info(`Next.js is now building...`)

      // Uruchomienie komendy next build za pomocą child_process
      exec('npx next build', { cwd: path.join(__dirname, '../') }, (err, stdout, stderr) => {
        if (err) {
          // console.error(`Error during build: ${err.message}`)
          return
        }
        if (stderr) {
          // console.error(`stderr: ${stderr}`)
          return
        }
        //  console.log(`stdout: ${stdout}`)
        process.exit()
      })
    })
    return
  }

  const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
  })

  const nextHandler = nextApp.getRequestHandler()

  app.use((req, res) => nextHandler(req, res))

  nextApp.prepare().then(() => {
    payload.logger.info('Starting Next.js...')

    app.listen(PORT, async () => {
      payload.logger.info(`Next.js App URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}`)
    })
  })
}

start()
