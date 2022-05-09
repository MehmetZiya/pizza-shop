import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllPizza, deletePizza } from '../../actions/pizzaActions'
import Loader from '../Loader'
import Message from '../Message'
import { BiEdit, BiTrash } from 'react-icons/bi'

const PizzaList = () => {
  const dispatch = useDispatch()
  const pizzaListStore = useSelector((state) => state.pizzaList)
  const { loading, error, pizzas } = pizzaListStore
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deletePizza(id))
    }
  }
  useEffect(() => {
    dispatch(getAllPizza())
  }, [dispatch])
  return (
    <div>
      <h2>Pizzas List</h2>

      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <table className='table table-striped table-bordered table-responsive-sm'>
        <thead className='thead-dark'>
          <tr>
            <th>Name</th>
            <th>Prices</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {pizzas &&
            pizzas.map((pizza) => {
              return (
                <tr key={pizza._id}>
                  <td>{pizza.name}</td>
                  <td>
                    Normal : {pizza.prices[0]['Normal']} <br />
                    Familj: {pizza.prices[0]['Familj']}
                  </td>
                  <td>{pizza.category}</td>
                  <td>
                    <BiTrash
                      style={{
                        color: 'red',
                        cursor: 'pointer',
                        fontSize: '20px',
                      }}
                      className='mr-2'
                      onClick={() => {
                        deleteHandler(pizza._id)
                      }}
                    />

                    <Link to={`/admin/editpizza/${pizza._id}`}>
                      <BiEdit
                        style={{
                          color: 'green',
                          fontSize: '20px',
                        }}
                      />
                    </Link>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default PizzaList
