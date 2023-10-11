import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import PaymentRoute from './routes/payment.route.js'

dotenv.config()
const port = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({ extended: true })
)

app.get('/', (request, response) => {
  response.send(`🚀 Server is alive!`)
})

app.use('/api/payment', PaymentRoute)

app.listen(port, () => {
  console.log(`🚀 Server running on port: ${port}`)
})