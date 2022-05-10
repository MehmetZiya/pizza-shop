import asyncHandler from 'express-async-handler'
import Stripe from 'stripe'
import Order from '../models/orderModel.js'

const checkoutOrder = asyncHandler(async (req, res) => {
  const cartItems = req.body

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const session = await stripe.checkout.sessions.create({
      line_items: cartItems.map((item) => {
        return {
          price_data: {
            currency: 'sek',
            unit_amount: item.singleItemPrice * 100,
            product_data: {
              name: item.name,
              images: [
                `https://valentino-pizza.herokuapp.com/uploads/${item.image}`,
              ],
            },
          },
          quantity: item.qty,
        }
      }),
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['SE'],
      },
      success_url: `${process.env.SERVER_URL}/success`,
      cancel_url: `${process.env.SERVER_URL}/cancel`,
    })
    console.log(session.payment_status, session.payment_intent)
    res.status(200).json({ url: session.url, session })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const placeOrder = asyncHandler(async (req, res) => {
  const { name, email, userId, orderItems, shippingAdress, orderAmount } =
    req.body
  const order = new Order({
    name,
    email,
    userId,
    orderItems,
    shippingAdress,
    orderAmount,
  })
  await order.save()
  res.status(200).json(order)
})

// @route  GET api/orders/getUserOrders
// @desc   Get logged in user orders
// @access Private User
const getUserOrders = asyncHandler(async (req, res) => {
  const { userId } = req.body
  try {
    const orders = await Order.find({ userId })
    res.status(200).json(orders)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      error: 'Server error',
    })
  }
})

// @route  GET api/orders/getAllOrders
// @desc   Get logged in user orders
// @access Private Admin
const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({})
    res.status(200).json(orders)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      error: 'Server error',
    })
  }
})

// @route  GET api/orders/prepareOrder
// @desc   Get logged in user orders
// @access Private Admin
const prepareOrder = asyncHandler(async (req, res) => {
  try {
    const orderid = req.body.orderid

    const order = await Order.findById(orderid)

    order.isPrepared = true

    await order.save()

    res.json(order)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// @route  GET api/orders/deliverOrder
// @desc   Get logged in user orders
// @access Private Admin
const deliverOrder = asyncHandler(async (req, res) => {
  try {
    const orderid = req.body.orderid

    const order = await Order.findById(orderid)

    order.isDelivered = true

    await order.save()

    res.json(order)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})
export {
  checkoutOrder,
  placeOrder,
  getUserOrders,
  getAllOrders,
  prepareOrder,
  deliverOrder,
}
