import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchPizzas } from '../../actions/pizzaActions'

const Search = () => {
  const dispatch = useDispatch()
  const [searchKey, setSearchKey] = useState('')
  const [category, setCategory] = useState('all')
  return (
    <div className='searchBar'>
      <div>
        <input
          type='text'
          className='form-control'
          placeholder='search pizzas'
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </div>
      <div>
        <select
          className='form-control'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value='all'>All</option>
          <option value='standard'>Standard</option>
          <option value='special'>Special</option>
          <option value='vegetarian'>Vegetarien</option>
          <option value='italieniska'>Italieniska</option>
        </select>
      </div>
      <div>
        <button
          className='btn'
          onClick={() => dispatch(searchPizzas(searchKey, category))}
        >
          Filter
        </button>
      </div>
    </div>
  )
}

export default Search
