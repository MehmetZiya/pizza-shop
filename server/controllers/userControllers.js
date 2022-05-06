import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

//Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get All users
// @route   GET /api/users
// @access  Private Admin
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find()

    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
})

// @desc    Delete a user
// @route   POST /api/users
// @access  Private Admin
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.body._id
  try {
    await User.findByIdAndDelete({ _id: userId })

    res.status(200).json('User delted successfully')
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
})

export { authUser, registerUser, getAllUser, deleteUser }
