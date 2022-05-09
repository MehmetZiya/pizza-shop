import express from 'express'

import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  prepareOrder,
  deliverOrder,
} from '../controllers/orderControllers.js'

const router = express.Router()

router.route('/placeorder').post(placeOrder)
router.route('/getUserOrders').post(getUserOrders)
router.route('/getAllOrders').get(getAllOrders)
router.route('/prepareOrder').post(prepareOrder)
router.route('/deliverOrder').post(deliverOrder)

export default router
