import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPizza } from '../actions/pizzaActions'
import PizzaCard from '../components/Main/PizzaCard'

const Home = () => {
  const dispatch = useDispatch()

  const pizzaListStore = useSelector((state) => state.pizzaList)
  const { loading, error, pizzas } = pizzaListStore
  useEffect(() => {
    dispatch(getAllPizza())
  }, [dispatch])

  return (
    <div className='homePage'>
      {loading && <div>Loading...</div>}
      {error && <div>Error! {error.message}</div>}
      {pizzas &&
        pizzas.map((pizza) => <PizzaCard key={pizza._id} pizza={pizza} />)}
    </div>
  )
}

export default Home
