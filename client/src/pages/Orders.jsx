import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Moment from 'react-moment'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

const Orders = () => {
  const orderState = useSelector((state) => state.getUserOrders)
  const { loading, error, orders } = orderState

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  AOS.init()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserOrders())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='ordersPage container'>
      <h2>My Orders</h2>
      <hr />

      <div>
        {userInfo && (
          <>
            <p> Namn: {userInfo.name}</p>
            <p> Email: {userInfo.email}</p>
          </>
        )}
      </div>

      <div className=''>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        <table className='table table-striped table-bordered table-responsive-sm'>
          <thead className='thead-dark'>
            <tr>
              <th>No</th>
              <th>Orders</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders &&
              orders.map((order, i) => (
                <tr
                  key={order._id}
                  data-aos='fade-down'
                  data-aos-duration='1000'
                >
                  <td>{i + 1}</td>
                  <td>
                    {order.orderItems.map((item) => (
                      <div key={item._id}>
                        <span>
                          {item.name}[{item.variant}] * {item.qty} ={' '}
                          {item.price}
                        </span>
                        <br />
                      </div>
                    ))}
                  </td>
                  <td>{order.orderAmount} kr</td>
                  <td>
                    <Moment format='DD/MM/YYYY'>{order.createdAt}</Moment>
                  </td>
                  <td>
                    {order.isPrepared &&
                    !order.isOnTheWay &&
                    !order.isDelivered ? (
                      <span>Bakas</span>
                    ) : order.isPrepared &&
                      order.isOnTheWay &&
                      !order.isDelivered ? (
                      <span>På väg</span>
                    ) : order.isPrepared &&
                      order.isOnTheWay &&
                      order.isDelivered ? (
                      <span>Levererad</span>
                    ) : (
                      <span>Din beställning har tagits</span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {orders && orders.length === 0 && userInfo && (
          <Message variant='danger'>Du har inga beställning</Message>
        )}
      </div>
    </div>
  )
}

export default Orders
