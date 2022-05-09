import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    userId: { type: String, required: true },
    orderItems: [],
    shippingAdress: { type: Object },
    orderAmount: { type: Number, required: true },
    isPrepared: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    transactionId: { type: String },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)
export default Order
