import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import {
  deliverOrder,
  getAllOrders,
  prepareOrder,
} from '../../actions/orderActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { AiFillCheckCircle } from 'react-icons/ai'
const OrderList = () => {
  const dispatch = useDispatch()
  const getAllOrdersState = useSelector((state) => state.getAllOrders)
  const { orders, loading, error } = getAllOrdersState

  useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch])

  const handlePrepareOrder = (orderid) => {
    dispatch(prepareOrder(orderid))
  }
  const handleDeliverOrder = (orderid) => {
    dispatch(deliverOrder(orderid))
  }
  return (
    <div>
      <h2>OrderList</h2>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <table className='table table-striped table-bordered table-responsive-sm'>
        <thead className='table-dark'>
          <tr>
            <th>Kund</th>
            <th>Order Info</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <ul>
                    <li>
                      <strong>Name:</strong> {order.name}
                    </li>
                    <li>
                      <strong>Email:</strong> {order.email}
                    </li>
                  </ul>
                </td>
                <td>
                  <ul>
                    {order.orderItems.map((item) => (
                      <li key={item._id}>
                        {item.name}[{item.variant}] x {item.qty}
                      </li>
                    ))}
                  </ul>
                </td>

                <td>{order.orderAmount}</td>
                <td>
                  <Moment format='DD/MM/YYYY HH:mm:ss'>
                    {order.createdAt}
                  </Moment>
                </td>
                <td>
                  {!order.isPrepared && !order.isDelivered ? (
                    <button
                      className='btn btn-info'
                      onClick={() => handlePrepareOrder(order._id)}
                    >
                      Prepare
                    </button>
                  ) : !order.isDelivered && order.isPrepared ? (
                    <button
                      className='btn btn-danger'
                      onClick={() => handleDeliverOrder(order._id)}
                    >
                      Deliver
                    </button>
                  ) : (
                    <span style={{ fontWeight: 600, color: 'green' }}>
                      Delivered <AiFillCheckCircle />
                    </span>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderList
