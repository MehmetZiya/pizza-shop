import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../Loader'
import Message from '../Message'
import { editPizza, getPizzaByID } from '../../actions/pizzaActions'
import { useParams } from 'react-router-dom'

const EditPizza = () => {
  const [name, setName] = useState('')
  const [smallPrice, setSmallPrice] = useState()
  const [familjPrice, setFamiljPrice] = useState()
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const params = useParams()
  const pizzaId = params.pizzaId

  const dispatch = useDispatch()

  const getPizzaByIDState = useSelector((state) => state.getPizzaByID)
  const editPizzaState = useSelector((state) => state.editPizza)

  const { loading, error, pizza } = getPizzaByIDState
  const { edit_loading, edit_success, edit_error } = editPizzaState
  const categories = ['Standard', 'Special', 'Vegetarian', 'Italieniska']
  useEffect(() => {
    if (pizza && pizza._id === pizzaId) {
      setName(pizza.name)
      setSmallPrice(pizza.prices[0]['Normal'])
      setFamiljPrice(pizza.prices[0]['Familj'])
      setImage(pizza.image)
      setCategory(pizza.category)
      setDescription(pizza.description)
    } else {
      dispatch(getPizzaByID(pizzaId))
    }
  }, [pizza, dispatch, pizzaId])
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const editedpizza = {
      _id: params.pizzaId,
      name,
      prices: {
        Normal: Number(smallPrice),
        Familj: Number(familjPrice),
      },
      image,
      description,
      category,
    }

    dispatch(editPizza(editedpizza))
    setTimeout(() => {
      window.location.href = '/admin/pizzaList '
    }, 2000)
  }

  return (
    <div>
      <div className='text-start shadow-lg p-3 mb-5 bg-white rounded'>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        {edit_success && (
          <Message variant='success'>{'Pizza Updated successfully'}</Message>
        )}
        {edit_loading && <Loader />}
        {edit_error && <Message variant='danger'>{edit_error}</Message>}

        <h1>Edit Pizza</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Normal Price'
              value={smallPrice}
              onChange={(e) => setSmallPrice(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Familj Price'
              value={familjPrice}
              onChange={(e) => setFamiljPrice(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Description..'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='form-group p-2'>
            Category:
            <select
              name='variant'
              value={category}
              onChange={(e) => {
                setCategory(e.target.value)
              }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group d-flex'>
            <input
              type='text'
              className='form-control'
              placeholder='Image URL'
              onChange={uploadFileHandler}
              value={image}
              required
            />
            <input
              type='file'
              className='form-control'
              onChange={uploadFileHandler}
            />
          </div>
          <button type='submit' className='btn btn-danger mt-3'>
            Edit Pizza
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditPizza
