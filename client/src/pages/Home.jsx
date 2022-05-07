import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPizza } from '../actions/pizzaActions'
import Loader from '../components/Loader'
import HomeCarousel from '../components/Main/HomeCarousel'
import PizzaCard from '../components/Main/PizzaCard'
import Search from '../components/Main/Search'
import Message from '../components/Message'

const Home = () => {
  const dispatch = useDispatch()

  const pizzaListStore = useSelector((state) => state.pizzaList)
  const { loading, error, pizzas } = pizzaListStore
  useEffect(() => {
    dispatch(getAllPizza())
  }, [dispatch])

  return (
    <div className='home'>
      <HomeCarousel />
      <Search />
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {pizzas.length === 0 && (
        <div className='container'>
          <Message variant='danger'>No pizzas found</Message>
        </div>
      )}
      <div className='homePage'>
        {pizzas &&
          pizzas.map((pizza) => <PizzaCard key={pizza._id} pizza={pizza} />)}
      </div>
    </div>
  )
}

export default Home
