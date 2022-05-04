import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

//routes
import pizzaRoutes from './routes/pizzaRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.use(express.json())

app.use('/api/pizzas', pizzaRoutes)

const PORT = process.env.PORT

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta
      .bold
  )
)
