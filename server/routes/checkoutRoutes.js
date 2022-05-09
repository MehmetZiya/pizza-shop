import express from 'express'

import { checkoutOrder } from '../controllers/orderControllers.js'

const router = express.Router()

router.route('/').post(checkoutOrder)

export default router
