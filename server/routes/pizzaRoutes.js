import express from 'express'

import { getPizzaList, addPizza } from '../controllers/pizzaControllers.js'

const router = express.Router()

router.route('/').get(getPizzaList)
router.route('/addpizza').post(addPizza)

export default router
