import express from 'express'
import {
  authUser,
  registerUser,
  deleteUser,
  getAllUser,
} from '../controllers/userControllers.js'

const router = express.Router()

router.route('/register').post(registerUser)
router.post('/login', authUser)
router.post('/deleteUser', deleteUser)
router.get('/getAllUsers', getAllUser)

export default router
