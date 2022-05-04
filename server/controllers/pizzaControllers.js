import asyncHandler from 'express-async-handler'
import Pizza from '../models/pizzaModel.js'

// @desc    Fetch all pizzas
// @route   GET /api/pizzas
// @access  Public
const getPizzaList = asyncHandler(async (req, res) => {
  const pizzas = await Pizza.find({})
  res.json(pizzas)
})

// @desc    Add new pizzas
// @route   POST /api/pizzas
// @access  Admin
const addPizza = asyncHandler(async (req, res) => {
  const pizza = req.body
  const { name, image, category, description } = pizza
  try {
    const newPizza = new Pizza({
      name,
      description,
      category,
      prices: [pizza.prices],
      variants: ['normal', 'familj'],
      image,
    })
    await newPizza.save()
    res.json(newPizza)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

export { getPizzaList, addPizza }
