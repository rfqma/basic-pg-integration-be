import express from 'express'
import midtransClient from 'midtrans-client'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

router.post('/process', (request, response) => {
  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      clientKey: process.env.MIDTRANS_SANDBOX_CLIENT_KEY,
      serverKey: process.env.MIDTRANS_SANDBOX_SERVER_KEY
    })

    const parameter = {
      transaction_details: {
        order_id: request.body.order_id,
        gross_amount: request.body.total
      },
      customer_details: {
        first_name: request.body.name
      }
    }

    snap.createTransaction(parameter)
      .then((transaction) => {
        const dataPayment = {
          response: transaction
        }
        const token = transaction.token

        response.status(200).json({ message: 'Payment success!', dataPayment, token: token })
      })
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

export default router