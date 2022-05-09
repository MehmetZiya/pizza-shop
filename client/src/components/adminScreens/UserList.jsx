import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, deleteUser } from '../../actions/userActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { BiTrash } from 'react-icons/bi'
const UserList = () => {
  const dispatch = useDispatch()
  const getAllUsersState = useSelector((state) => state.getAllUsersState)
  const { users, error, loading } = getAllUsersState

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const deleteUserHandler = (userId) => {
    dispatch(deleteUser(userId))
    setTimeout(() => {
      dispatch(getAllUsers())
    }, 1000)
  }
  return (
    <div>
      <h2>Users List</h2>
      {loading && <Loader />}
      {error && <Message variant='danger' message={error.message} />}
      <table className='table table-striped table-bordered table-responsive-sm '>
        <thead className='table-dark'>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <BiTrash
                    style={{
                      color: 'red',
                      fontSize: '20px',
                      cursor: 'pointer',
                    }}
                    onClick={() => deleteUserHandler(user._id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
