import express from 'express'

import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  prepareOrder,
  deliverOrder,
} from '../controllers/orderControllers.js'
import { protect, admin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/placeorder').post(protect, placeOrder)
router.route('/getUserOrders').post(protect, getUserOrders)
router.route('/getAllOrders').get(protect, admin, getAllOrders)
router.route('/prepareOrder').post(protect, admin, prepareOrder)
router.route('/deliverOrder').post(protect, admin, deliverOrder)

export default router
