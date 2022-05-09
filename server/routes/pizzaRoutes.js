import express from 'express'

import {
  getPizzaList,
  addPizza,
  getPizzaById,
  editPizza,
  deletePizza,
} from '../controllers/pizzaControllers.js'
import { protect, admin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').get(getPizzaList)
router.route('/addpizza').post(addPizza, protect, admin)
router.route('/getpizzabyid').post(getPizzaById, protect, admin)
router.route('/editpizza').post(editPizza, protect, admin)
router.route('/deletepizza').post(deletePizza, protect, admin)

export default router
