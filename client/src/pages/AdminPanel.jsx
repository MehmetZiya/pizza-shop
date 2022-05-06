import { Link, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import AddNewPizza from '../components/adminScreens/AddNewPizza'
import PizzaList from '../components/adminScreens/PizzaList'
import UserList from '../components/adminScreens/UserList'
/* import OrderList from '../components/adminScreens/OrderList'
import EditPizza from '../components/adminScreens/EditPizza' */
const AdminPanel = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {
    if (!userInfo.isAdmin) {
      return (window.location.href = '/')
    }
  }, [userInfo])

  return (
    <div style={{ marginTop: '200px' }} className='container adminPage'>
      <h2 className='text-center'>ADMIN PANEL</h2>
      <hr />
      <ul className='adminLinks'>
        <li>
          <Link to='/admin/orderList'>Order List</Link>
        </li>
        <li>
          <Link to='/admin/userList'>Users List</Link>
        </li>
        <li>
          <Link to='/admin/pizzaList'>Pizza List</Link>
        </li>
        <li>
          <Link to='/admin/addNewPizza'>Add New Pizza</Link>
        </li>
      </ul>
      <hr />
      <Routes>
        <Route path='/' element={<Navigate to='orderList' />} />
        <Route path='userList' element={<UserList />} />
        <Route path='pizzaList' element={<PizzaList />} />
        <Route path='addNewPizza' element={<AddNewPizza />} />
        {/* <Route path='orderList' element={<OrderList />} />
        <Route path='editpizza/:pizzaId' element={<EditPizza />} /> */}
      </Routes>
    </div>
  )
}

export default AdminPanel
