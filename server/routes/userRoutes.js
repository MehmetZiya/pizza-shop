import express from 'express'
import {
  authUser,
  registerUser,
  deleteUser,
  getAllUser,
} from '../controllers/userControllers.js'
import { protect, admin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/register').post(registerUser)
router.post('/login', authUser)
router.post('/deleteUser', protect, admin, deleteUser)
router.get('/getAllUsers', protect, admin, getAllUser)

export default router
