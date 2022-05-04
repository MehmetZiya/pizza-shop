import mongoose from 'mongoose'

const pizzaSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    variants: [],
    prices: ['normal', 'familj'],
    category: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timeStamps: true,
  }
)

const Pizza = mongoose.model('Pizza', pizzaSchema)
export default Pizza
