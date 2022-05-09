import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import { addPizza } from '../../actions/pizzaActions'
import Message from '../Message'
import { RESET_FORM } from '../../constants/pizzaConstants'

const AddNewPizza = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const addPizzaState = useSelector((state) => state.addPizza)
  const { success, error, loading } = addPizzaState

  const [name, setName] = useState('')
  const [smallPrice, setSmallPrice] = useState()
  const [familjPrice, setFamiljPrice] = useState()
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Standard')
  const categories = ['Standard', 'Special', 'Vegetarian', 'Italieniska']
  useEffect(() => {
    if (success) {
      document.querySelector('form').reset()

      setTimeout(() => {
        dispatch({ type: RESET_FORM })
        navigate('/admin/pizzaList')
      }, 2000)
    }
  }, [dispatch, navigate, success])

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

    const pizza = {
      name,
      description,
      prices: {
        Normal: Number(smallPrice),
        Familj: Number(familjPrice),
      },
      category,
      image,
    }
    console.log(pizza)
    dispatch(addPizza(pizza))
  }

  return (
    <div>
      <div className='text-start shadow-lg p-3 mb-5 bg-white rounded'>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        {!loading && success && (
          <Message variant='success'>{'Pizza added successfully'}</Message>
        )}
        <h3>Add Pizza Form</h3>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Name'
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='number'
              className='form-control'
              placeholder='Normal Price'
              onChange={(e) => setSmallPrice(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='number'
              className='form-control'
              placeholder='Familj Price'
              onChange={(e) => setFamiljPrice(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Description..'
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
              required
            />
          </div>
          <button type='submit' className='btn btn-danger mt-3'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddNewPizza
