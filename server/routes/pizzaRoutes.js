import express from 'express'

import {
  getPizzaList,
  addPizza,
  getPizzaById,
  editPizza,
  deletePizza,
} from '../controllers/pizzaControllers.js'

const router = express.Router()

router.route('/').get(getPizzaList)
router.route('/addpizza').post(addPizza)
router.route('/getpizzabyid').post(getPizzaById)
router.route('/editpizza').post(editPizza)
router.route('/deletepizza').post(deletePizza)

export default router
