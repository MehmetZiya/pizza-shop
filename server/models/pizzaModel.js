import mongoose from 'mongoose'

const pizzaSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    variants: [],
    normalPrice: { type: Number, required: true },
    familjPrice: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timeStamps: true,
  }
)

const Pizza = mongoose.model('Pizza', pizzaSchema)
export default Pizza
