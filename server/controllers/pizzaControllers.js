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
      variants: ['Normal', 'Familj'],
      prices: [pizza.prices],
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

// @desc    Get pizza by ID
// @route   POST /api/pizzas/getpizzabyid
// @access  Admin
const getPizzaById = asyncHandler(async (req, res) => {
  try {
    const pizzaId = req.body.pizzaid
    const pizza = await Pizza.findById(pizzaId)
    res.json(pizza)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// @desc    Update Pizza
// @route   POST /api/pizzas/editpizza
// @access  Admin
const editPizza = asyncHandler(async (req, res) => {
  const editedPizza = req.body.editedpizza

  try {
    const pizza = await Pizza.findOne({ _id: editedPizza._id })
    pizza.name = editedPizza.name
    pizza.image = editedPizza.image
    pizza.category = editedPizza.category
    pizza.description = editedPizza.description
    pizza.prices = [editedPizza.prices]
    pizza.varients = editedPizza.varients
    await pizza.save()
    res.json(pizza)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// @desc    Delete Pizza
// @route   POST /api/pizzas/editpizza
// @access  Admin
const deletePizza = asyncHandler(async (req, res) => {
  try {
    const pizzaId = req.body.pizzaId

    const deletedPizza = await Pizza.findOneAndDelete({ _id: pizzaId })

    res.send(deletedPizza)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})
export { getPizzaList, addPizza, getPizzaById, editPizza, deletePizza }
