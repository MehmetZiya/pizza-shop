import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

//routes
import pizzaRoutes from './routes/pizzaRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import checkoutRoutes from './routes/checkoutRoutes.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'

dotenv.config()
connectDB()

const app = express()

app.use(express.json())

app.use('/api/pizzas', pizzaRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/create-checkout-session', checkoutRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta
      .bold
  )
)
